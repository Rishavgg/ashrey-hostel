import React from 'react';
import styles from './Css/HostelTable.module.css';

// Icons for balcony and sunny props
import balconyIcon from '../Assets/icon/Balcony.svg';
import windowIcon from '../Assets/icon/window.svg';
import sunnyIcon from '../Assets/icon/sunny.svg';
import shadyIcon from '../Assets/icon/shade.svg';

interface RoomTableProps {
  rooms: {
    hotelName: string;
    balcony: 0 | 1;
    sunny: 0 | 1;
    level: number;
    roomNo: string;
    occupancy: number;
    capacity: number;
  }[];
}

const HostelTable: React.FC<RoomTableProps> = ({ rooms }) => {
  const getHostelName = (name: string) => {
    if (name.startsWith('H15')) return 'Parmar Bhavan';
    if (name.startsWith('H14')) return 'Azad Bhavan';
    if (name.startsWith('H13')) return 'Geeta Bhavan';
    return 'Shastri Bhavan';
  };

  const getRoomType = (capacity: number) => {
    switch (capacity) {
      case 1:
        return 'Single';
      case 2:
        return 'Double';
      case 3:
        return 'Triple';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.noHeadingL}></th>
            <th>Hostel</th>
            <th>Room</th>
            <th>Sunny</th>
            <th>Balcony</th>
            <th className={styles.noHeadingR}>Room Type</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => {
            const hostelName = getHostelName(room.hotelName);
            const roomType = getRoomType(room.capacity);
            return (
              <tr key={index} className={styles.row}>
                <td>
                  <div className={styles.roomNo}>{room.roomNo}</div>
                </td>
                <td>{hostelName}</td>
                <td>{`${room.hotelName} ${room.roomNo}`}</td>
                <td>
                  {room.sunny === 1 ? (
                    <img src={sunnyIcon} alt="Sunny Yes" />
                  ) : (
                    <img src={shadyIcon} alt="Sunny No" />
                  )}
                </td>
                <td>
                  {room.balcony === 1 ? (
                    <img src={balconyIcon} alt="Balcony Yes" />
                  ) : (
                    <img src={windowIcon} alt="Balcony No" />
                  )}
                </td>
                <td>{roomType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HostelTable;
