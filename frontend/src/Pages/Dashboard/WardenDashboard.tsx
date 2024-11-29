// import Navbar from '../../components/NavbarWarden.tsx';
// import FilterBar from '../../components/FilterBar.tsx';
// import { fetchStudentData, searchStudents } from "../../services/managerService.tsx"
// import FindStudentPage from "../../Pages/FindStudent.tsx"; 
// import HostelFeesPage from '../../Pages/HostelFees'; 
// import ManualAllocationPage from '../../Pages/ManualAllocation';
// import MassAllocationPage from '../../Pages/MassAllocation';
// import AddEditStudentPage from '../../Pages/AddEditStudent';
// import { useState } from "react";

// // Define Warden Component
// const Warden = () => {
//   const [activePage, setActivePage] = useState<string>('Find a student'); // Default page
//   const [students, setStudents] = useState<any[]>([]);
//   // Callback for changing the active page
//   const handlePageChange = (page: string) => {
//     setActivePage(page);
//   };

//   const handleSearch = async (searchTerm: string) => {
//     if (!searchTerm) {
//       // If search term is empty, reload all students
//       const data = await fetchStudentData(0, 10);
//       setStudents(data);
//     } else {
//       const data = await searchStudents(searchTerm, 0, 5); // Search for students
//       setStudents(data);
//     }
//   };

//   // Render content dynamically based on activePage
//   const renderContent = () => {
//     switch (activePage) {
//       case 'Find a student':
//         return <FindStudentPage />;
//       case 'Hostel fees status':
//         return <HostelFeesPage />;
//       case 'Manual Allocation':
//         return <ManualAllocationPage />;
//       case 'Mass Allocation':
//         return <MassAllocationPage />;
//       case 'Add/edit student details':
//         return <AddEditStudentPage />;
//       default:
//         return <FindStudentPage />;
//     }
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           height: '100vh',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Navbar */}
//         <Navbar onPageChange={handlePageChange} onSearch={handleSearch}/> 
//         {/* Main Content */}
//         <div
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             flexGrow: 1,
//             maxWidth: '79vw',
//             minWidth: '0',
//           }}
//         >
//           {/* Filter Bar */}
//           <FilterBar title={activePage}  />
//           {/* Dynamic Content Area */}
//           <div
//             style={{
//               padding: '20px',
//               gap: '20px',
//               width: '100%',
//               display: 'flex',
//               flexWrap: 'wrap',
//             }}
//           >
//             {renderContent()} {/* Render the content based on activePage */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Warden;
