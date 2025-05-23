import { useEffect, useState } from "react";
import HostelCard from "../../components/HostelCard.tsx";
import HostelTable from "../../components/HostelTable.tsx";
import FilterBar from "../../components/FilterBar.tsx";
import { fetchPublicRoomss} from "../../services/managerService.tsx";
import styles from '../../components/Css/TileView.module.css'

interface HostelCardProps {
  hotelName: string;
  balcony: 0 | 1;
  sunny: 0 | 1;
  level: number;
  roomNo: string;
  capacity: number;
  occupancy: number;
}

const PublicRoom = () => {
  const [rooms, setRooms] = useState<HostelCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [view, setView] = useState("Tile");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await fetchPublicRoomss(page,size);
        const transformedRooms: HostelCardProps[] = roomsData.map((room) => ({
          hotelName: room.hostelName, // Use hostelName directly from API response
          balcony: room.balcony ? 1 : 0,
          sunny: room.sunlight ? 1 : 0,
          level: room.level,
          roomNo: room.roomNumber,
          capacity: room.capacity,
          occupancy: room.currentOccupancy,
        }));
        setRooms(transformedRooms);
        setLoading(false);
      } catch (error) {
        console.error("Error loading rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, [page, size]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => (prev > 0 ? prev - 1 : 0));

  const handleToggleView = (selectedView: string) => {
    setView(selectedView); // Update view to either "Tile" or "Table"
  };

  return (
      <div style={{height:'100vh'}}>
        <div
            style={{
              gap: "20px",
              position: "sticky",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
        >
          <FilterBar title="Public Room List" onSearch={undefined} onToggle={handleToggleView} />
          {loading && <p>Loading rooms...</p>}
          {rooms.length === 0 && !loading && <p style={{padding:'0px 20px'}}>No rooms found.</p>}

          {view === "Tile" ? (
              <div className={styles.tileView} >
                {rooms.map((room, index) => (
                    <HostelCard
                        key={index}
                        hotelName={room.hotelName}
                        balcony={room.balcony}
                        sunny={room.sunny}
                        level={room.level}
                        roomNo={room.roomNo}
                        capacity={room.capacity ?? 0}
                        occupancy={room.occupancy ?? 0}
                    />
                ))}
              </div>
          ) : (
              <HostelTable rooms={rooms} />
          )}
        </div>
        <div style={{width:'100%', display:"flex", justifyContent:"center",position:'relative', gap:'20px', bottom:'20px'}} >
          <button onClick={handlePrevPage}>Prev</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
  );
};

export default PublicRoom;
