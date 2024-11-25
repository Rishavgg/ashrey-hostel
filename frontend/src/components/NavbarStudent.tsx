import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';

import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
// import Divider from './Divider';
import FabButton from './Fab.tsx';
import {useAuth} from "../Context/UseAuth";

// icons
import logoutIcon from '../Assets/icon/out.svg';
import profileIcon from '../Assets/icon/profile.svg';
import assignIcon from '../Assets/icon/assign.svg';
import listIcon from '../Assets/icon/list.svg';
import reciptIcon from '../Assets/icon/recept.svg';
import requestIcon from '../Assets/icon/request.svg';
import notificationIcon from '../Assets/icon/notification.svg';
import massAlocationIcon from '../Assets/icon/community.svg';
import findIcon from '../Assets/icon/find.svg';




const StudentNavbar: React.FC = () => {

  const [activeItem, setActiveItem]= useState<string|null>('Find a Room');
  const { logoutUser } = useAuth();

  const handleClick= (label:string)=>{
    setActiveItem(label)
  }

  return (
    <nav className={styles.outPassNav}>
      <header className={styles.outPassHeader}>

        <SectionHeader text="Student Details"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={massAlocationIcon}
          label="Participate in Mass Allocation"
          badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem=== 'Participate in Mass Allocation'} // Static false, no active state
          onClick={() => {handleClick('Participate in Mass Allocation')}} // Empty function placeholder
        />
        <NavItem
          icon={reciptIcon}
          label="List Of Rooms"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem === 'List of Rooms'} // Static false, no active state
          onClick={() => {handleClick('List of Rooms')}} // Empty function placeholder
        />
        <NavItem
          icon={findIcon}
          label="Find a Room"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem=== 'Find a Room'} // Static false, no active state
          onClick={() => {handleClick('Find a Room')}} // Empty function placeholder
        />
        <NavItem
        icon={requestIcon}
        label="Request Room change"
        // badgeCount={4}
        link="" // Placeholder value
        isActive={activeItem==='Request Room change'} // Static false, no active state
        onClick={() => {handleClick('Request Room change')}} // Empty function placeholder
      />

        <SectionHeader text="Room and Inventory"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={listIcon}
          label="Inventory Form"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem==='Inventory Form'} // Static false, no active state
          onClick={() => {handleClick('Inventory Form')}} // Empty function placeholder
        />
        <NavItem
          icon={assignIcon}
          label="Regsiter A Complaint"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem==='Register A Complaint'} // Static false, no active state
          onClick={() => {handleClick('Register A Complaint')}} // Empty function placeholder
        />

        
        {/* <Divider /> */}
      </header>


        <footer className={styles.outPassFooter}>
            <FabButton
                iconSrc={profileIcon}
                iconAlt="Profile"
                onClick={() => {}}
            />
            <FabButton
                iconSrc={notificationIcon}
                iconAlt="Notification"
                onClick={()=>{}} // Logout functionality added here
            />
            <FabButton
              iconSrc={logoutIcon}
              iconAlt="LogoutIcon"
              onClick={logoutUser} // Logout functionality added here
            />
            </footer>

    </nav>
  );
};

export default StudentNavbar;