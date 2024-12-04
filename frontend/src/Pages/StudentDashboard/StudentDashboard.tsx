// import OutpassCard from '../../components/OutpassCard.tsx'
import Navbar from '../../components/NavbarStudent.tsx'
import { useState } from "react";

// pages
import ListOfRooms from "./ListOfRooms.tsx"
import InventoryForm from "./InventoryForm.tsx"
import ParticipateInMassAllocation from "./ParticipateInMassAllocation.tsx"
import RegisterComplaint from "./RegisterComplaint.tsx"
import RequestRoomChange from "./RequestRoomChange.tsx"

// import FilterBar from '../../components/FilterBar.tsx'


const HomePage = () => {

    const [activePage, setActivePage] = useState<string>('List of Rooms'); // Default page
    // Callback for changing the active page
    const handlePageChange = (page: string) => {
      setActivePage(page);
    };

    const renderContent = () => {
        switch (activePage) {
          case 'List of Rooms':
            return <ListOfRooms />;
          case 'Inventory Form':
            return <InventoryForm/>;
          case 'Participate in Mass Allocation':
            return <ParticipateInMassAllocation />;
          case 'Regsiter A Complaint':
            return <RegisterComplaint/>;
          case 'Request Room change':
            return <RequestRoomChange/>;
          default:
            return <ListOfRooms />;
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

export default HomePage;