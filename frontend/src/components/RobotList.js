import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

  // Function to get the range based on filter type (battery, cpu, or ram)
  const getRangeForNumber = (num) => {
    const rangeStart = Math.floor(num / 10) * 10 + 1; 
    const rangeEnd = rangeStart + 9; 
    return { start: rangeStart, end: rangeEnd };
  };
  const RobotList = ({ robots }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOption, setFilterOption] = useState("robotId");
    const [selectedRobot, setSelectedRobot] = useState(null);
    useEffect(() => {
      setSearchTerm("");
    }, [filterOption]);
    useEffect(() => {
      if (selectedRobot) {
        const updatedRobot = robots.find(
          (robot) => robot["Robot ID"] === selectedRobot["Robot ID"]
        );
        setSelectedRobot(updatedRobot);
      }
    }, [robots, selectedRobot]);   
    const handleFilterChange = (event) => {
      setFilterOption(event.target.value);
    };
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    const handleRobotClick = (robot) => {
      setSelectedRobot(robot);
    };
    const handleCloseModal = () => {
      setSelectedRobot(null);
    };
    const filteredRobots = robots.filter((robot) => {
      const lowerSearchTerm = searchTerm.trim().toLowerCase();
      const numSearchTerm = parseInt(lowerSearchTerm, 10);
      const isNumber = !isNaN(numSearchTerm);
      const range = isNumber ? getRangeForNumber(numSearchTerm, filterOption) : null;

      switch (filterOption) {
        case "robotId":
          return robot["Robot ID"].toLowerCase().includes(lowerSearchTerm);
        case "online":
          return (
            (lowerSearchTerm === "online" && robot["Online/Offline"]) ||
            (lowerSearchTerm === "offline" && !robot["Online/Offline"])
          );
        case "battery":
          if (range) {
            return (
              robot["Battery Percentage"] >= range.start &&
              robot["Battery Percentage"] <= range.end
            );
          }
          return robot["Battery Percentage"].toString().includes(lowerSearchTerm);
        case "cpu":
          if (range) {
            return (
              robot["CPU Usage"] >= range.start && robot["CPU Usage"] <= range.end
            );
          }
          return robot["CPU Usage"].toString().includes(lowerSearchTerm);
      }
    });
    const style = {
      container: {
        width: "100%",
        marginRight: "20px",
        marginTop: "20px",
      },
      header: {
        color: "#fff",
        textAlign: "center",
      },
      searchContainer: {
        marginBottom: "15px",
        marginLeft: "-250px",
      },
      input: {
        padding: "8px",
        width: "400px",
        borderRadius: "30px",
        border: "1px solid #444",
        color: "#fff",
        backgroundColor: "#333",
      },
      filterContainer: {
        marginBottom: "15px",
        marginLeft: "450px",
        marginTop:"-50px"
      },
      select: {
        padding: "8px",
        width: "225px",
        borderRadius: "50px",
        border: "1px solid #444",
        color: "#fff",
        backgroundColor: "#333",
      },
      tableContainer: {
        height: "690px",
        overflowY: "auto",
        borderRadius: "8px",
        border: "1px solid #444",
      },
      table: {
        width: "100%",
        color: "#fff",
        backgroundColor: "#333",
        borderRadius: "8px",
      },
      th: {
        padding: "8px",
        textAlign: "left",
      },
      td: {
        padding: "8px",
        textAlign: "left",
      },
      noData: {
        textAlign: "center",
        padding: "8px",
      },
      imageModal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "10px",
        backgroundColor: "#000",
        borderRadius: "8px",
        zIndex: 1000,
        color: "#fff",
        width: "900px",
        display: "flex",
        flexDirection: "column",  
        height: "auto", 
        justifyContent: "space-between",  
      },
      imageClose: {
        background: "white",
        padding: "10px",
        borderRadius: "4px",
        cursor: "pointer",
        alignSelf: "center",
        marginTop: "20px", 
      },
      notificationContainer: {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      },
      notification: {
        backgroundColor: "#ff6b6b",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        animation: "slideIn 0.5s ease-in-out",
      }
    }
    return (
      <div style={style.container}>
        <h2 style={style.header}>Robot List</h2>
        <div style={style.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Robots..."
            style={style.input}
          />
        </div>
        <div style={style.filterContainer}>
          <select
            value={filterOption}
            onChange={handleFilterChange}
            style={style.select}
          >
            <option value="robotId">Robot ID</option>
            <option value="online">Online/Offline</option>
            <option value="battery">Battery Percentage</option>
            <option value="cpu">CPU Usage</option>
          </select>
        </div>
        <div style={style.tableContainer}>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>Sl.No</th>
                <th style={style.th}>Robot Name</th>
                <th style={style.th}>Robot ID</th>
                <th style={style.th}>Battery</th>
                <th style={style.th}>CPU</th>
                <th style={style.th}>RAM</th>
                <th style={style.th}>Online/Offline</th>
                <th style={style.th}>Last Updated</th>
                <th style={style.th}>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredRobots.length > 0 ? (
                filteredRobots.map((robot, index) => (
                  <tr key={robot["Robot ID"]} style={{ borderBottom: "1px solid #444" }}>
                    <td style={style.td}>{index + 1}</td>
                    <td
                      style={style.td}
                      onClick={() => handleRobotClick(robot)}
                    >
                      {`CybMech Bot - ${index + 1}`}
                    </td>
                    <td
                      style={{ ...style.td, textDecoration: "underline dotted" }}
                      onClick={() => handleRobotClick(robot)}
                    >
                      {robot["Robot ID"]}
                    </td>
                    <td style={style.td}>{robot["Battery Percentage"]}%</td>
                    <td style={style.td}>{robot["CPU Usage"]}</td>
                    <td style={style.td}>{robot["RAM Consumption"]}</td>
                    <td style={style.td}>
                      {robot["Online/Offline"] ? "Online" : "Offline"}
                    </td>
                    <td style={style.td}>{robot["Last Updated"]}</td>
                    <td style={style.td}>
                      {robot["Location Coordinates"]
                        ? `${robot["Location Coordinates"][0]}, ${robot["Location Coordinates"][1]}`
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={style.noData}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {selectedRobot && (
          <div style={style.imageModal}>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Robot Details</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* Robot Image */}
              <img
                src="/cute_robo.jpg"
                alt="Robot"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: "20px",
                  marginLeft:"50px"
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "10px 20px", 
                  textAlign: "left",
                  lineHeight: "1.4", 
                  width: "100%",
                  marginLeft:"10px",
                }}>
                {/* Robot ID */}
                <p><strong>Robot ID:</strong> {selectedRobot["Robot ID"]}</p>
                <p></p>
                {/* Battery and Status */}
                <div>
                  <p><strong>Battery:</strong> {selectedRobot["Battery Percentage"]}%</p>
                  <div 
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "50px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${selectedRobot["Battery Percentage"]}%`,
                        backgroundColor:
                          selectedRobot["Battery Percentage"] < 20
                            ? "red"
                            : selectedRobot["Battery Percentage"] <= 50
                            ? "orange"
                            : "green",
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p>
                    <strong>Status:</strong>
                  </p>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: selectedRobot["Online/Offline"] ? "green" : "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50px",
                      cursor: "default", 
                    }}
                  >
                    {selectedRobot["Online/Offline"] ? "Online" : "Offline"}
                  </button>
                </div>
                {/* CPU and Last Updated */}
                <div>
                  <p><strong>CPU Usage:</strong> {selectedRobot["CPU Usage"]}%</p>
                  <div style={{ width: "100px", height: "100px" }}>
                    <CircularProgressbar
                      value={selectedRobot["CPU Usage"]}
                      text={`${selectedRobot["CPU Usage"]}%`}
                      styles={buildStyles({
                        textColor: "#fff",
                        top:"50%",
                        pathColor:
                          selectedRobot["CPU Usage"] > 75
                            ? "red"
                            : selectedRobot["CPU Usage"] > 25
                            ? "orange"
                            : "green",
                        trailColor: "#333",
                      })}
                    />
                  </div>
                </div>
                <div>
                  <p><strong>Last Updated:</strong> {selectedRobot["Last Updated"]}</p>
                </div>
                {/* RAM and Location */}
                <div>
                  <p>
                    <strong>RAM Usage:</strong>{" "}
                    {selectedRobot["RAM Consumption"]} MB
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedRobot["Location Coordinates"]
                      ? `${selectedRobot["Location Coordinates"][0]}, ${selectedRobot["Location Coordinates"][1]}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{display: "block", margin: "20px auto 0", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "50px", cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
    </div>
  );
};
export default RobotList;