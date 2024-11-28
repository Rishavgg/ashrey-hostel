import React from 'react';

interface Student {
  id: number;
  name: string;
  hostel: string;
}

interface FindStudentProps {
  students: Student[]; // Pass the list of students as a prop
}

const FindStudent: React.FC<FindStudentProps> = ({ students }) => {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.hostel}
            </li>
          ))
        ) : (
          <li>No students found.</li>
        )}
      </ul>
    </div>
  );
};

export default FindStudent;
