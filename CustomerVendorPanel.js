import React, { useState } from "react";
import './CustomerVendorPanel.css';

const CustomerVendorPanel = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // Handlers for Customer Count
  const incrementCustomer = () => {
    setCustomerCount(customerCount + 1);
    addLog("Customer added.");
  };

  const decrementCustomer = () => {
    if (customerCount > 0) {
      setCustomerCount(customerCount - 1);
      addLog("Customer removed.");
    }
  };

  // Handlers for Vendor Count
  const incrementVendor = () => {
    setVendorCount(vendorCount + 1);
    addLog("Vendor added.");
  };

  const decrementVendor = () => {
    if (vendorCount > 0) {
      setVendorCount(vendorCount - 1);
      addLog("Vendor removed.");
    }
  };

  return (
    <div className="customer-vendor-panel">
      <h2>Customer and Vendor Management</h2>
      <div className="panel-section">
        <h3>Customers</h3>
        <div className="counter">
          <button className="minus-btn" onClick={decrementCustomer}>-</button>
          <span className="count">{customerCount}</span>
          <button className="plus-btn" onClick={incrementCustomer}>+</button>
        </div>
      </div>
      <div className="panel-section">
        <h3>Vendors</h3>
        <div className="counter">
          <button className="minus-btn" onClick={decrementVendor}>-</button>
          <span className="count">{vendorCount}</span>
          <button className="plus-btn" onClick={incrementVendor}>+</button>
        </div>
      </div>
      <div className="log-section">
        <h3>System Logs</h3>
        <ul className="log-list">
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerVendorPanel;
