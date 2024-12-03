import React, { useState } from "react";
import Navbar from "../../components/NavbarChief.tsx";
// import { fetchWardenData } from "../../services/managerService.tsx";
import FindWardenPage from "../../Pages/ChiefWardenDashboard/FindWarden.tsx";
import MassAllocationPage from "../../Pages/ChiefWardenDashboard/MassAllocation.tsx";
import ManualAllocationPage from "../../Pages/ChiefWardenDashboard/ManualAllocation";
import AddEditRoomsPage from "./HostelFees.tsx";
import AddUser from "../../components/AddUser.tsx";
import * as Yup from "yup";

type Field = {
  label: string;
  name: string;
  type: string; // Use 'custom' for custom components like Dropdown
  validation: Yup.AnySchema;
  component?: JSX.Element; // Optional component for custom fields
};

const ChiefWarden: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("Find a Student"); // Default page
  const [isAddWardenPopupVisible, setIsAddWardenPopupVisible] = useState(false); // State to toggle AddUser popup
  const [wardens] = useState<any[]>([]); // Store wardens data
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  // Dropdown options for hostel selection
  // const hostelOptions = ["H1", "H2", "H3"];

  // Handle page navigation
  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  // Handle AddUser popup visibility
  const toggleAddWardenPopup = () => {
    setIsAddWardenPopupVisible(!isAddWardenPopupVisible);
  };

  // Handle Search Functionality
  // const handleSearch = async (searchTerm: string) => {
  //   if (!searchTerm) {
  //     const data = await fetchWardenData(0, 10); // Fetch all wardens if no search term
  //     setWardens(data);
  //   } else {
  //     const data = await fetchWardenData(0, 10); // Placeholder: Use backend search if available
  //     setWardens(data);
  //   }
  // };

  // Handle Popup Submission for Adding Warden
  const handleAddWardenSubmit = async (data: Record<string, string>) => {
    setIsPopupLoading(true); // Show loading state
    try {
      console.log("Form data submitted:", data);
      alert(
        `Warden added successfully!\nName: ${data.name}\nEmail: ${data.email}\nHostel: ${data.hostel}`
      );
      setIsAddWardenPopupVisible(false); // Close the popup on successful submission
    } catch (error) {
      console.error("Error adding warden:", error);
    } finally {
      setIsPopupLoading(false); // Reset loading state
    }
  };

  // Fields for AddUser form
  const addWardenFields: Field[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      validation: Yup.string().required("Name is required"),
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: Yup.string().email("Invalid email").required("Email is required"),
    },
    {
      name: "contact",
      label: "Phone No.",
      type: "text",
      validation: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be a 10-digit number")
        .required("Phone number is required"),
    },
    {
      label: 'Roll No.',
      name: 'rollNumber',
      type: 'text',
      validation: Yup.string().required('Roll number is required'),
    },
    {
      label: 'Adm Year',
      name: 'contact',
      type: 'text',
      validation: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
        .required('Phone number is required'),
    },
    // {
    //   label: "Hostel",
    //   name: "hostel",
    //   type: "custom", // Custom type for dropdown
    //   validation: Yup.string().required("Hostel is required"), // Validation for the dropdown
    //   component: (
    //     <select
    //       style={{
    //         padding: "8px",
    //         fontSize: "14px",
    //         borderRadius: "4px",
    //         border: "1px solid #ccc",
    //         width: "100%",
    //       }}
    //       defaultValue=""
    //       {...{
    //         name: "hostel", // Sync with react-hook-form
    //         onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
    //           const { value } = e.target;
    //           if (value) setWardens((prev) => [...prev, value]);
    //         },
    //       }}
    //     >
    //       <option value="" disabled>
    //         Select Hostel
    //       </option>
    //       {hostelOptions.map((hostel) => (
    //         <option key={hostel} value={hostel}>
    //           {hostel}
    //         </option>
    //       ))}
    //     </select>
    //   ),
    // },
  ];

  // Render dynamic content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "Find a Student":
        return <FindWardenPage wardens={wardens} />;
      case "Mass Allocation":
        return <MassAllocationPage />;
      case "Manual Allocation":
        return <ManualAllocationPage />;
      case "Add/Edit Rooms":
        return <AddEditRoomsPage />;
      default:
        return <FindWardenPage wardens={wardens} />;
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Navbar */}
        <Navbar onPageChange={handlePageChange} />

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            maxWidth: "79vw",
            minWidth: "0",
          }}
        >
          {/* Filter Bar */}
          {/* <FilterBar title={activePage} onSearch={handleSearch} /> */}

          {/* Dynamic Content */}
          <div
            style={{
              padding: "20px",
              gap: "20px",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            
                  {/* Add Warden Popup */}
      {isAddWardenPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <AddUser
            title="Add Student"
            fields={addWardenFields}
            onSubmit={handleAddWardenSubmit}
            onCancel={toggleAddWardenPopup}
            isLoading={isPopupLoading}
          />
        </div>
      )}

      {/* Fab Button for Add Warden */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000,
        }}
      >
        <button
          onClick={toggleAddWardenPopup}
          style={{
            backgroundColor: "#6200EE",
            borderRadius: "50%",
            width: "56px",
            height: "56px",
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiefWarden;
