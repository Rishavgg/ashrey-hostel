import React from 'react';
import styles from './Css/NameTableRow.module.css';

interface StudentTableProps {
  stud: {
    id: string; // Unique identifier for the student
    name: string;
    enrollNo: string;
    year: string;
    room: string;
    feesStatus?: 'u' | 'p'; // Optional prop: unpaid (u) or paid (p)
  }[];
}

const StudentTable: React.FC<StudentTableProps> = ({ stud }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.left}></th>
            <th>Name</th>
            <th>Enroll No</th>
            <th>Year</th>
            <th className={styles.right}>Hostel Room</th>
          </tr>
        </thead>
        <tbody>
          {stud.map((stud) => {
            const avatarLetter = stud.name.charAt(0).toUpperCase();

            // Conditional styling based on feesStatus
            const backgroundColor =
              stud.feesStatus === 'u'
                ? '#F7F8CC'
                : stud.feesStatus === 'p'
                ? '#D7F7D2'
                : '';

            const hoverBackgroundColor =
              stud.feesStatus === 'u'
                ? '#F1F3A8'
                : stud.feesStatus === 'p'
                ? '#BBF1B2'
                : '';

            return (
              <tr
                key={stud.id}
                className={styles.row}
                style={{ backgroundColor }}
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
                <td>
                  <div className={styles.avatar}>
                    <div className={styles.letter}>{avatarLetter}</div>
                  </div>
                </td>
                <td>{stud.name}</td>
                <td>{stud.enrollNo}</td>
                <td>{stud.year}</td>
                <td>{stud.room}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;