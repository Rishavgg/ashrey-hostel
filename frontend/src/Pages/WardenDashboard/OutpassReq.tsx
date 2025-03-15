import OutpassCard from "../../components/OutpassCard";
import PageTitle from "../../components/PageTitle";
import styles from '../../components/Css/TileView.module.css';

const OutpassReq: React.FC = () => {
  const outpassData = [
    {
      name: "John Doe",
      id: "12345",
      hostel:"H 15",
      year: "2nd Year",
      placeOfVisit: "New York",
      reasonForVisit: "Family Visit",
      leaveDate: "2025-03-20",
      returnDate: "2025-03-25",
      daysDifference: 5,
      wardencheck: false,
      outyet: false,
      approvedby: "Warden Smith",
    },
    {
      name: "Jane Smith",
      id: "67890",
      hostel:"H 15",
      year: "1st Year",
      placeOfVisit: "Los Angeles",
      reasonForVisit: "Medical Checkup",
      leaveDate: "2025-03-22",
      returnDate: "2025-03-24",
      daysDifference: 2,
      wardencheck: true,
      outyet: false,
      approvedby: "",
    }
    // Add more if needed
  ];

  return (
    <div style={{  display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Sticky header like FindStudent */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "white",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
        padding: "20px",
        width: "100%"
      }}>
        <PageTitle text="Outpass Request" />
      </div>

      {/* Tile-like grid structure from FindStudent */}
      <div className={styles.tileView}>
        {outpassData.map((outpass, index) => (
          <OutpassCard key={index} {...outpass} />
        ))}
      </div>

      {/* <h2 style={{ textAlign: "center", marginTop: "20px" }}>Under construction</h2> */}
    </div>
  );
};

export default OutpassReq;
