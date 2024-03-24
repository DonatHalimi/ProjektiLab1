import React, { useState, useEffect } from 'react';
import '../styles/TransportStyle.css'; // Import CSS file for styling

function Transport() {
  const [transport, setTransport] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState('');
  const [selectedTransportDetails, setSelectedTransportDetails] = useState(null);

  useEffect(() => {
    const fetchTransportTypes = async () => {
      try {
        const response = await fetch("http://localhost:6001/api/transport/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTransport(data);
      } catch (error) {
        console.error("Error fetching transport types:", error);
      }
    };

    fetchTransportTypes();
  }, []);

  useEffect(() => {
    const selectedTransportDetail = transport.find(option => option.transportId == selectedTransport);
    setSelectedTransportDetails(selectedTransportDetail);
  }, [selectedTransport, transport]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedTransport(selectedId);
  };

  return (
    <div className="transport-container">
      <label htmlFor="transport-select" className="transport-label">Choose a transport:</label>
      <select id="transport-select" value={selectedTransport} onChange={handleChange} className="transport-select">
        <option value="">Select</option>
        {transport.map((option) => (
          <option key={option.transportId} value={option.transportId} className="transport-option">
            {option.companyName}
          </option>
        ))}
      </select>
      {/* Conditional rendering to display details */}
      {selectedTransportDetails && (
        <div className="transport-details">
          <p>Company: {selectedTransportDetails.companyName}</p>
          <p>Type: {selectedTransportDetails.transportType}</p>
          <p>Fee: ${selectedTransportDetails.transportFee}</p>
          <p>Phone: +383{selectedTransportDetails.phone}</p>
          <p>Email: {selectedTransportDetails.email}</p>

        </div>
      )}
    </div>
  );
}

export default Transport;
