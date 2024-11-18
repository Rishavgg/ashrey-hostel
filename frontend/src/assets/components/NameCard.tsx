import React from 'react';
import styles from './Css/NameCard.module.css';

interface NameCardProps {
  name: string;
  id: string; // Unique identifier for the card
  status: string;
  year: string;
}

const NameCard: React.FC<NameCardProps> = ({ name, id, status, year }) => {
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
    <article className={styles.nameCard} onClick={() => handleCardClick(id)}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          <div className={styles.letter}>{avatarLetter}</div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.id}>{id}</p>
        </div>
      </div>
      <div className={styles.statusContainer}>
        <p className={styles.status}>{status}</p>
        <p className={styles.year}>{year}</p>
      </div>
    </article>
  );
};

export default NameCard;
