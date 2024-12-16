import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RobotStats = ({ robots = [] }) => {
  const [updateNotification, setUpdateNotification] = useState('');

  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);

  useEffect(() => {
    if (robots && robots.length > 0) {
      const onlineRobots = robots.filter((robot) => robot["Online/Offline"] === true);
      setOnlineCount(onlineRobots.length);
      setOfflineCount(robots.length - onlineRobots.length);

      setUpdateNotification(`The robot stats have been updated! 
        Online: ${onlineCount} Robots
        Offline: ${offlineCount} Robots`);
    }
  }, [robots, onlineCount, offlineCount]);

  const totalCharge = robots.reduce((acc, robot) => {
    if (robot["Battery Percentage"] && robot["Online/Offline"] === true) {
      return acc + robot["Battery Percentage"];
    }
    return acc;
  }, 0);

  const avgCharge = onlineCount > 0 ? totalCharge / onlineCount : 0;

  let batteryColor = "#FF0000"; 
  if (avgCharge >= 25 && avgCharge <= 75) {
    batteryColor = "#FFBF00"; 
  } else if (avgCharge > 75) {
    batteryColor = "#32CD32"; 
  }

  const onlineOfflineData = {
    labels: ["Online", "Offline"],
    datasets: [
      {
        data: [onlineCount, offlineCount],
        backgroundColor: ["#00FFFF", "#FF4500"],
        borderWidth: 0,
      },
    ],
  };

  const batteryData = {
    labels: ["Average Battery Percentage"],
    datasets: [
      {
        data: [avgCharge.toFixed(2), 100 - avgCharge.toFixed(2)],
        backgroundColor: [batteryColor, "#D3D3D3"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "70%",
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  if (!robots || robots.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "50%", margin: "0 auto", color: "#fff", marginTop: "25px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Robot Performance Overview
      </h2>

      {updateNotification && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#333",
            borderRadius: "8px",
            marginBottom: "20px",
            height:"80px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          <p>{updateNotification}</p>
        </div>
      )}

      <div
        style={{
          marginBottom: "30px", 
          padding: "10px", 
          backgroundColor: "#333", 
          borderRadius: "8px"
        }}
      >
        <h4>Robot's Current Activity Status</h4>
        <div style={{ position: "relative", width: "200px", height: "200px", margin: "0 auto" }}>
          <Pie data={onlineOfflineData} options={chartOptions} />
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {robots.length} CybMech Bot
          </div>
        </div>
      </div>

      <div style={{ padding: "10px", backgroundColor: "#333", borderRadius: "8px" }}>
        <h4>Robot's Average Battery</h4>
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "200px",
            margin: "0 auto",
          }}
        >
          <Pie data={batteryData} options={chartOptions} />
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {avgCharge.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotStats;
