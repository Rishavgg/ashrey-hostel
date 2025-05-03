
import PageTitle from "../../components/PageTitle";
import styles from '../../components/Css/TileView.module.css';
import RoomChangeForm from "../../components/RoomChangeForm";

const RoomChange: React.FC = () => {


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

      <RoomChangeForm
        mode="swap"
        studentName="John Doe"
        currentRoom={{ id: "r1", roomNo: "B-102" }}
        swapCandidates={["Alice", "Bob", "Charlie"]}
        availableRooms={[{ id: "r2", roomNo: "C-201" }, { id: "r3", roomNo: "A-103" }]}
        onSubmit={()=>{}}
        onCancel={() => setShowForm(false)}
        isLoading={()=>{}}
      />
        


      </div>

      {/* <h2 style={{ textAlign: "center", marginTop: "20px" }}>Under construction</h2> */}
    </div>
  );
};

export default RoomChange;

