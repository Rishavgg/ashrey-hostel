import React from 'react';
import styles from './Css/Popup.module.css';

type ProfileProps = {
  name: string;
  email: string;
  contact: string;
  hostel: string;
  profilePic: string; // URL or path to profile picture
  onViewFullProfile: () => void; // Callback for "View Full Profile" button
  onClose: () => void; // Callback for closing the profile pop-up
};

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  contact,
  hostel,
  profilePic,
  onViewFullProfile,
  onClose,
}) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </header>

      <section className={styles.profileContent}>
        {/* Profile Picture */}
        <div className={styles.profilePicContainer}>
          <img src={profilePic} alt={`${name}'s profile`} className={styles.profilePic} />
        </div>

        {/* Basic Details */}
        <div className={styles.profileDetails}>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Hostel:</strong> {hostel}
          </p>
        </div>
      </section>

      {/* Footer Buttons */}
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
  );
};

export default Profile;
