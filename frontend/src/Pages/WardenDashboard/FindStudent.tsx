import React from 'react';
import Navbar from "../../components/NavbarWarden.tsx";
import FilterBar from "../../components/FilterBar.tsx";
import NameCard from "../../components/NameCard.tsx";
import AddUser from "../../components/AddUser.tsx";
import FabButton from "../../components/Fab.tsx";
import { useEffect, useState, useRef } from "react";
import {
  fetchStudentData,
  fetchStudentProfile,
  searchStudents,
  uploadExcel,
} from "../../services/managerService.tsx";
import * as Yup from "yup";
import { useAuth } from "../../Context/UseAuth.tsx";
import Profile from "../../components/Profile.tsx";
import profileIcon from "../../Assets/icon/profile.svg";

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
