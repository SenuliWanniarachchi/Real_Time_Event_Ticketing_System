import React, { useState } from "react";
import './ConfigurationForm.css';

const ConfigurationForm = ({ onConfigChange }) => {
  const [formData, setFormData] = useState({
    totalTickets: 0,
    releaseRate: 0,
    retrievalRate: 0,
    maxCapacity: 0,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      formData.totalTickets <= 0 ||
      formData.releaseRate <= 0 ||
      formData.retrievalRate <= 0 ||
      formData.maxCapacity <= 0 ||
      isNaN(formData.totalTickets) ||
      isNaN(formData.releaseRate) ||
      isNaN(formData.retrievalRate) ||
      isNaN(formData.maxCapacity)
    ) {
      setError("All values must be positive numbers greater than zero.");
      return;
    }

    setError(""); // Clear any previous error
    onConfigChange(formData); // Pass config back to parent component
    setSuccessMessage("Configuration saved successfully!"); // Show success message
    setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
  };

  return (
    <form onSubmit={handleSubmit} className="configuration-form">
      {error && <p className="error-message">{error}</p>} {/* Display error */}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
      
      <label>
        Total Tickets:
        <input
          type="number"
          name="totalTickets"
          value={formData.totalTickets}
          onChange={handleChange}
          min="0" // Prevent negative values
        />
      </label>
      <br />
      <label>
        Ticket Release Rate (ms):
        <input
          type="number"
          name="releaseRate"
          value={formData.releaseRate}
          onChange={handleChange}
          min="0" // Prevent negative values
        />
      </label>
      <br />
      <label>
        Customer Retrieval Rate (ms):
        <input
          type="number"
          name="retrievalRate"
          value={formData.retrievalRate}
          onChange={handleChange}
          min="0" // Prevent negative values
        />
      </label>
      <br />
      <label>
        Max Ticket Capacity:
        <input
          type="number"
          name="maxCapacity"
          value={formData.maxCapacity}
          onChange={handleChange}
          min="0" // Prevent negative values
        />
      </label>
      <br />
      <button type="submit">Save Configuration</button>
    </form>
  );
};

export default ConfigurationForm;
