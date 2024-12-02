import React from 'react';
import styles from './Css/NameTableRow.module.css';

interface StudentTableProps {
  student: {
    id: string; // Unique identifier for the student
    name: string;
    enrollNo: string;
    year: string;
    room: string;
    feesStatus?: 'u' | 'p'; // Optional prop: unpaid (u) or paid (p)
  }[];
}

const StudentTable: React.FC<StudentTableProps> = ({ student }) => {
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
          {student.map((student, index) => {
            const avatarLetter = student.name.charAt(0).toUpperCase();

            // Conditional styling based on feesStatus
            const backgroundColor =
              student.feesStatus === 'u'
                ? '#F7F8CC'
                : student.feesStatus === 'p'
                ? '#D7F7D2'
                : '';

            const hoverBackgroundColor =
              student.feesStatus === 'u'
                ? '#F1F3A8'
                : student.feesStatus === 'p'
                ? '#BBF1B2'
                : '';

            return (
              <tr
                key={index}
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
                <td>{student.name}</td>
                <td>{student.enrollNo}</td>
                <td>{student.year}</td>
                <td>{student.room}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;