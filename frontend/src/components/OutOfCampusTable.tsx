import * as React from "react";
import styles from "./Css/OutOfCampusTable.module.css"; // Create similar to NameTableRow.module.css

interface OutOfCampusTabProps {
  requests: {
    name: string;
    id: string;
    hostel: string;
    year: string;
    placeOfVisit: string;
    reasonForVisit: string;
    leaveDate: string;
    returnDate: string;
    wardencheck: boolean;
    approvedby: string;
  }[];
}

const OutOfCampusTable: React.FC<OutOfCampusTabProps> = ({ requests }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.left}></th>
            <th>Name</th>
            <th>ID</th>
            <th>Hostel</th>
            <th>Year</th>
            <th>Place of Visit</th>
            {/* <th>Reason</th> */}
            {/* <th>Leave</th> */}
            <th>Return</th>
            {/* <th>Days</th> */}
            <th className={styles.right}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, index) => {
            const avatarLetter = r.name.charAt(0).toUpperCase();
            // const start = new Date(r.leaveDate);
            // const end = new Date(r.returnDate);
            // const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

            return (
              <tr key={index} className={styles.row}>
                <td>
                  <div className={styles.avatar}>
                    <div className={styles.letter}>{avatarLetter}</div>
                  </div>
                </td>
                <td>{r.name}</td>
                <td>{r.id}</td>
                <td>{r.hostel}</td>
                <td>{r.year}</td>
                <td>{r.placeOfVisit}</td>
                {/* <td>{r.reasonForVisit}</td> */}
                {/* <td>{r.leaveDate}</td> */}
                <td>{r.returnDate}</td>
                {/* <td>{diffDays} day(s)</td> */}
                <td><div 
                    style={{padding:"1px 2px",
                            backgroundColor:"#e4d9fa",
                            borderRadius:"10px",

                    }}>
                        {r.wardencheck
                            ? r.approvedby
                            ? `${r.approvedby}`
                            : "Pending Approval"
                            : "Not checked"}
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OutOfCampusTable;
