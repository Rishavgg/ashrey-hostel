// import React from 'react';
// // import styles from './Css/NavItem.css';
// import styles from './NavItem.module.css';

// interface NavItemProps {
//   icon: string;
//   label: string;
//   badgeCount?: number;
// }

// const NavItem: React.FC<NavItemProps> = ({ icon, label, badgeCount }) => {
//   return (
//     <nav className={styles.navItem}>
//       <div className={styles.stateLayer}>
//         <img src={icon} alt="" className={styles.icon} />
//         <span className={styles.label}>{label}</span>
//         {badgeCount !== undefined && (
//           <span className={styles.badgeLabel} aria-label={`${badgeCount} notifications`}>
//             {badgeCount}
//           </span>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavItem;



import React from 'react';
import styles from './Css/NavItem.module.css';

interface NavItemProps {
  icon: string;
  label: string;
  badgeCount?: number;
  link: string; // Added link prop
  isActive: boolean; // Added active state prop
  onClick: (link: string) => void; // Function to notify parent
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, badgeCount, link, isActive, onClick }) => {
  return (
    <nav
      className={`${styles.navItem} ${isActive ? styles.active : ''}`} // Apply active class
      onClick={() => onClick(link)} // Notify parent on click
      tabIndex={0} // Allow focus with keyboard
    >
      <div className={styles.stateLayer}>
        <img src={icon} alt="" className={styles.icon} />
        <span className={styles.label}>{label}</span>
        {badgeCount !== undefined && (
          <span className={styles.badgeLabel} aria-label={`${badgeCount} notifications`}>
            {badgeCount}
          </span>
        )}
      </div>
    </nav>
  );
};

export default NavItem;
