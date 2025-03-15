import { useState } from "react";
import FilterBar from "../../components/FilterBar";
import OutOfCampusTab from "../../components/OutOfCampusTab";
import OutOfCampusTable from "../../components/OutOfCampusTable"; // Create this like StudntTable
import styles from "../../components/Css/TileView.module.css"; // Reuse existing tile style

const OutPassHistory: React.FC = () => {
  const [view, setView] = useState("Tile");

  const outCampusData = [
    {
      name: "John Doe",
      id: "12345",
      hostel: "H 15",
      year: "2nd Year",
      placeOfVisit: "New York",
      reasonForVisit: "Family Visit",
      leaveDate: "2025-03-20",
      returnDate: "2025-03-25",
      wardencheck: true,
      approvedby: "Warden Smith",
    },
    {
      name: "Jane Smith",
      id: "67890",
      hostel: "H 12",
      year: "1st Year",
      placeOfVisit: "Los Angeles",
      reasonForVisit: "Medical Checkup",
      leaveDate: "2025-03-22",
      returnDate: "2025-03-24",
      wardencheck: false,
      approvedby: "",
    },
  ];

  const handleSearch = (searchTerm: string) => {
    // Optional: Add filtering logic if needed
    console.log("Search:", searchTerm);
  };

  const handleToggleView = (selectedView: string) => {
    setView(selectedView);
  };

  return (
    <div
      style={{
        gap: "20px",
        position: "sticky",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FilterBar title="Out of Campus" onSearch={handleSearch} onToggle={handleToggleView} />
        <div
        style={{
          padding:"10px",
        }}
      >
      {view === "Tile" ? (
        <div className={styles.tileView}>
          {outCampusData.length === 0 && <p>No requests found.</p>}
          {outCampusData.map((data, index) => (
            <OutOfCampusTab key={index} {...data} />
          ))}
        </div>
      ) : (
        <OutOfCampusTable requests={outCampusData} />
      )}
    </div>
    </div>
  );
};

export default OutPassHistory;
