import React from 'react';
import styles from './Css/OutpassCard.module.css';

interface EnhancedNameCardProps {
  name: string;
  id: string; // Unique identifier for the card
  status: string;
  year: string;
  placeOfVisit: string;
  reasonForVisit: string;
  leaveDate: string; // Format: YYYY-MM-DD
  returnDate: string; // Format: YYYY-MM-DD
  daysDifference: number;
}

const EnhancedNameCard: React.FC<EnhancedNameCardProps> = ({
  name,
  id,
  status,
  year,
  placeOfVisit,
  reasonForVisit,
  leaveDate,
  returnDate,
  daysDifference,
}) => {
  // Extract the first letter from the name
  const avatarLetter = name.charAt(0).toUpperCase();

  const handleCardClick = async (id: string) => {
    try {
      const response = await fetch('https://your-backend-endpoint.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <article
      className={styles.enhancedNameCard}
      onClick={() => handleCardClick(id)}
    >
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          <div className={styles.letter}>{avatarLetter}</div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.id}>{id}</p>
        </div>
      </div>

      <div className={styles.detailsBlock}>
        <div className={styles.visitInfo}>
          <p className={styles.placeOfVisit}>{placeOfVisit}</p>
          <p className={styles.reasonForVisit}>{reasonForVisit}</p>
        </div>
        <div className={styles.dateInfo}>
          <p className={styles.date}>{leaveDate} | {returnDate}</p>
          <div className={styles.daysDifference}>{daysDifference}</div>
        </div>
      </div>

      <div className={styles.statusContainer}>
        <p className={styles.status}>{status}</p>
        <p className={styles.year}>{year}</p>
      </div>
    </article>
  );
};

export default EnhancedNameCard;
