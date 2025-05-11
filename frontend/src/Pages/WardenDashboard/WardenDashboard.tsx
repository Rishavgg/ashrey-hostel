import Navbar from '../../components/NavbarWarden.tsx';
import FindStudent from "./FindStudent.tsx"; 
import HostelFees from './HostelFees.tsx'; 
import ManualAllocation from './ManualAllocation.tsx';
import MassAllocation from './MassAllocation.tsx';
import AddEditStudent from './AddEditStudent.tsx';
import AddEditRooms from './AddEditRooms.tsx';
import AllocationReq from './AllocationReq.tsx';
import OutofCampus from './OutofCampus.tsx';
import OutpassHistory from './OutpassHistory.tsx';
import OutpassReq from './OutpassReq.tsx';
import PublicRoom from './PublicRoomList.tsx';
import { useState } from "react";
// import AssignRoomForm from '../../components/ManualAllocation.tsx';

// Define Warden Component
const Warden = () => {
  const [activePage, setActivePage] = useState<string>('Find a student'); // Default page
  // Callback for changing the active page
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  // Render content dynamically based on activePage
  const renderContent = () => {
    switch (activePage) {
      case 'Find a student':
        return <FindStudent />;
      case 'Hostel fees status':
        return <HostelFees />;
      case 'Manual Allocation':
        return <ManualAllocation />
          {/* <AssignRoomForm
            hostelOptions={[
              { name: 'Room A1', balcony: 1, sunny: 1, level: 2, roomNo: '101', capacity: 3, occupancy: 1 },
              { name: 'Room B2', balcony: 0, sunny: 0, level: 1, roomNo: '102', capacity: 2, occupancy: 1 },
            ]} // Example hostel options
            studentOptions={[
              { id: 'S001', name: 'John Doe' },
              { id: 'S002', name: 'Jane Smith' },
            ]} // Example student options
            defaultHostel={undefined}
            defaultStudent1={undefined}
            defaultStudent2={undefined}
            onSubmit={async (data) => {
              console.log('Assigned Data:', data);
              alert(`Room assigned successfully!\nHostel: ${data.hostel.name}\nStudent 1: ${data.student1.name}`);
            }}
            onCancel={() => console.log('Manual allocation cancelled')}
            isLoading={false}
          /> */ }
      case 'Mass Allocation':
        return <MassAllocation />;
      case 'Allocation Request':
        return <AllocationReq />;
      case 'Add/Edit Rooms':
        return <AddEditRooms />;
      case 'Out of campus':
        return <OutofCampus />;
      case 'Outpass history':
        return <OutpassHistory />;
      case 'Outpass Requests':
        return <OutpassReq />;
      case 'Add/Edit student details':
          return <AddEditStudent />;
      case 'Public Room List':
          return <PublicRoom/>;
      default:
        return <FindStudent/>;
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Navbar */}
        <Navbar onPageChange={handlePageChange} /> {/* Pass callback to Navbar */}

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            maxWidth: '79%',
            minWidth: '0'
          }}
        >
          {/* Dynamic Content Area */}
          <div
            style={{
              width: '100%',
            }}
          >
            {renderContent()} {/* Render the content based on activePage */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warden;
