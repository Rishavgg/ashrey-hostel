// FilterBar.tsx
import React from "react";
import SearchBar from "./SearchBar.tsx";
import ToggleButton from "./ToggleButton.tsx";
import Dropdown from "./DropdownSearch.tsx";
import PageTitle from "./PageTitle.tsx";

interface FilterBarProps {
  title: string;
  onSearch: (query: string) => void; // Add the callback for search
}

const FilterBar: React.FC<FilterBarProps> = ({ title, onSearch }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
        position: "sticky",
        top: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        zIndex: 10,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <PageTitle text={title} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ToggleButton />
        <Dropdown
          label="Year"
          options={["Any", "1st", "2nd", "3rd", "4th"]}
          defaultSelected="Any"
          onOptionSelect={(selected) =>
            console.log("Selected Year Option:", selected)
          }
        />
        <Dropdown
          label="Hostel"
          options={["Any", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"]}
          defaultSelected="Any"
          onOptionSelect={(selected) =>
            console.log("Selected Hostel Option:", selected)
          }
        />
        <SearchBar
          onSearch={onSearch} // Pass the search term to the parent component
          placeholder="Search for students by name"
        />
      </div>
    </div>
  );
};

export default FilterBar;
