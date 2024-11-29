// import React, { useState, useEffect } from "react";
// import { fetchWardenData } from "../../services/managerService"; // Import the fetch function

// interface Warden {
//   id: number;
//   name: string;
//   hostel: string;
//   contact: string;
// }

// const FindWardenPage: React.FC = () => {
//   const [wardens, setWardens] = useState<Warden[]>([]); // State to store warden data
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const [page, setPage] = useState<number>(0); // Current page for pagination
//   const pageSize = 10; // Number of wardens per page

//   // Fetch data on component mount or when `page` changes
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchWardenData(page, pageSize); // Fetch data using managerService
//         setWardens(data);
//       } catch (err) {
//         console.error("Error fetching wardens:", err);
//         setError("Failed to load wardens. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page]);

//   // Handle pagination (next page)
//   const handleNextPage = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   // Handle pagination (previous page)
//   const handlePreviousPage = () => {
//     if (page > 0) {
//       setPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div>
//       <h2>Warden List</h2>

//       {/* Show loading state */}
//       {loading && <p>Loading wardens...</p>}

//       {/* Show error message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Render list of wardens */}
//       <ul>
//         {wardens.length > 0 ? (
//           wardens.map((warden) => (
//             <li key={warden.id}>
//               {warden.name} - {warden.hostel} - {warden.contact}
//             </li>
//           ))
//         ) : (
//           !loading && <li>No wardens found.</li> // Show message only when not loading
//         )}
//       </ul>

//       {/* Pagination controls */}
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={handlePreviousPage}
//           disabled={page === 0 || loading}
//           style={{ marginRight: "10px" }}
//         >
//           Previous
//         </button>
//         <button onClick={handleNextPage} disabled={loading}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FindWardenPage;

// FindWardenPage.tsx
import React from "react";

interface Warden {
  id: number;
  name: string;
  hostel: string;
  contact: string;
}

interface FindWardenProps {
  wardens: Warden[]; // Explicitly define the props
}

const FindWardenPage: React.FC<FindWardenProps> = ({ wardens }) => {
  return (
    <div>
      <h2></h2>
      <ul>
        {wardens.length > 0 ? (
          wardens.map((warden) => (
            <li key={warden.id}>
              {warden.name} - {warden.hostel} - {warden.contact}
            </li>
          ))
        ) : (
          <li></li>
        )}
      </ul>
    </div>

    
  );
};

export default FindWardenPage;
