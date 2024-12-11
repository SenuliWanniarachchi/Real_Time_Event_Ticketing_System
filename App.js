import React, { useState, useEffect } from "react";
import axios from "axios";  // Import axios for HTTP requests
import ConfigurationForm from "./components/ConfigurationForm/ConfigurationForm";
import TicketDisplay from "./components/TicketDisplay/TicketDisplay";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import CustomerVendorPanel from "./components/CustomerVendorPanel/CustomerVendorPanel";
import LogDisplay from "./components/LogDisplay/LogDisplay"; 
import './App.css';

const App = () => {
  const [config, setConfig] = useState({
    totalTickets: 0,
    releaseRate: 0,
    retrievalRate: 0,
    maxCapacity: 0,
  });

  const [ticketsRemaining, setTicketsRemaining] = useState(config.totalTickets);
  const [logs, setLogs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vendors, setVendors] = useState([]);

  const handleConfigChange = (newConfig) => {
    setConfig(newConfig);
    setTicketsRemaining(newConfig.totalTickets);
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString(); 
    setLogs((prevLogs) => [...prevLogs, `${timestamp}: ${message}`]);
  };

  // Function to add a new customer
  const addCustomer = async (customerName) => {
    try {
      const response = await axios.post("http://localhost:8080/api/customers", { name: customerName });
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      addLog(`Customer added: ${customerName}`);
    } catch (error) {
      addLog(`Error adding customer: ${error.message}`);
    }
  };

  // Function to remove a customer
  const removeCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
      setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
      addLog(`Customer removed`);
    } catch (error) {
      addLog(`Error removing customer: ${error.message}`);
    }
  };

  // Function to add a new vendor
  const addVendor = async (vendorName) => {
    try {
      const response = await axios.post("http://localhost:8080/api/vendors", { name: vendorName });
      setVendors((prevVendors) => [...prevVendors, response.data]);
      addLog(`Vendor added: ${vendorName}`);
    } catch (error) {
      addLog(`Error adding vendor: ${error.message}`);
    }
  };

  // Function to remove a vendor
  const removeVendor = async (vendorId) => {
    try {
      await axios.delete(`http://localhost:8080/api/vendors/${vendorId}`);
      setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== vendorId));
      addLog(`Vendor removed`);
    } catch (error) {
      addLog(`Error removing vendor: ${error.message}`);
    }
  };

  // Function to add tickets to the pool
  const addTickets = async (count) => {
    try {
      await axios.post("http://localhost:8080/api/ticket-pool/add-tickets", { count });
      setTicketsRemaining((prev) => prev + count);
      addLog(`${count} tickets added.`);
    } catch (error) {
      addLog(`Error adding tickets: ${error.message}`);
    }
  };

  // Function to remove a ticket from the pool
  const removeTicket = async () => {
    try {
      await axios.delete("http://localhost:8080/api/ticket-pool/remove-ticket");
      setTicketsRemaining((prev) => prev - 1);
      addLog(`Ticket removed.`);
    } catch (error) {
      addLog(`Error removing ticket: ${error.message}`);
    }
  };

  // Function to get current ticket pool
  const getTicketPool = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ticket-pool");
      setTicketsRemaining(response.data.totalTickets);
      addLog(`Ticket pool fetched.`);
    } catch (error) {
      addLog(`Error fetching ticket pool: ${error.message}`);
    }
  };

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      addLog("WebSocket connection established.");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ticketUpdate") {
        setTicketsRemaining(data.remainingTickets);
        addLog(`Tickets updated to ${data.remainingTickets}`);
      } else if (data.type === "log") {
        addLog(data.message);
      }
    };

    ws.onerror = () => {
      addLog("WebSocket error occurred.");
    };

    ws.onclose = () => {
      addLog("WebSocket connection closed.");
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>Real-Time Ticketing System</h1>
      <ConfigurationForm onConfigChange={handleConfigChange} />
      <TicketDisplay ticketsRemaining={ticketsRemaining} />
      <ControlPanel />
      <LogDisplay logs={logs} />
      <CustomerVendorPanel
        customers={customers}
        vendors={vendors}
        addCustomer={addCustomer}
        removeCustomer={removeCustomer}
        addVendor={addVendor}
        removeVendor={removeVendor}
      />
    </div>
  );
};

export default App;
