// import React, { useState, useEffect, useRef } from "react";
// import HostelCard from "./HostelCard"; // Your card component for each dropdown option
// import "./Css/SelectHostel.css";

// interface Room {
//   name: string;
//   balcony: number;
//   sunny: number;
//   level: number;
//   roomNo: string;
//   capacity: number;
//   occupancy: number;
// }

// interface SelectHostelDropdownProps {
//   options: Room[];
//   defaultSelected?: Room;
//   onOptionSelect?: (selected: Room) => void;
// }

// const SelectHostelDropdown: React.FC<SelectHostelDropdownProps> = ({
//   options,
//   defaultSelected,
//   onOptionSelect,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<Room | undefined>(defaultSelected);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Filter options based on the search term
//   const filteredOptions = options.filter((option) =>
//     option.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleOptionClick = (option: Room) => {
//     setSelected(option);
//     setIsOpen(false);
//     setSearchTerm("");
//     if (onOptionSelect) {
//       onOptionSelect(option);
//     }
//   };

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="hostel-dropdown-container" ref={dropdownRef}>
//       {/* Dropdown Header */}
//       <div
//         className={`hostel-dropdown-header ${isOpen ? "hostel-active" : ""}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {/* Display only the room name when selected, or prompt if none */}
//         {selected ? (
//           <span className="hostel-dropdown-selected">{selected.roomNo}</span>
//         ) : (
//           <span className="hostel-dropdown-selected">Select a room</span>
//         )}
//       </div>

//       {/* Dropdown Options */}
//       {isOpen && (
//         <ul className="hostel-dropdown-options">
//           {/* Search Bar */}
//           <li className="hostel-dropdown-search">
//             <input
//               type="text"
//               className="hostel-dropdown-search-input"
//               placeholder="Search rooms..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </li>

//           {/* Filtered Options */}
//           {filteredOptions.map((option, index) => (
//             <li
//               key={index}
//               className={`hostel-dropdown-option ${
//                 selected && selected.name === option.name ? "selected-option" : ""
//               }`}
//               onClick={() => handleOptionClick(option)}
//             >
//               <HostelCard
//                 hotelName={option.name}
//                 balcony={option.balcony as 0 | 1}
//                 sunny={option.sunny as 0 | 1}
//                 level={option.level}
//                 roomNo={option.roomNo}
//                 capacity={option.capacity}
//                 occupancy={option.occupancy}
//               />
//             </li>
//           ))}

//           {/* No Results */}
//           {filteredOptions.length === 0 && (
//             <li className="hostel-dropdown-no-results">No results found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SelectHostelDropdown;

import React, { useState, useEffect, useRef } from "react";
import HostelCard from "./HostelCard";
import "./Css/SelectHostel.css";

interface Room {
  name: string;
  roomId: number;
  roomNo: string;
  capacity: number;
  occupancy: number;
  balcony: number;
  sunny: number;
  level: number;
  floor: number;
}

interface SelectHostelDropdownProps {
  options: Room[];
  defaultSelected?: Room;
  disabled?: boolean;
  onOptionSelect?: (selected: Room) => void;
}

const SelectHostelDropdown: React.FC<SelectHostelDropdownProps> = ({
  options,
  defaultSelected,
  disabled = false,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Room | undefined>(defaultSelected);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected when defaultSelected changes
  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.roomNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: Room) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm("");
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div 
      className={`hostel-dropdown-container ${disabled ? 'disabled' : ''}`} 
      ref={dropdownRef}
    >
      {/* Dropdown Header */}
      <div
        className={`hostel-dropdown-header ${isOpen ? "hostel-active" : ""} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {/* Display only the room name when selected, or prompt if none */}
        {selected ? (
          <span className="hostel-dropdown-selected">Room {selected.roomNo}</span>
        ) : (
          <span className="hostel-dropdown-selected">
            {disabled ? "Select room type first" : "Select a room"}
          </span>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <ul className="hostel-dropdown-options">
          {/* Search Bar */}
          <li className="hostel-dropdown-search">
            <input
              type="text"
              className="hostel-dropdown-search-input"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>

          {/* Room Status Summary */}
          <li className="hostel-dropdown-summary">
            <span>
              Available: {options.filter(r => r.occupancy < r.capacity).length} / {options.length} rooms
            </span>
          </li>

          {/* Filtered Options */}
          {filteredOptions.map((option, index) => {
            const isFull = option.occupancy >= option.capacity;
            return (
              <li
                key={index}
                className={`hostel-dropdown-option ${
                  selected && selected.roomId === option.roomId ? "selected-option" : ""
                } ${isFull ? "disabled-option" : ""}`}
                onClick={() => !isFull && handleOptionClick(option)}
              >
                <HostelCard
                  hotelName={option.name}
                  balcony={option.balcony as 0 | 1}
                  sunny={option.sunny as 0 | 1}
                  level={option.level}
                  roomNo={option.roomNo}
                  capacity={option.capacity}
                  occupancy={option.occupancy}
                />
              </li>
            );
          })}

          {/* No Results */}
          {filteredOptions.length === 0 && (
            <li className="hostel-dropdown-no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectHostelDropdown;