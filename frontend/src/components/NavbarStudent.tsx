import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';

import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
// import Divider from './Divider';
import FabButton from './Fab.tsx';
import {useAuth} from "../Context/UseAuth";


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
                iconSrc="https://cdn.builder.io/api/v1/image/assets/d6efea5f7c3649c8b97e0c2c59aefd56/48ffa0f155057dbb615739a024a4781d51840d631c6830f27270f0a60b5b595a?apiKey=d6efea5f7c3649c8b97e0c2c59aefd56&"
                iconAlt="Action icon"
                onClick={logoutUser} // Logout functionality added here
            /></footer>

    </nav>
  );
};

export default StudentNavbar;