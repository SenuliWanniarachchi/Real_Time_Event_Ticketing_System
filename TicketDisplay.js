import React from "react";
import './TicketDisplay.css';

const TicketDisplay = ({ ticketsRemaining }) => {
  return (
    <div className="ticket-display">
      <h2>Ticket Availability</h2>
      <p>Tickets Remaining: {ticketsRemaining}</p>
    </div>
  );
};

export default TicketDisplay;
