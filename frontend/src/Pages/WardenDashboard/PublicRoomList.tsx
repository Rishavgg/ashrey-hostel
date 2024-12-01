import { useEffect, useState } from "react";
import HostelCard from "../../components/HostelCard.tsx";
import FilterBar from "../../components/FilterBar.tsx";
import {
  fetchPublicRooms
} from "../../services/managerService.tsx";

interface HostelCardProps {
  name: string;
  balcony: 0 | 1;
  sunny: 0 | 1;
  level: number;
  roomNo: string;
}

const PublicRoom = () => {
    const [rooms, setRooms] = useState<HostelCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10)
  
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const roomsData = await fetchPublicRooms();
    
          // Map the API data to match HostelCardProps
          const transformedRooms: HostelCardProps[] = roomsData.map(room => ({
            name: `H${room.level}`, // Example transformation
            balcony: room.balcony ? 1 : 0 as 0 | 1, // Explicitly cast to 0 | 1
            sunny: room.sunlight ? 1 : 0 as 0 | 1,  // Explicitly cast to 0 | 1
            level: room.level,
            roomNo: room.roomNumber,
          }));
    
          setRooms(transformedRooms);
        } catch (error) {
          console.error('Error loading rooms:', error);
        }
      };
    
      fetchRooms();
    }, [page, size]);
  
    // const handleSearch = async (searchTerm: string) => {
    //   if (!searchTerm.trim()) {
    //     try {
    //       setLoading(true);
    //       const data = await fetchPublicRooms(); // Fetch all rooms if search term is empty
    //       setRooms();
    //       setLoading(false);
    //     } catch (error) {
    //       console.error("Failed to fetch rooms:", error);
    //     }
    //     return;
    //   }
  
    //   try {
    //     setLoading(true);
    //     const filteredRooms = rooms.filter((room) =>
    //       room.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setRooms(filteredRooms);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Search failed:", error);
    //   }
    // };

    const handleNextPage = () => setPage(prev => prev + 1);
    const handlePrevPage = () => setPage(prev => (prev > 0 ? prev - 1 : 0));
  
    return (
      <div>
        <div
          style={{
            padding: "20px",
            gap: "20px",
            position: "sticky",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <FilterBar title="Find a Public Room" />
          {loading && <p>Loading rooms...</p>}
          {rooms.length === 0 && !loading && <p>No rooms found.</p>}
          {rooms.map((room, index) => (
            <HostelCard
              key={index}
              name={room.name}
              balcony={room.balcony}
              sunny={room.sunny}
              level={room.level}
              roomNo={room.roomNo}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default PublicRoom;