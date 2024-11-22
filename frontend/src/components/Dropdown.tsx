import React, { useState } from "react";
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

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onOptionSelect) {
      onOptionSelect(option); // Explicit call for the callback
    }
  };

  return (
    <div className="dropdown-container">
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
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
