import React, { useState } from 'react';
import styles from './Css/OutpassCard.module.css';

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
  outyet: boolean;
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
  wardencheck,
  // outyet,
  approvedby,
}) => {
  const avatarLetter = name.charAt(0).toUpperCase();
  const [approver, setApprover] = useState(approvedby);
  const [rejected, setRejected] = useState(false);

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
        throw new Error(`HTTP error! 
          : ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleApprove = async () => {
    const approverName = 'Warden John';
    setApprover(approverName);
    setRejected(false);

    try {
      await fetch('https://your-backend-endpoint.com/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, approvedby: approverName }),
      });
    } catch (error) {
      console.error('Error approving outpass:', error);
    }
  };

  const handleReject = async () => {
    setRejected(true);
    setApprover('');

    try {
      await fetch('https://your-backend-endpoint.com/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, rejected: true }),
      });
    } catch (error) {
      console.error('Error rejecting outpass:', error);
    }
  };

  // const cardClassName = `${styles.OutpassCard} ${approver && !rejected ? styles.approved : ''}`;
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

          {/* <div className={styles.daysDifference}>{daysDifference}</div> */}
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
        {wardencheck ? (
          !approver && !rejected ? (
            <div className={styles.buttonRow}>
              <button
                className={styles.approveButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove();
                }}
              >
                Approve
              </button>
              <button
                className={styles.rejectButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject();
                }}
              >
                Reject
              </button>
            </div>

          ) : rejected ? (
            <p className={styles.status}>Rejected</p>
          ) : (
            <p className={styles.status}>Approved by {approver}</p>
          )
        ) : (
          <p className={styles.status}>
            {rejected ? 'Rejected' : `Approved by ${approver}`}
          </p>
        )}
      </div>
    </article>
  );
};

export default OutpassCard;