import React, { useState } from "react";
import "./Css/ToggleButton.css";

const ToggleButton: React.FC = () => {
  const [selected, setSelected] = useState<string>("Table");

  return (
    <div className="toggle-container">
      <div
        className={`toggle-option ${selected === "Table" ? "selected" : ""}`}
        onClick={() => setSelected("Table")}
      >
        Table
      </div>
      <div className="separator"></div>
      <div
        className={`toggle-option ${selected === "Tile" ? "selected" : ""}`}
        onClick={() => setSelected("Tile")}
      >
        Tile
      </div>
    </div>
  );
};

export default ToggleButton;
