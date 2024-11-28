import Navbar from '../../components/NavbarWarden.tsx';
import FilterBar from '../../components/FilterBar.tsx';
import NameCard from '../../components/NameCard.tsx';
import AddUser from '../../components/AddUser.tsx';
import FabButton from '../../components/Fab.tsx';
import { useEffect, useState } from "react";
import { fetchStudentData, fetchStudentProfile, searchStudents } from "../../services/managerService.tsx"
import * as Yup from 'yup';
import { useAuth } from "../../Context/UseAuth.tsx";
import Profile from '../../components/ViewProfile.tsx';
import profileIcon from '../../Assets/icon/profile.svg';

const Warden = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { registerUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData(0, 10); // Fetch first page with size 10
      setStudents(data);
    };

    fetchData();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      // If search term is empty, reload all students
      const data = await fetchStudentData(0, 10);
      setStudents(data);
    } else {
      const data = await searchStudents(searchTerm, 0, 5); // Search for students
      setStudents(data);
    }
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };


  const toggleProfilePopup = async () => {
    setIsProfileVisible(!isProfileVisible);

    // Fetch profile data when opening the popup
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

  const handleViewFullProfile = () => {
    console.log("Redirecting to full profile view...");
    // Example: Use a router to navigate
    // navigate(`/profile/full/${profileData.studentId}`);
  };

  type registerUser = {
    name: string;
    email: string;
    contact: string;
    rollNumber: string;
  };

  // const fields = [
  //   { name: 'name', label: 'Name', type: 'text', validation: Yup.string().required('Name is required') },
  //   { name: 'email', label: 'Email', type: 'email', validation: Yup.string().email('Invalid email').required('Email is required') },
  //   { name: 'rollNumber', label: 'Roll No.', type: 'text', validation: Yup.string().required('Roll number is required') },
  //   { name: 'contact', label: 'Phone No.', type: 'text', validation: Yup.string().matches(/^\d{10}$/, 'Phone number must be a 10-digit number').required('Phone number is required') },
  // ];



  const handlePopupSubmit = async (formData: Record<string, string>) => {
    const res = await registerUser(
                formData.name, 
                formData.email, 
                formData.rollNumber, 
                formData.contact
              );
    setIsPopupLoading(true);
    try {
    if (res?.message === "User added successfully") {
      setIsPopupVisible(false);
    }
  }finally {
    setIsPopupLoading(false); // Hide loading spinner
  }
};
return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            maxWidth: '79vw',
            minWidth: '0',
          }}
        >
          {/* Filter Bar */}
          <FilterBar title="Warden Dashboard" onSearch={handleSearch} />

          {/* Rest of Content */}
          <div
            style={{
              padding: '20px',
              gap: '20px',
              position: 'sticky',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <NameCard
              name="John Doe"
              id="211478"
              status="H 15 B9"
              year="2nd"
            />
            {students.map((student, index) => (
              <NameCard
                key={index}
                name={student.name}
                id={student.id}
                status={student.status}
                year={student.year}
              />
            ))}
            {/* Add more NameCard components as needed */}
          </div>
        </div>
      </div>
      {/* Fab Button to Open Profile */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
        }}
      >
        <FabButton
          iconSrc={profileIcon}
          iconAlt="Profile"
          onClick={toggleProfilePopup}
        />
      </div>

      {/* Profile Popup */}
      {isProfileVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
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

      {/* Popup */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <AddUser
            title="Add User"
            fields={[
              {
                label: 'Name',
                name: 'name',
                type: 'text',
                validation: Yup.string().required('Name is required'),
              },
              {
                label: 'Email',
                name: 'email',
                type: 'email',
                validation: Yup.string()
                  .email('Invalid email')
                  .required('Email is required'),
              },
              {
                label: 'Roles',
                name: 'rollNumber',
                type: 'text',
                validation: Yup.string().required('Roll number is required'),
              },
              {
                label: 'Phone No.',
                name: 'contact',
                type: 'text',
                validation: Yup.string()
                  .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
                  .required('Phone number is required'),
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
          bottom: '90px',
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
    </div>
  );
};

export default Warden;
