import Navbar from '../../components/NavbarStudent.tsx';
import FilterBar from '../../components/FilterBar.tsx';
import NameCard from '../../components/NameCard.tsx';
import Popup from '../../components/AddUser.tsx';
import FabButton from '../../components/Fab.tsx';
import {useState} from "react";

const Test = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100vh',
                overflow: 'hidden'
            }}>
                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    maxWidth: '79vw',
                    minWidth: '0'
                }}>
                    {/* Filter Bar */}
                    <FilterBar title="Page Title" />

                    {/* Rest of Content */}
                    <div style={{
                        padding: '20px',
                        gap: '20px',
                        position: 'sticky',
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        <NameCard
                            name="John Doe"
                            id="211478"
                            status="H 15 B9"
                            year="2nd"
                        />
                        {/* Add more NameCard components as needed */}
                    </div>
                </div>
            </div>

            {/* Popup */}
            {isPopupVisible && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                }}>
                    <Popup />
                </div>
            )}

            {/* Fab Button */}
            <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 1000
                }}>
                <FabButton
                iconSrc="/add.svg"
                iconAlt="Action icon"
                onClick={togglePopup}
            />
                </div>
            
        </div>
    );
};

export default Test;
