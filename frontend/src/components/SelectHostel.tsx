import React, { useState, useEffect, useRef } from "react";
import HostelCard from "./HostelCard"; // Your card component for each dropdown option
import "./Css/SelectHostel.css";

interface Room {
  name: string;
  balcony: number;
  sunny: number;
  level: number;
  roomNo: string;
}

interface SelectHostelDropdownProps {
  options: Room[];
  defaultSelected?: Room;
  onOptionSelect?: (selected: Room) => void;
}

const SelectHostelDropdown: React.FC<SelectHostelDropdownProps> = ({
  options,
  defaultSelected,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Room | undefined>(defaultSelected);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="custom-dropdown-container" ref={dropdownRef}>
      {/* Dropdown Header */}
      <div
        className={`custom-dropdown-header ${isOpen ? "custom-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Display the selected room as a HostelCard */}
        {selected ? (
          <HostelCard
          name={selected.name}
          balcony={selected.balcony as 0 | 1} // Type assertion to 0 | 1
          sunny={selected.sunny as 0 | 1} // Type assertion to 0 | 1
          level={selected.level}
          roomNo={selected.roomNo}
        />
        ) : (
          <span className="custom-dropdown-selected">Select a room</span>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="custom-dropdown-options">
          {/* Search Bar */}
          <li className="custom-dropdown-search">
            <input
              type="text"
              className="custom-dropdown-search-input"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>

          {/* Filtered Options */}
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="custom-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              <HostelCard
                name={option.name}
                balcony={option.balcony as 0 | 1}
                sunny={option.sunny as 0 | 1}
                level={option.level}
                roomNo={option.roomNo}
              />
            </li>
          ))}

          {/* No Results */}
          {filteredOptions.length === 0 && (
            <li className="custom-dropdown-no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectHostelDropdown;
