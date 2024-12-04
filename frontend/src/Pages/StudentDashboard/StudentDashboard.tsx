import Navbar from '../../components/NavbarStudent.tsx';
import { useState } from "react";

// Pages
import ListOfRooms from "./ListOfRooms.tsx";
import InventoryForm from "./InventoryForm.tsx";
import ParticipateInMassAllocation from "./ParticipateInMassAllocation.tsx";
import RegisterComplaint from "./RegisterComplaint.tsx";
import RequestRoomChange from "./RequestRoomChange.tsx";

const HomePage = () => {
  const [activePage, setActivePage] = useState<string>('List of Rooms');

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'List of Rooms':
        return <ListOfRooms />;
      case 'Inventory Form':
        return <InventoryForm />;
      case 'Participate in Mass Allocation':
        return <ParticipateInMassAllocation />;
      case 'Register A Complaint':
        return <RegisterComplaint />;
      case 'Request Room change':
        return <RequestRoomChange />;
      default:
        return <ListOfRooms />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Navbar */}
      <Navbar onPageChange={handlePageChange} />

      {/* Main Content */}
      <div style={{ flexGrow: 1, maxWidth: '79%', minWidth: '0' }}>
        <div style={{ width: '100%' }}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default HomePage;
