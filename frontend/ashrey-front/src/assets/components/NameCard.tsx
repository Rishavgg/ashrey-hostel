import React from 'react';
import styles from './Css/NameCard.module.css';

interface NameCardProps {
  name: string;
  id: string;
  avatarLetter: string;
  status: string;
  year: string;
}

const NameCard: React.FC<NameCardProps> = ({ name, id, avatarLetter, status, year }) => {
  return (
    <article className={styles.nameCard}>
      <div className={styles.avatarBlock}>
        <div className={styles.avatar}>{avatarLetter}</div>
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