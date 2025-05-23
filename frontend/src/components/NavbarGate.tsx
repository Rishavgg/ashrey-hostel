// import React, { useState } from 'react';
// import styles from './Css/Navbar.module.css';
// import SectionHeader from './SectionHeader.tsx';
// import NavItem from './NavItem.tsx';
// import FabButton from './Fab.tsx';
// // import Profile from '../components/Profile.tsx';

// import logoutIcon from '../Assets/icon/out.svg';
// import assignIcon from '../Assets/icon/assign.svg';
// // import profileIcon from '../Assets/icon/profile.svg';
// // import listIcon from '../Assets/icon/list.svg';
// // import requestIcon from '../Assets/icon/request.svg'; 
// // import notificationIcon from '../Assets/icon/notification.svg';
// // import massAllocationIcon from '../Assets/icon/community.svg';
// // import findIcon from '../Assets/icon/community.svg';
// import historyIcon from '../Assets/icon/history.svg';

// import { useAuth } from '../services/adminservice.tsx';

// const Navbar: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
//   const [activeElement, setActiveElement] = useState<string | null>('Find a student');
//   const [isProfileVisible, setIsProfileVisible] = useState(false);
//   const { logout } = useAuth();

//   const handleClick = (label: string) => {
//     setActiveElement(label);
//     onPageChange(label);
//   };

//   const toggleProfilePopup = () => {
//     setIsProfileVisible(!isProfileVisible);
//   };

//   const handleViewFullProfile = () => {
//     console.log('Redirecting to full profile...');
//   };

//   return (
//     <nav className={styles.outPassNav}>
//       <header className={styles.outPassHeader}>

//         {/* Outpass Section */}
//         <SectionHeader text="Outpass" />
//         <hr className={styles.dividerLine} />
//         <NavItem
//           icon={assignIcon}
//           label="Approved Outpasses"
//           isActive={activeElement === 'Approved Outpasses'}
//           onClick={() => handleClick('Approved Outpasses')}
//           link={''}
//         />
//         <NavItem
//           icon={logoutIcon}
//           label="Out of campus"
//           isActive={activeElement === 'Out of campus'}
//           onClick={() => handleClick('Out of campus')}
//           link={''}
//         />
//         <NavItem
//           icon={historyIcon}
//           label="Outpass history"
//           isActive={activeElement === 'Outpass history'}
//           onClick={() => handleClick('Outpass history')}
//           link={''}
//         />
//       </header>

//       {/* Footer */}
//       <footer className={styles.outPassFooter}>
//         {/* <FabButton iconSrc={profileIcon} iconAlt="Profile" onClick={toggleProfilePopup} /> */}
//         {isProfileVisible && (
//           <div
//             style={{
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               zIndex: 1000,
//             }}
//           >
//             {/* <Profile
//               name="John Singh"
//               email="johndoe@example.com"
//               contact="9876543210"
//               hostel="Shastri"
//               profilePic="./add.svg"
//               onViewFullProfile={handleViewFullProfile}
//               onClose={toggleProfilePopup}
//             /> */}
//           </div>
//         )}
//         {/* <FabButton iconSrc={notificationIcon} iconAlt="Notification" onClick={() => console.log('Notifications clicked')} /> */}
//         <FabButton
//           iconSrc={logoutIcon}
//           iconAlt="Logout"
//           onClick={() => {
//             if (window.confirm('Are you sure you want to log out?')) {
//               logout();
//             }
//           }}
//         />
//       </footer>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import styles from './Css/Navbar.module.css';
import SectionHeader from './SectionHeader.tsx';
import NavItem from './NavItem.tsx';
import FabButton from './Fab.tsx';

import logoutIcon from '../Assets/icon/out.svg';
import assignIcon from '../Assets/icon/assign.svg';
import historyIcon from '../Assets/icon/history.svg';

import { useAuth } from '../services/adminservice.tsx';

const Navbar: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const [activeElement, setActiveElement] = useState<string | null>('Find a student');
  const { logout } = useAuth();

  const handleClick = (label: string) => {
    setActiveElement(label);
    onPageChange(label);
  };

  return (
    <nav className={styles.outPassNav}>
      <header className={styles.outPassHeader}>

        {/* Outpass Section */}
        <SectionHeader text="Outpass" />
        <hr className={styles.dividerLine} />
        <NavItem
          icon={assignIcon}
          label="Approved Outpasses"
          isActive={activeElement === 'Approved Outpasses'}
          onClick={() => handleClick('Approved Outpasses')}
          link={''}
        />
        <NavItem
          icon={logoutIcon}
          label="Out of campus"
          isActive={activeElement === 'Out of campus'}
          onClick={() => handleClick('Out of campus')}
          link={''}
        />
        <NavItem
          icon={historyIcon}
          label="Outpass history"
          isActive={activeElement === 'Outpass history'}
          onClick={() => handleClick('Outpass history')}
          link={''}
        />
      </header>

      {/* Footer */}
      <footer className={styles.outPassFooter}>
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
