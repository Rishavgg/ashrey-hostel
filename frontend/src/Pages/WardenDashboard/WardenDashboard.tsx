import Navbar from '../../components/NavbarWarden.tsx';
import FilterBar from '../../components/FilterBar.tsx';
import NameCard from '../../components/NameCard.tsx';
import AddUser from '../../components/AddUser.tsx';
import FabButton from '../../components/Fab.tsx';
import { useState } from 'react';
import * as Yup from 'yup';

const ChiefWardenDashboard = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handlePopupSubmit = async (data: Record<string, string>) => {
    setIsPopupLoading(true);
    try {
      console.log('Form Submitted:', data);
      // Add your API call here
      // await apiCallToAddUser(data);
      setIsPopupVisible(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsPopupLoading(false);
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
          <FilterBar title="Page Title" />

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
                label: 'Roll No.',
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