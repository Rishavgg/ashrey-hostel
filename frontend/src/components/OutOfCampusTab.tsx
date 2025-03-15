import React from 'react';
import styles from './Css/OutpassTab.module.css';

interface OutOfCampusTabProps {
  name: string;
  id: string;
  hostel: string;
  year: string;
  placeOfVisit: string;
  returnDate: string;
  wardencheck: boolean;
  approvedby: string;
}

const OutOfCampusTab: React.FC<OutOfCampusTabProps> = ({
  name,
  id,
  hostel,
  year,
  placeOfVisit,
  returnDate,
  wardencheck,
  approvedby,
}) => {
  const avatarLetter = name.charAt(0).toUpperCase();

  let statusText = 'Pending';
  if (wardencheck) {
    statusText = approvedby ? `Approved by ${approvedby}` : 'Pending';
  } else {
    statusText = 'Not Checked';
  }

  return (
    <article className={styles.OutpassCard}>
      <div className={styles.avatBlock}>
        <div className={styles.avatarBlock}>
          <div className={styles.avatar}>
            <div className={styles.letter}>{avatarLetter}</div>
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.id}>{id}</p>
          </div>
        </div>
        <div className={styles.statContainer}>
          <p className={styles.status}>{hostel}</p>
          <p className={styles.year}>{year}</p>
        </div>
      </div>

      <div className={styles.detailsBlock}>
        <div className={styles.visitInfo}>
          <p className={styles.placeOfVisit}>{placeOfVisit}</p>
        </div>
        <div className={styles.dateInfo}>
          <p className={styles.date}>{returnDate}</p>
        </div>
      </div>

      <div className={styles.statusContainer}>
        <p className={styles.status}>{statusText}</p>
      </div>
    </article>
  );
};

export default OutOfCampusTab;
