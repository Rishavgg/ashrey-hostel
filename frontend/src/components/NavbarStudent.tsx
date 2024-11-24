import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';

import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
// import Divider from './Divider';
import FabButton from './Fab.tsx';
import {useAuth} from "../Context/UseAuth";
import logoutIcon from '../Assets/icon/out.svg';


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
          icon="/add.svg"
          label="Participate in Mass Allocation"
          badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem=== 'Participate in Mass Allocation'} // Static false, no active state
          onClick={() => {handleClick('Participate in Mass Allocation')}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="List Of Rooms"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem === 'List of Rooms'} // Static false, no active state
          onClick={() => {handleClick('List of Rooms')}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Find a Room"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem=== 'Find a Room'} // Static false, no active state
          onClick={() => {handleClick('Find a Room')}} // Empty function placeholder
        />
        <NavItem
        icon="/add.svg"
        label="Request Room change"
        // badgeCount={4}
        link="" // Placeholder value
        isActive={activeItem==='Request Room change'} // Static false, no active state
        onClick={() => {handleClick('Request Room change')}} // Empty function placeholder
      />

        <SectionHeader text="Room and Inventory"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon="/add.svg"
          label="Inventory Form"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeItem==='Inventory Form'} // Static false, no active state
          onClick={() => {handleClick('Inventory Form')}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
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
                iconSrc="/add.svg"
                iconAlt="Action icon"
                onClick={() => {
                }}
            />
            <FabButton
                iconSrc={logoutIcon}
                iconAlt="Action icon"
                onClick={logoutUser} // Logout functionality added here
            /></footer>

    </nav>
  );
};

export default StudentNavbar;