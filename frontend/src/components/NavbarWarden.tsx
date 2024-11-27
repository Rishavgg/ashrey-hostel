import React, {useState} from 'react';
import styles from './Css/Navbar.module.css';
import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
// import Divider from './Divider';
import FabButton from './Fab.tsx';
import Profile from '../components/Profile.tsx';


// icons
import logoutIcon from '../Assets/icon/out.svg';
import assignIcon from '../Assets/icon/assign.svg';
import profileIcon from '../Assets/icon/profile.svg';
import editIcon from '../Assets/icon/edit.svg';
// import cursorIcon from '../Assets/icon/cursor.svg';
import listIcon from '../Assets/icon/list.svg';
import reciptIcon from '../Assets/icon/recept.svg';
import requestIcon from '../Assets/icon/request.svg';
import notificationIcon from '../Assets/icon/notification.svg';
import massAlocationIcon from '../Assets/icon/community.svg';
import findIcon from '../Assets/icon/community.svg';
import historyIcon from '../Assets/icon/history.svg';
import { useAuth } from "../services/adminservice.tsx";


const Navbar: React.FC = () => {

  const [activeElement,setActiveElement]=useState<string |null>('Find a student');

  const handleClick= (label:string)=>{
    setActiveElement(label);
  }
  const { logout } = useAuth();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const toggleProfilePopup = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleViewFullProfile = () => {
    // Navigate to the full profile view (e.g., a separate page or route)
    console.log('Redirecting to full profile...');
    // Example: Use a router to navigate
    // navigate(`/profile/full`);
  };

  return (
    <nav className={styles.outPassNav}>
      <header className={styles.outPassHeader}>

        <SectionHeader text="Student Details"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={findIcon}
          label="Find a student"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Find a student'} // Static false, no active state
          onClick={() => {handleClick('Find a student')}} // Empty function placeholder
        />
        <NavItem
          icon={reciptIcon}
          label="Hostel fees status"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Hostel fees status'} // Static false, no active state
          onClick={() => {handleClick('Hostel fees status')}} // Empty function placeholder
        />
        <NavItem
          icon={editIcon}
          label="Add/edit student details"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Add/edit student details'} // Static false, no active state
          onClick={() => {handleClick('Add/edit student details')}} // Empty function placeholder
        />

        <SectionHeader text="Allocation"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={assignIcon}
          label="Manual Allocation"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Manual Allocation'} // Static false, no active state
          onClick={() => {handleClick('Manual Allocation')}} // Empty function placeholder
        />
        <NavItem
          icon={massAlocationIcon}
          label="Mass Allocation"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Mass Allocation'} // Static false, no active state
          onClick={() => {handleClick('Mass Allocation')}} // Empty function placeholder
        />

        <NavItem
          icon={requestIcon}
          label="Allocation Request"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Allocation Request'} // Static false, no active state
          onClick={() => {handleClick('Allocation Request')}} // Empty function placeholder
        />

      <SectionHeader text="Outpass"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={assignIcon}
          label="Outpass Requests"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Outpass Requests'} // Static false, no active state
          onClick={() => {handleClick('Outpass Requests')}} // Empty function placeholder
        />
        <NavItem
          icon={logoutIcon}
          label="Out of campus"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Out of campus'} // Static false, no active state
          onClick={() => {handleClick('Out of campus')}} // Empty function placeholder
        />

        <NavItem
          icon={historyIcon}
          label="Outpass history"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Outpass history'} // Static false, no active state
          onClick={() => {handleClick('Outpass history')}} // Empty function placeholder
        />
        <SectionHeader text="Hostel Details"/>
        
        <hr className={styles.dividerLine} />

        <NavItem
          icon={listIcon}
          label="Public Room List"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Public Room List'} // Static false, no active state
          onClick={() => {handleClick('Public Room List')}} // Empty function placeholder
        />
        <NavItem
          icon={editIcon}
          label="Add/Edit Rooms"
          // badgeCount={4}
          link="" // Placeholder value
          isActive={activeElement==='Add/Edit Rooms'} // Static false, no active state
          onClick={() => {handleClick('Add/Edit Rooms')}} // Empty function placeholder
        />


        
        {/* <Divider /> */}
      </header>

      
      <footer className={styles.outPassFooter}>
      
      <FabButton
        iconSrc={profileIcon}
        iconAlt="Profile"
        onClick={toggleProfilePopup}
      />
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
            name="John Doe"
            email="johndoe@example.com"
            contact="9876543210"
            hostel="Shastri"
            profilePic="./add.svg"
            onViewFullProfile={handleViewFullProfile}
            onClose={toggleProfilePopup}
          />
        </div>
      )}
      <FabButton
        iconSrc={notificationIcon}
        iconAlt="Notification"
        onClick={() => {}}
      />
          <FabButton
          iconSrc={logoutIcon}
          iconAlt="Logout"
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              logout(); // Call the logout method
            }
          }}
        />

      </footer>
      
    </nav>
  );
};

export default Navbar;