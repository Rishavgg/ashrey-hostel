import React from 'react';
import styles from './Css/NameCard.module.css';

interface NameCardProps {
  name: string;
  id: string; // Unique identifier for the card
  status: string;
  year: string;
  feesStatus?: 'u' | 'p'; // Optional prop, can be "u" or "p"
}

const NameCard: React.FC<NameCardProps> = ({ name, id, status, year, feesStatus }) => {
  // Extract the first letter from the name
  const avatarLetter = name.charAt(0).toUpperCase();

  // Determine background colors based on feesStatus
  const backgroundColor =
    feesStatus === 'u'
      ? '#F7F8CC'
      : feesStatus === 'p'
      ? '#D7F7D2'
      : ''; // Default: no color

  const hoverBackgroundColor =
    feesStatus === 'u'
      ? '#F1F3A8'
      : feesStatus === 'p'
      ? '#BBF1B2'
      : ''; // Default: no hover color

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
      className={styles.nameCard}
      onClick={() => handleCardClick(id)}
      style={{
        backgroundColor,
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={(e) => {
        if (hoverBackgroundColor) {
          (e.currentTarget as HTMLElement).style.backgroundColor = hoverBackgroundColor;
        }
      }}
      onMouseLeave={(e) => {
        if (backgroundColor) {
          (e.currentTarget as HTMLElement).style.backgroundColor = backgroundColor;
        }
      }}
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
      <div className={styles.statusContainer}>
        <p className={styles.status}>{status}</p>
        <p className={styles.year}>{year}</p>
      </div>
    </article>
  );
};

export default NameCard;
