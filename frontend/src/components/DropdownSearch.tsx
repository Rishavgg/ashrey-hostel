import React, { useState, useEffect, useRef } from "react";
import "./Css/Dropdown.css";

interface DropdownProps {
  label: string; // Text displayed at the top of the dropdown
  options: string[]; // Dropdown options
  defaultSelected?: string; // Default selected option
  onOptionSelect?: (selected: string) => void; // Callback when an option is selected
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  defaultSelected,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(defaultSelected);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    setSearchTerm(""); // Clear search when an option is selected
    if (onOptionSelect) {
      onOptionSelect(option); // Explicit call for the callback
    }
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {/* Dropdown Header */}
      <div
        className={`dropdown-header ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-label">{label}</span>
        <span className="dropdown-selected">{selected || "Select an option"}</span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options">
          {/* Search Bar */}
          <li className="dropdown-search">
            <input
              type="text"
              className="dropdown-search-input"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          {/* Filtered Options */}
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
          {/* No Results */}
          {filteredOptions.length === 0 && (
            <li className="dropdown-no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
