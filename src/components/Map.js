import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [robots, setRobots] = useState([]);

  // Fetch robots data periodically
  useEffect(() => {
    const fetchRobots = () => {
      fetch("http://localhost:8000/robots") // Replace with your backend API URL
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch data.");
          return response.json();
        })
        .then((data) => {
          console.log("Fetched robot data:", data); // Debugging API data
          setRobots(data);
        })
        .catch((error) => console.error("Error fetching robot data:", error));
    };

    fetchRobots(); // Fetch data initially
    const intervalId = setInterval(fetchRobots, 5000); // Update every 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Custom icon for the robots (default color red)
  const createCustomIcon = (color) =>
    new L.DivIcon({
      html: `<div style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px;"></div>`,
      className: "",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

  const redDotIcon = createCustomIcon("red"); // Default to red

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>Location of Robots</h2>

      <MapContainer
        style={{
          height: "calc(168vh - 50px)", // Increase height for better vertical visibility
          width: "85%",
          margin: "0 auto",
        }}
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={true}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {robots.map((robot) => {
          const latitude = robot?.["Location Coordinates"]?.[0] || 0;
          const longitude = robot?.["Location Coordinates"]?.[1] || 0;
          const robotName = robot?.["Robot ID"] || "Unknown Robot";

          // Set icon to red by default (no battery logic)
          const icon = redDotIcon;

          // Tooltip positioning logic
          let tooltipDirection = "top";
          let tooltipOffset = [0, -25];

          // Adjust tooltip direction based on the robot's position
          if (latitude < -30) {
            tooltipDirection = "bottom"; // Robot is placed on the top of the map, tooltip appears below
            tooltipOffset = [0, 25];
          } else if (latitude > 30) {
            tooltipDirection = "top"; // Robot is placed on the bottom of the map, tooltip appears above
            tooltipOffset = [0, -25];
          }

          if (longitude > 30) {
            tooltipDirection = "left"; // Robot is placed on the right of the map, tooltip appears on the left
            tooltipOffset = [-10, 0];
          } else if (longitude < -30) {
            tooltipDirection = "right"; // Robot is placed on the left of the map, tooltip appears on the right
            tooltipOffset = [10, 0];
          }

          return (
            <Marker key={robotName} position={[latitude, longitude]} icon={icon}>
              <Tooltip
                direction={tooltipDirection}
                offset={tooltipOffset}
                className="custom-tooltip"
              >
                <div>
                  <div><strong>Robot ID:</strong> {robotName}</div>
                  <div><strong>Location:</strong> [{latitude}, {longitude}]</div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
