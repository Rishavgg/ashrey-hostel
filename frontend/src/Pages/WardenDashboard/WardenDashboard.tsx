import Navbar from '../../components/NavbarWarden.tsx';
import FindStudent from "./FindStudent.tsx"; 
import HostelFees from './HostelFees.tsx'; 
// import ManualAllocation from './ManualAllocation.tsx';
import MassAllocation from './MassAllocation.tsx';
import AddEditStudent from './AddEditStudent.tsx';
import AddEditRooms from './AddEditRooms.tsx';
import AllocationReq from './AllocationReq.tsx';
import OutofCampus from './OutofCampus.tsx';
import OutpassHistory from './OutpassHistory.tsx';
import OutpassReq from './OutpassReq.tsx';
import PublicRoom from './PublicRoomList.tsx';
import { useState } from "react";

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
      // case 'Manual Allocation':
      //   return <ManualAllocation />;
      case 'Mass Allocation':
        return <MassAllocation />;
      case 'Allocation Request':
        return <AllocationReq />;
      case 'Add/edit Room details':
        return <AddEditRooms />;
      case 'Out of Campus':
        return <OutofCampus />;
      case 'Outpass History':
        return <OutpassHistory />;
      case 'Outpass Request':
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
            maxWidth: '79vw',
            minWidth: '0'
          }}
        >
          {/* Dynamic Content Area */}
          <div
            style={{
              padding: '20px',
              gap: '20px',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
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
