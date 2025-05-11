// import React, { useState, useEffect, useRef } from "react";
// import "./Css/DropdownNames.css";

// interface DropdownNamesProps {
//   label?: string; // Text displayed at the top of the dropdownNames
//   options: string[]; // DropdownNames options
//   defaultSelected?: string; // Default selected option
//   onOptionSelect?: (selected: string) => void; // Callback when an option is selected
// }

// const DropdownNames: React.FC<DropdownNamesProps> = ({
//   options,
//   defaultSelected,
//   onOptionSelect,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<string | undefined>(defaultSelected);
//   const [searchTerm, setSearchTerm] = useState(""); // State for search term
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Filter options based on the search term
//   const filteredOptions = options.filter((option) =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleOptionClick = (option: string) => {
//     setSelected(option);
//     setIsOpen(false);
//     setSearchTerm(""); // Clear search when an option is selected
//     if (onOptionSelect) {
//       onOptionSelect(option); // Explicit call for the callback
//     }
//   };

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="custom-dropdown-container" ref={dropdownRef}>
//       {/* Dropdown Header */}
//       <div
//         className={`custom-dropdown-header ${isOpen ? "custom-active" : ""}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="custom-dropdown-selected">{selected || "Select an option"}</span>
//       </div>

//       {/* Dropdown Options */}
//       {isOpen && (
//         <ul className="custom-dropdown-options">
//           {/* Search Bar */}
//           <li className="custom-dropdown-search">
//             <input
//               type="text"
//               className="custom-dropdown-search-input"
//               placeholder="Search options..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </li>
//           {/* Filtered Options */}
//           {filteredOptions.map((option, index) => (
//             <li
//               key={index}
//               className="custom-dropdown-option"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </li>
//           ))}
//           {/* No Results */}
//           {filteredOptions.length === 0 && (
//             <li className="custom-dropdown-no-results">No results found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropdownNames;

import React, { useState, useEffect, useRef } from "react";
import "./Css/DropdownNames.css"; // Import your CSS file

interface DropdownProps {
  options: string[];
  label: string;
  defaultSelected?: string;
  disabled?: boolean;
  onOptionSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  defaultSelected = "",
  disabled = false,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected when defaultSelected changes
  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm("");
    onOptionSelect(option);
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
      className={`dropdown-container ${disabled ? 'disabled' : ''}`} 
      ref={dropdownRef}
    >
      <div
        className={`dropdown-header ${isOpen ? "active" : ""} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selected || (disabled ? `Select ${label.toLowerCase()} first` : `Select ${label.toLowerCase()}...`)}
      </div>
      {isOpen && !disabled && (
        <div className="dropdown-options">
          <div className="dropdown-search">
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={option === selected ? "selected" : ""}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
