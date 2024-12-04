import { useEffect, useState, useRef } from "react";
import NameCard from "../../components/NameCard.tsx";
import AddUser from "../../components/AddUser.tsx";
import FabButton from "../../components/Fab.tsx";
import Profile from "../../components/Profile.tsx";
import FilterBar from "../../components/FilterBar.tsx";
import StudntTable from "../../components/NameTableRow.tsx"
import * as Yup from "yup";
import {
  fetchStudentData,
  fetchStudentProfile,
  searchStudents,
  uploadExcel,
} from "../../services/managerService.tsx";
import { useAuth } from "../../Context/UseAuth.tsx";
import styles from '../../components/Css/TileView.module.css'

const FindStudent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const searchTimeoutRef = useRef<any>(null);
  const [view, setView] = useState("Tile");
  const { registerUser } = useAuth();
  const [page, setPage] = useState(0)
  const [size] = useState(9);
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 0 ? prev - 1 : 0));


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData(page,size); // Fetch first page with size 10
      setStudents(data);
    };
    fetchData();
  }, [page, size]);

  const handleSearch = async (searchTerm: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  
    if (!searchTerm.trim()) {
      // If the search term is empty, fetch all students
      try {
        const data = await fetchStudentData(0, 10); // Adjust pagination as needed
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch all students:", error);
      }
      return;
    }
  
    // Perform search with debounce
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchStudents(searchTerm, 0, 5); // Adjust pagination as needed
        setStudents(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }, 300); // Debounce delay of 300ms
  };
  

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const toggleProfilePopup = async () => {
    setIsProfileVisible(!isProfileVisible);
    if (!isProfileVisible) {
      try {
        setLoadingProfile(true);
        const data = await fetchStudentProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile data");
      } finally {
        setLoadingProfile(false);
      }
    }
  };

  const handlePopupSubmit = async (formData: Record<string, string>) => {
    try {
      console.log("Form data received:", formData); // Logs the entire formData object
  
      // Log each field with its type and value
      console.log("Name:", formData.name, "| Type:", typeof formData.name);
      console.log("Email:", formData.email, "| Type:", typeof formData.email);
      console.log("Roll Number:", formData.rollNumber, "| Type:", typeof formData.rollNumber);
      console.log("Contact:", formData.contact, "| Type:", typeof formData.contact);
      console.log("Admission Year (string):", formData.admissonyear, "| Type:", typeof formData.admissonyear);
  
      setIsPopupLoading(true);
  
      // Convert admissonyear to a number
      const admissonyear = parseInt(formData.admissonyear, 10);
      if (isNaN(admissonyear)) {
        throw new Error("Admission year must be a valid number.");
      }
  
      const res = await registerUser(
        formData.name,
        formData.email,
        formData.rollNumber,
        formData.contact,
        admissonyear
      );
  
      console.log("Response from registerUser:", res);
  
      if (res?.message === "User added successfully") {
        setIsPopupVisible(false);
      }
    } catch (error) {
      console.error("Error occurred in handlePopupSubmit:", error);
    } finally {
      setIsPopupLoading(false);
    }
  };
  

  const handleFileUpload = async (file: File) => {
    try {
      const response = await uploadExcel(file);
      alert("File uploaded successfully!");
      console.log("Upload response:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };

  function handleViewFullProfile(): void {
    throw new Error("Function not implemented.");
  }
  
  const handleToggleView = (selectedView: string) => {
    setView(selectedView); // Update view to either "Tile" or "Table"
  };

  return (
    <div>
      <div
        style={{
          gap: "20px",
          position: "sticky",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FilterBar title="Find a Student" onSearch={handleSearch} onToggle={handleToggleView} />
        {view === "Tile" ? (
        <div className={styles.tileView}>
        {students.length === 0 && <p>No students found.</p>}
        {students.map((student, index) => (
          <NameCard
            key={index}
            name={student.name}
            id={student.rollNumber}
            status={`${student.hostelName} - ${student.roomNumber}`}
            year={student.year}
          />
        ))}
        </div>
        ): (
          <StudntTable student={students} />
        )}
      </div>

      {/* Profile Popup */}
      {isProfileVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2000,
          }}
        >
          <Profile
            name={profileData.name}
            email={profileData.email}
            contact={profileData.contact}
            hostel={`${profileData.hostelName} - ${profileData.blockName}`}
            profilePic={profileData.profilePic}
            onViewFullProfile={handleViewFullProfile}
            onClose={toggleProfilePopup}
          />
        </div>
      )}
      {loadingProfile && <div>Loading Profile...</div>}
      
      {isPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <AddUser
            title="Add User"
            fields={[
              {
                label: "Name",
                name: "name",
                type: "text",
                validation: Yup.string().required("Name is required"),
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                validation: Yup.string()
                  .email("Invalid email")
                  .required("Email is required"),
              },
              {
                label: "Roll Number",
                name: "rollNumber",
                type: "integer",
                validation: Yup.string().required("Roll number is required"),
              },
              {
                label: "Admission Year",
                name: "admissonyear",
                type: "integer",
                validation: Yup.number()
                  .required("Phone number is required"),
              },
              {
                label: "Phone No.",
                name: "contact",
                type: "text",
                validation: Yup.string()
                  .matches(/^\d{10}$/, "Phone number must be a 10-digit number")
                  .required("Phone number is required"),
              },
            ]}
            onSubmit={handlePopupSubmit}
            onCancel={togglePopup}
            isLoading={isPopupLoading}
          />
        </div>
      )}

            {/* Fab Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
        }}
      >
        <FabButton
          iconSrc="/add.svg"
          iconAlt="Action icon"
          onClick={togglePopup}
        />
      </div>
      {/* FAB for Uploading Excel */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "28px",
          zIndex: 1000,
        }}
      >
        <FabButton
          iconSrc="Assests/upload.svg"
          iconAlt="Upload"
          isFileUpload={true}
          onFileSelect={(file) => handleFileUpload(file)}
        />
      </div>
      <div>
        <button onClick={handlePrevPage}>Prev |</button>
        <button onClick={handleNextPage}>| Next</button>
      </div>
    </div>
  );
};

export default FindStudent;
