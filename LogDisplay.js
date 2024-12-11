import React, { useState, useEffect } from "react";
import './LogDisplay.css';

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addLog(`Log message at ${new Date().toLocaleTimeString()}`);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="log-display">
      <h2>System Logs</h2>
      <div className="log-container"> {/* Added log-container for styling */}
        <ul className="log-list"> {/* Added log-list class for better control */}
          {logs.map((log, index) => (
            <li key={index} className="log-item">{log}</li> 
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogDisplay;
