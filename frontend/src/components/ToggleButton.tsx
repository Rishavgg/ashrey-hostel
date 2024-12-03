import React, { useState } from "react";
import "./Css/ToggleButton.css";

interface ToggleButtonProps {
  onToggle: (selectedView: string) => void; // Callback to parent
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle }) => {
  const [selected, setSelected] = useState<string>("Tile");

  const handleToggle = (view: string) => {
    setSelected(view);
    onToggle(view); // Notify parent
  };

  return (
    <div className="toggle-container">
      <div
        className={`toggle-option ${selected === "Table" ? "selected" : ""}`}
        onClick={() => handleToggle("Table")}
      >
        Table
      </div>
      <div className="separator"></div>
      <div
        className={`toggle-option ${selected === "Tile" ? "selected" : ""}`}
        onClick={() => handleToggle("Tile")}
      >
        Tile
      </div>
    </div>
  );
};

export default ToggleButton;
