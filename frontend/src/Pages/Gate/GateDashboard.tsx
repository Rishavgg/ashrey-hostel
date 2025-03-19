import Navbar from '../../components/NavbarWarden.tsx';
// import FindStudent from "./FindStudent.tsx"; 
// import HostelFees from './HostelFees.tsx'; 
// import ManualAllocation from './ManualAllocation.tsx';
// import MassAllocation from './MassAllocation.tsx';
// import AddEditStudent from './AddEditStudent.tsx';
// import AddEditRooms from './AddEditRooms.tsx';
// import AllocationReq from './AllocationReq.tsx';
import OutofCampus from './OutofCampus.tsx';
import OutpassHistory from './OutpassHistory.tsx';
import OutpassApproved from './OutpassApproved.tsx';

// import OutpassReq from './OutpassReq.tsx';
// import PublicRoom from './PublicRoomList.tsx';
import { useState } from "react";
// import AssignRoomForm from '../../components/ManualAllocation.tsx';

// Define Warden Component
const Gate = () => {
  const [activePage, setActivePage] = useState<string>('Find a student'); // Default page
  // Callback for changing the active page
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  // Render content dynamically based on activePage
  const renderContent = () => {
    switch (activePage) {
      case 'Out of campus':
        return <OutofCampus />;
      case 'Outpass history':
        return <OutpassHistory />;
      case 'Outpass Requests':
        return <OutpassApproved />;
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

export default Gate;
