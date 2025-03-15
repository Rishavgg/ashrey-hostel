import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';
import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
import FabButton from './Fab.tsx';
import Profile from '../components/Profile.tsx';

// Icons
import logoutIcon from '../Assets/icon/out.svg';
import assignIcon from '../Assets/icon/assign.svg';
import profileIcon from '../Assets/icon/profile.svg';
import editIcon from '../Assets/icon/edit.svg';
import listIcon from '../Assets/icon/list.svg';
import reciptIcon from '../Assets/icon/recept.svg';
import requestIcon from '../Assets/icon/request.svg';
import notificationIcon from '../Assets/icon/notification.svg';
import massAllocationIcon from '../Assets/icon/community.svg';
import findIcon from '../Assets/icon/community.svg';
import historyIcon from '../Assets/icon/history.svg';

import { useAuth } from '../services/adminservice.tsx';

const Navbar: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const [activeElement, setActiveElement] = useState<string | null>('Find a student');
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const { logout } = useAuth();

  // Handle active navigation item click
  const handleClick = (label: string) => {
    setActiveElement(label);
    onPageChange(label); // Notify parent of page change
  };

  // Toggle profile popup visibility
  const toggleProfilePopup = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  // Navigate to the full profile (placeholder for now)
  const handleViewFullProfile = () => {
    console.log('Redirecting to full profile...');
  };

  return (
    <nav className={styles.outPassNav}>
      {/* Header */}
      <header className={styles.outPassHeader}>
        {/* Section: Student Details */}
        <SectionHeader text="Student Details" />
        <hr className={styles.dividerLine} />
        <NavItem
          icon={findIcon}
          label="Manage students"
          isActive={activeElement === 'Find a student'}
          onClick={() => handleClick('Find a student')} link={''}        />
        {/* <NavItem
          icon={reciptIcon}
          label="Hostel fees status"
          isActive={activeElement === 'Hostel fees status'}
          onClick={() => handleClick('Hostel fees status')} link={''}        /> */}
        {/* <NavItem
          icon={editIcon}
          label="Add/edit student details"
          isActive={activeElement === 'Add/edit student details'}
          onClick={() => handleClick('Add/edit student details')} link={''}        /> */}

        {/* Section: Allocation */}
        <SectionHeader text="Allocation" />
        <hr className={styles.dividerLine} />
        <NavItem
          icon={assignIcon}
          label="Manual Allocation"
          isActive={activeElement === 'Manual Allocation'}
          onClick={() => handleClick('Manual Allocation')} link={''}        />
        <NavItem
          icon={massAllocationIcon}
          label="Mass Allocation"
          isActive={activeElement === 'Mass Allocation'}
          onClick={() => handleClick('Mass Allocation')} link={''}        />
        <NavItem
          icon={requestIcon}
          label="Allocation Request"
          isActive={activeElement === 'Allocation Request'}
          onClick={() => handleClick('Allocation Request')} link={''}        />

        {/* Section: Outpass */}
        <SectionHeader text="Outpass" />
        <hr className={styles.dividerLine} />
        <NavItem
          icon={assignIcon}
          label="Outpass Requests"
          isActive={activeElement === 'Outpass Requests'}
          onClick={() => handleClick('Outpass Requests')} link={''}        />
        <NavItem
          icon={logoutIcon}
          label="Out of campus"
          isActive={activeElement === 'Out of campus'}
          onClick={() => handleClick('Out of campus')} link={''}        />
        <NavItem
          icon={historyIcon}
          label="Outpass history"
          isActive={activeElement === 'Outpass history'}
          onClick={() => handleClick('Outpass history')} link={''}        />

        {/* Section: Hostel Details */}
        <SectionHeader text="Hostel Details" />
        <hr className={styles.dividerLine} />
        <NavItem
          icon={listIcon}
          label="Manage rooms"
          isActive={activeElement === 'Public Room List'}
          onClick={() => handleClick('Public Room List')} link={''}        />
        {/* <NavItem
          icon={editIcon}
          label="Add/Edit Rooms"
          isActive={activeElement === 'Add/Edit Rooms'}
          onClick={() => handleClick('Add/Edit Rooms')} link={''}        /> */}
      </header>

      {/* Footer */}
      <footer className={styles.outPassFooter}>
        {/* Profile Button */}
        <FabButton
          iconSrc={profileIcon}
          iconAlt="Profile"
          onClick={toggleProfilePopup}
        />
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
              name="John Singh"
              email="johndoe@example.com"
              contact="9876543210"
              hostel="Shastri"
              profilePic="./add.svg"
              onViewFullProfile={handleViewFullProfile}
              onClose={toggleProfilePopup}
            />
          </div>
        )}

        {/* Notification Button */}
        <FabButton
          iconSrc={notificationIcon}
          iconAlt="Notification"
          onClick={() => console.log('Notifications clicked')} // Placeholder
        />

        {/* Logout Button */}
        <FabButton
          iconSrc={logoutIcon}
          iconAlt="Logout"
          onClick={() => {
            if (window.confirm('Are you sure you want to log out?')) {
              logout();
            }
          }}
        />
      </footer>
    </nav>
  );
};

export default Navbar;