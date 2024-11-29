import { fetchStudentData, searchStudents } from "../../services/managerService.tsx"
import Navbar from '../../components/NavbarWarden.tsx';
import FilterBar from '../../components/FilterBar.tsx';
import Dropdown from '../../components/Dropdown.tsx';
import NameCard from '../../components/NameCard.tsx';
import AddUser from '../../components/AddUser.tsx';
import FabButton from '../../components/Fab.tsx';
import { useState } from 'react';
import FindStudent from "../WardenDashboard/FindStudent.tsx"; 
import HostelFeesPage from '../WardenDashboard/HostelFees.tsx'; 
import ManualAllocationPage from '../WardenDashboard/ManualAllocation.tsx';
import MassAllocationPage from '../WardenDashboard/MassAllocation.tsx';
import AddEditStudentPage from '../WardenDashboard/AddEditStudent.tsx';
import * as Yup from 'yup';
import { useAuth } from "../../Context/UseAuth.tsx";

// Define your custom Field type here
type Field = {
  label: string;
  name: string;
  type: string; // Use 'custom' for custom components like Dropdown
  validation: Yup.AnySchema;
  component?: JSX.Element; // Optional component for custom fields
};

const ChiefWardenDashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const hostelOptions = ['H1', 'H2', 'H3']; // Options for the dropdown
  const [selectedHostel, setSelectedHostel] = useState('');
  const { registerUser } = useAuth();
  const [activePage, setActivePage] = useState<string>('Find a student'); // Default page
  // Callback for changing the active page
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

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

  const fields: Field[] = [
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
      validation: Yup.string().email('Invalid email').required('Email is required'),
    },
    {
      label: 'Hostel',
      name: 'hostel',
      type: 'custom', // Custom type for dropdown
      component: (
        <Dropdown
          label="Hostel"
          options={hostelOptions}
          defaultSelected={selectedHostel}
          onOptionSelect={setSelectedHostel}
        />
      ),
      validation: Yup.string().required('Hostel is required'), // Validation for the dropdown
    },
    {
      label: 'Phone No.',
      name: 'contact',
      type: 'text',
      validation: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
        .required('Phone number is required'),
    },
  ];

  const handlePopupSubmit = async (formData: Record<string, string>) => {
    try {
      const res = await registerUser(formData.name, formData.email, formData.rollNumber, formData.contact);
      if (res?.message === "User added successfully") {
        setIsPopupVisible(false);
      }
    } finally {
      setIsPopupLoading(false); // Hide loading spinner
    }
  };

    // Render content dynamically based on activePage
    const renderContent = () => {
      switch (activePage) {
        case 'Find a student':
          return <FindStudent students={students}/>;
        case 'Hostel fees status':
          return <HostelFeesPage />;
        case 'Manual Allocation':
          return <ManualAllocationPage />;
        case 'Mass Allocation':
          return <MassAllocationPage />;
        case 'Add/edit student details':
          return <AddEditStudentPage />;
        default:
          return <FindStudent students={students}/>;
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
        <FilterBar title="Warden Dashboard" onSearch={handleSearch} />

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
          <FilterBar title="Chief-Ward Dashboard" onSearch={handleSearch} />

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
            title="Add Student"
            fields={fields} // Pass the fields array here
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
    </div>
  );
};

export default ChiefWardenDashboard;
