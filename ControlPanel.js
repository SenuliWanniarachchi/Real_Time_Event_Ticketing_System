import React, { useState } from "react";
import './ControlPanel.css';

const ControlPanel = () => {
  const [isRunning, setIsRunning] = useState(false);

  const startSystem = () => {
    setIsRunning(true);
  };

  const stopSystem = () => {
    setIsRunning(false);
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <button 
        className="start-button" 
        onClick={startSystem} 
        disabled={isRunning}
      >
        Start System
      </button>
      <button 
        className="stop-button" 
        onClick={stopSystem} 
        disabled={!isRunning}
      >
        Stop System
      </button>
    </div>
  );
};

export default ControlPanel;
