import React from 'react';
import styles from './Css/ViewProfile.module.css';
import closeIcon from '../Assets/icon/close.svg';

type ProfileProps = {
  name: string;
  email: string;
  contact: string;
  hostel: string;
  onViewFullProfile: () => void; // Callback for "View Full Profile" button
  onClose: () => void; // Callback for closing the profile pop-up
};

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  contact,
  hostel,
  onViewFullProfile,
  onClose,
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick}></div>
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="Close" className={styles.icon} />
          </button>
        </header>

        <section className={styles.profileContent}>
          <div className={styles.profileDetails}>
            <div className={styles.fieldContainer}>
              <div className={styles.fieldLabel}>Name</div>
              <div className={styles.fieldInput}>{name}</div>
            </div>

            <div className={styles.fieldContainer}>
              <div className={styles.fieldLabel}>Email</div>
              <div className={styles.fieldInput}>{email}</div>
            </div>

            <div className={styles.fieldContainer}>
              <div className={styles.fieldLabel}>Contact</div>
              <div className={styles.fieldInput}>{contact}</div>
            </div>

            <div className={styles.fieldContainer}>
              <div className={styles.fieldLabel}>Hostel</div>
              <div className={styles.fieldInput}>{hostel}</div>
            </div>
          </div>
        </section>

        <footer className={styles.actions}>
          <button
            className={`${styles.actionButton} ${styles.success}`}
            onClick={onViewFullProfile}
          >
            View Full Profile
          </button>
          <button
            className={`${styles.actionButton} ${styles.danger}`}
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </main>
    </>
  );
};

export default Profile;
