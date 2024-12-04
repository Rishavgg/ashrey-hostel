import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';

import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
import FabButton from './Fab.tsx';
import { useAuth } from "../Context/UseAuth";

// icons
import logoutIcon from '../Assets/icon/out.svg';
import profileIcon from '../Assets/icon/profile.svg';
import assignIcon from '../Assets/icon/assign.svg';
import listIcon from '../Assets/icon/list.svg';
import reciptIcon from '../Assets/icon/recept.svg';
import requestIcon from '../Assets/icon/request.svg';
import notificationIcon from '../Assets/icon/notification.svg';
import massAlocationIcon from '../Assets/icon/community.svg';

// interface StudentNavbarProps {
//   onPageChange: (page: string) => void;
// }

const StudentNavbar: React.FC<{onPageChange:(page:string)=>void}> = ({ onPageChange }) => {
  const [activeItem, setActiveItem] = useState<string>('List of Rooms');
  const { logoutUser } = useAuth();

  const handleClick = (label: string) => {
    setActiveItem(label);
    onPageChange(label);
  };

  return (
    <nav className={styles.outPassNav}>
      <header className={styles.outPassHeader}>
        <SectionHeader text="Student Details" />
        <hr className={styles.dividerLine} />

        <NavItem
          icon={reciptIcon}
          label="List of Rooms"
          isActive={activeItem === 'List of Rooms'}
          onClick={() => handleClick('List of Rooms')}
          link=""
        />
        <NavItem
          icon={massAlocationIcon}
          label="Participate in Mass Allocation"
          isActive={activeItem === 'Participate in Mass Allocation'}
          onClick={() => handleClick('Participate in Mass Allocation')}
          link=""
        />
        <NavItem
          icon={requestIcon}
          label="Request Room change"
          isActive={activeItem === 'Request Room change'}
          link=""
          onClick={() => handleClick('Request Room change')}
        />

        <SectionHeader text="Room and Inventory" />
        <hr className={styles.dividerLine} />

        <NavItem
          icon={listIcon}
          label="Inventory Form"
          isActive={activeItem === 'Inventory Form'}
          link=""
          onClick={() => handleClick('Inventory Form')}
        />
        <NavItem
          icon={assignIcon}
          label="Register A Complaint"
          isActive={activeItem === 'Register A Complaint'}
          link=""
          onClick={() => handleClick('Register A Complaint')}
        />
      </header>

      <footer className={styles.outPassFooter}>
        <FabButton iconSrc={profileIcon} iconAlt="Profile" onClick={() => {}} />
        <FabButton
          iconSrc={notificationIcon}
          iconAlt="Notification"
          onClick={() => {}}
        />
        <FabButton iconSrc={logoutIcon} iconAlt="LogoutIcon" onClick={logoutUser} />
      </footer>
    </nav>
  );
};

export default StudentNavbar;
