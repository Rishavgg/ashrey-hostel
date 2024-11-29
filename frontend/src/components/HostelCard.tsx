import React from 'react';
import styles from './Css/HostelCard.module.css';

// Icons for balcony and sunny props
import balconyIcon from '../Assets/icon/Balcony.svg';
import windowIcon from '../Assets/icon/window.svg';

import sunnyIcon from '../Assets/icon/sunny.svg';
import shadyIcon from '../Assets/icon/shade.svg';

interface HostelCardProps {
    name: string; // Original name (e.g., "H15 B")
    balcony: 0 | 1; // Binary value for balcony (0: no, 1: yes)
    sunny: 0 | 1; // Binary value for sunny (0: no, 1: yes)
    level: number; // Integer level value
    roomNo: string; // Room number to concatenate with name
    capacity: number;
    occupant: number;
    // id:;
}

const getHostelName = (name: string): string => {
  if (name.startsWith('H15')) return 'Parmar Bhavan';
  if (name.startsWith('H14')) return 'Azad Bhavan';
  if (name.startsWith('H13')) return 'Geeta Bhavan';
  return 'Shastri Bhavan';
};
const HostelCard: React.FC<HostelCardProps> = ({ name, balcony, sunny, level, roomNo, capacity, occupant }) => {
  const hostelName = getHostelName(name);
  const fullName = `${name} ${roomNo}`; // Concatenating room number with name

  // Determine background color based on capacity and occupant
  const cardBackgroundColor = capacity === occupant ? '#d7d7d7' : '#ffffff';

  return (
    <article
      className={styles.nameCard}
      style={{
        backgroundColor: cardBackgroundColor, // Conditional background color
        transition: 'background-color 0.3s',
      }}
    >
      {/* Avatar and Hostel Name Section */}
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>
          <div className={styles.letter}>{roomNo}</div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{hostelName}</h2>
          <p className={styles.id}>{fullName}</p>
        </div>
      </div>

      {/* Status (Balcony and Sunny) and Level Section */}
      <div className={styles.statusContainer}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          {/* Balcony Icon */}
          {balcony === 1 ? <img src={balconyIcon} alt="Balcony Yes" /> : <img src={windowIcon} alt="Balcony No" />}
          {/* Sunny Icon */}
          {sunny === 1 ? <img src={sunnyIcon} alt="Sunny Yes" /> : <img src={shadyIcon} alt="Sunny No" />}
        </div>
        <p className={styles.year}>{level}</p> {/* Replacing year with level */}
      </div>
    </article>
  );
};


export default HostelCard;
