// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// // import SelectHostel from "../../components/SelectHostel"; // Hostel dropdown
// import Dropdown from "../../components/DropdownNames"; // Existing Dropdown component
// import styles from "../../components/Css/ManualAllocation.module.css";
// // import FilterBar from "../../components/FilterBar";

// import {
//   fetchStudents,
//   fetchHostels,
//   assignRoomToStudent,
// } from "../../services/managerService";
// import PageTitle from "../../components/PageTitle";

// // type Room = {
// //   name: string;
// //   balcony: number;
// //   sunny: number;
// //   level: number;
// //   roomNo: string;
// //   capacity: number;
// //   occupancy: number;
// // };

// type Student = {
//   studentId: number;
//   name: string;
//   rollNumber: string;
// };

// type Hostel = {
//   hostelId: number;
//   hostelName: string;
// };

// const AssignRoomForm: React.FC = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [hostels, setHostels] = useState<Hostel[]>([]);
//   const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
//   const [roomNumber, setRoomNumber] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Fetch students and hostels on component mount
//     const loadData = async () => {
//       try {
//         const studentsData = await fetchStudents();
//         const hostelsData = await fetchHostels();
//         setStudents(studentsData);
//         setHostels(hostelsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     loadData();
//   }, []);

//   // Form validation
//   const validationSchema = Yup.object().shape({
//     hostel: Yup.object().required("Hostel is required"),
//     student: Yup.object().required("Student is required"),
//     roomNumber: Yup.string().required("Room Number is required"),
//   });

//   const {
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const handleSave = async () => {
//     if (selectedStudent && selectedHostel && roomNumber) {
//       setIsSubmitting(true);
//       try {
//         await assignRoomToStudent(selectedStudent.studentId, parseInt(roomNumber));
//         alert("Room assigned successfully!");
//       } catch (error) {
//         console.error("Error assigning room:", error);
//         alert("Failed to assign the room. Please try again.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return (
//     <main className={styles.formContainer}>
//       {/* <FilterBar
//         title="Manual Allocation"
//         onSearch={(searchTerm: string) => {
//           // Filter students based on search term
//           const filteredStudents = students.filter((student) =>
//             student.rollNumber.includes(searchTerm)
//           );
//           setStudents(filteredStudents);
//         }}
//         onToggle={(view) => console.log("View toggled to:", view)}
//       /> */}
//       <PageTitle text="Manual Allocation" />

//       <form
//         className={styles.form}
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit(handleSave)();
//         }}
//       >
//         <section className={styles.formFields}>
//           {/* Hostel Dropdown */}
//           <div className={styles.fieldWrapper}>
//             <label className={styles.fieldLabel}>Hostel</label>
//             <Dropdown
//               label="Hostel"
//               options={hostels.map((hostel) => hostel.hostelName)}
//               onOptionSelect={(name) => {
//                 const selected = hostels.find((hostel) => hostel.hostelName === name);
//                 setSelectedHostel(selected || null);
//               }}
//             />
//             {errors.hostel && <span className={styles.errorMessage}>{errors.hostel.message}</span>}
//           </div>

//           {/* Room Number */}
//           <div className={styles.fieldWrapper}>
//             <label className={styles.fieldLabel}>Room Number</label>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={roomNumber}
//               onChange={(e) => setRoomNumber(e.target.value)}
//             />
//             {errors.roomNumber && (
//               <span className={styles.errorMessage}>{errors.roomNumber.message}</span>
//             )}
//           </div>

//           {/* Student Dropdown */}
//           <div className={styles.fieldWrapper}>
//             <label className={styles.fieldLabel}>Student</label>
//             <Dropdown
//               label="Student"
//               options={students.map((student) => student.rollNumber)}
//               onOptionSelect={(rollNumber) => {
//                 const selected = students.find((student) => student.rollNumber === rollNumber);
//                 setSelectedStudent(selected || null);
//               }}
//             />
//             {errors.student && <span className={styles.errorMessage}>{errors.student.message}</span>}
//           </div>
//         </section>

//         <footer className={styles.formActions}>
//           <button
//             type="submit"
//             className={`${styles.actionButton} ${styles.successButton}`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Assigning..." : "Assign"}
//           </button>
//         </footer>
//       </form>
//     </main>
//   );
// };

// export default AssignRoomForm;
