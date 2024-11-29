import { useEffect, useState, useRef } from "react";
import NameCard from "../../components/NameCard.tsx";
import AddUser from "../../components/AddUser.tsx";
import FabButton from "../../components/Fab.tsx";
import Profile from "../../components/Profile.tsx";
import FilterBar from "../../components/FilterBar.tsx";
import * as Yup from "yup";
import {
  fetchStudentData,
  fetchStudentProfile,
  searchStudents,
  uploadExcel,
} from "../../services/managerService.tsx";
import profileIcon from "../../Assets/icon/profile.svg";
import { useAuth } from "../../Context/UseAuth.tsx";

const FindStudent = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const searchTimeoutRef = useRef<any>(null);
  const { registerUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData(0, 10); // Fetch first page with size 10
      setStudents(data);
    };
    fetchData();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchTerm.trim()) {
      return; // Don't trigger search if the term is empty
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchStudents(searchTerm, 0, 5);
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
      setIsPopupLoading(true);
  
      // Convert admissonyear to a number before passing to registerUser
      const admissonyear = parseInt(formData.admissonyear, 10);
      if (isNaN(admissonyear)) {
        throw new Error("Admisson year must be a valid number.");
      }
  
      const res = await registerUser(
        formData.name,
        formData.email,
        formData.rollNumber,
        formData.contact,
        admissonyear // Now it's a number
      );
  
      if (res?.message === "User added successfully") {
        setIsPopupVisible(false);
      }
    } catch (error) {
      console.error(error);
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

  return (
    <div>
      <div
        style={{
          padding: "20px",
          gap: "20px",
          position: "sticky",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <FilterBar title="" onSearch={handleSearch} />
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

      {/* Popup for Adding Users */}
      <div
        style={{
          position: "fixed",
          bottom: "200px",
          right: "24px",
          zIndex: 1000,
        }}
      >
        <FabButton
          iconSrc={profileIcon}
          iconAlt="Profile"
          onClick={toggleProfilePopup}
        />
      </div>
      
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
          right: "24px",
          zIndex: 1000,
        }}
      >
        <FabButton
          iconSrc="/upload.svg"
          iconAlt="Upload Excel"
          isFileUpload={true}
          onFileSelect={(file) => handleFileUpload(file)}
        />
      </div>
    </div>
  );
};

export default FindStudent;
