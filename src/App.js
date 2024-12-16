import React, { useState, useEffect } from "react";
import RobotStats from "./components/RobotStats";
import RobotList from "./components/RobotList";
import Map from "./components/Map";
import "./App.css";

const App = () => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Establish WebSocket connection to the backend
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws"); 
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Data received from WebSocket
      setRobots(data);
      console.log("Updated robot data:", data);
      setLoading(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup WebSocket connection when component is unmounted
    return () => {
      socket.close();
    };
  }, []); 

  return (
    <div className="App">
      <h1>Robot Fleet Monitoring Dashboard</h1>
      {loading ? (
        <p>Loading robots...</p>
      ) : robots.length === 0 ? (
        <p>No robot data available</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <RobotList robots={robots} />
          <RobotStats robots={robots} />
        </div>
      )}
      <Map robots={robots} />
    </div>
  );
};

export default App;