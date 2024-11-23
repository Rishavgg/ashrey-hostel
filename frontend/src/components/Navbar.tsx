import React from 'react';
import styles from './Css/Navbar.module.css';

import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
// import Divider from './Divider';
import FabButton from './Fab.tsx';


const Navbar: React.FC = () => {
  return (
    <nav className={styles.outPassNav}>
      <header className={styles.outPassHeader}>

        <SectionHeader text="Student Details"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon="/add.svg"
          label="Find a student"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Hostel fees status"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Add/edit student details"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />

        <SectionHeader text="Allocation"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon="/add.svg"
          label="Manual Allocation"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Mass Allocation"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />

        <NavItem
          icon="/add.svg"
          label="Allocation Request"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />

      <SectionHeader text="Outpass"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon="/add.svg"
          label="Outpass Requests"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Out of campus"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />

        <NavItem
          icon="/add.svg"
          label="Outpass history"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <SectionHeader text="Hostel Details"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon="/add.svg"
          label="Public Room List"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />
        <NavItem
          icon="/add.svg"
          label="Add/Edit Rooms"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={false} // Static false, no active state
          onClick={() => {}} // Empty function placeholder
        />


        
        {/* <Divider /> */}
      </header>

      
      <footer className={styles.outPassFooter}>
      <FabButton
        iconSrc="/add.svg"
        iconAlt="Action icon"
        onClick={() => {}}
      />
      <FabButton
        iconSrc="https://cdn.builder.io/api/v1/image/assets/d6efea5f7c3649c8b97e0c2c59aefd56/48ffa0f155057dbb615739a024a4781d51840d631c6830f27270f0a60b5b595a?apiKey=d6efea5f7c3649c8b97e0c2c59aefd56&"
        iconAlt="Action icon"
        onClick={() => {}}
      /></footer>
      
    </nav>
  );
};

export default Navbar;