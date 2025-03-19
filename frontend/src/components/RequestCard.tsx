import React, { useState } from 'react';
import styles from './Css/RequestCard.module.css';

type Student = {
  name: string;
  initials: string;
  room: string;
};

type RequestCardProps = {
  type: 'swap' | 'apply';
  newRoom?: string; // Only for apply
  students: Student[];
};

const RequestCard: React.FC<RequestCardProps> = ({ type, newRoom, students }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'approved'>('idle');

  const handleApprove = () => {
    if (status !== 'idle') return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('approved');
    }, 1000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.typeTag}>
          <span className={styles.icon}>👥</span>
          <span>{type === 'swap' ? 'Swap' : 'Room Change'}</span>
        </div>

        {type === 'apply' && newRoom && (
          <div className={styles.newRoomTag}>
            {newRoom}
          </div>
        )}

        <div className={styles.initialsGroup}>
          {students.map((student, idx) => (
            <div
              key={idx}
              className={styles.initialCircle}
              style={{
                backgroundColor: idx % 2 === 0 ? '#833434' : '#2D2D2D',
              }}
            >
              {student.initials}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        {students.map((student, idx) => (
          <div key={idx} className={styles.studentCard}>
            <div className={styles.studentName}>{student.name}</div>
            <div className={styles.studentRoom}>{student.room}</div>
          </div>
        ))}

        <button
          className={styles.approvebtn}
          onClick={handleApprove}
          disabled={status !== 'idle'}
        >
          {status === 'idle' && 'Approve'}
          {status === 'processing' && 'Processing...'}
          {status === 'approved' && 'Approved'}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
