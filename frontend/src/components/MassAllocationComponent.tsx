import { useState } from "react";
import Sunny from '../Assets/icon/sunny.svg';
import Shade from '../Assets/icon/shade.svg';
import Balcony from '../Assets/icon/Balcony.svg';
import Window from '../Assets/icon/window.svg';
import styles from './Css/MassAllocationComponent.module.css';

const getHostelName = (room: string) => {
  const hostelCode = room.split(" ")[0];
  switch (hostelCode) {
    case "H15":
      return "Parmar";
    case "H12":
      return "Azad";
    case "H14":
      return "Getta";
    default:
      return "Shastri";
  }
};

interface StudentInfo {
  name: string;
  roll: string;
  hostel: string;
}

interface StudentPair {
  id: string;
  student1: StudentInfo;
  student2: StudentInfo;
  status: "green" | "purple";
}

interface HostelCardProps {
  room: string;
  level: number;
  floor: number;
  balcony: boolean;
  sunny: boolean;
  studentPairs: StudentPair[];
}

const colorMap = {
  green: "bg-green-400",
  purple: "bg-purple-300",
};

const MassAllocationComponent: React.FC<HostelCardProps> = ({
  room,
  level,
  floor,
  balcony,
  sunny,
  studentPairs,
}) => {
  const hostelName = getHostelName(room);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>{hostelName} | {room}</div>
        <div className={styles.badge}>{level} | {floor}</div>
        <div className={`${styles.badge} ${styles.iconGroup}`}>
          <img src={balcony ? Balcony : Window} alt="balcony" className={styles.icon} />
          |
          <img src={sunny ? Sunny : Shade} alt="sunny" className={styles.icon} />
        </div>
      </div>

      {/* Student Pairs */}
      <div className="space-y-3">
        {studentPairs.map((pair) => (
          <div
            key={pair.id}
            className={`${styles.pairCard} ${
              selectedId === pair.id ? styles.selected : ''
            }`}
          >
            <input
              type="radio"
              name="student-pair"
              checked={selectedId === pair.id}
              onChange={() => setSelectedId(pair.id)}
              className={styles.radio}
            />
            <div className={styles.leftInfo}>
              {/* <div className={`${styles.statusDot} ${styles[pair.status]}`} /> */}
              <div>
                <div className={styles.name}>{pair.student1.name}</div>
                <div className={styles.subInfo}>
                  {pair.student1.hostel} {pair.student1.roll}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.name}>{pair.student2.name}</div>
              <div className={styles.subInfo}>
                {pair.student2.hostel} {pair.student2.roll}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MassAllocationComponent;
