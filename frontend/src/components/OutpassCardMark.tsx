import React, { useState } from 'react';
import styles from './Css/OutpassCardMark.module.css';

interface OutpassCardProps {
  name: string;
  id: string;
  hostel: string;
  year: string;
  placeOfVisit: string;
  reasonForVisit: string;
  leaveDate: string;
  returnDate: string;
  daysDifference: number;
  wardencheck: boolean;
  approvedby: string;
}

const OutpassCard: React.FC<OutpassCardProps> = ({
  name,
  id,
  hostel,
  year,
  placeOfVisit,
  reasonForVisit,
  leaveDate,
  returnDate,
  daysDifference,
  // wardencheck,
  approvedby,
}) => {
  const avatarLetter = name.charAt(0).toUpperCase();
  const [approver, setApprover] = useState(approvedby);
  const [rejected, setRejected] = useState(false);
  const [inputRoll, setInputRoll] = useState('');
  const [error, setError] = useState('');

  const handleCardClick = async (id: string) => {
    try {
      const response = await fetch('https://your-backend-endpoint.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error(`HTTP error! : ${response.status}`);

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConfirm = async () => {
    if (inputRoll.trim() === id) {
      const approverName = 'Gate Security';
      setApprover(approverName);
      setRejected(false);
      setError('');

      try {
        await fetch('https://your-backend-endpoint.com/confirm-exit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, approvedby: approverName }),
        });
      } catch (error) {
        console.error('Error confirming exit:', error);
      }
    } else {
      setError('Roll number does not match.');
    }
  };

  const cardClassName = `${styles.OutpassCard} ${approver && !rejected ? styles.approved : ''} ${rejected ? styles.rejected : ''}`;

  return (
    <article className={cardClassName} onClick={() => handleCardClick(id)}>
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
          <p className={styles.reasonForVisit}>{reasonForVisit}</p>
        </div>
        <div className={styles.dateInfo}>
          <p className={styles.date}>
            {leaveDate} | {returnDate}
          </p>
          <div
            className={`${styles.daysDifference} ${
              rejected
                ? styles.daysRejected
                : approver
                ? styles.daysApproved
                : styles.daysPending
            }`}
          >
            {daysDifference}
          </div>
        </div>
      </div>

      <div className={styles.statusContainer}>
        {!approver && !rejected ? (
          <div className={styles.confirmBlock}>
            <input
              type="text"
              className={styles.rollInput}
              placeholder="Enter Enroll No."
              value={inputRoll}
              onChange={(e) => {
                setInputRoll(e.target.value);
                setError('');
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className={styles.confirmButton}
              onClick={(e) => {
                e.stopPropagation();
                handleConfirm();
              }}
            >
              Confirm
            </button>
            
          </div>
          
        ) : rejected ? (
          <p className={styles.status}>Rejected</p>
        ) : (
          <p className={styles.status}>Student marked out of campus</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </article>
  );
};

export default OutpassCard;
