import React from 'react';

const RobotCard = ({ robot }) => {
  return (
    <div className="robot-card">
      <h3>Robot ID: {robot["Robot ID"]}</h3>
      <p>Status: {robot["Online/Offline"] ? 'Online' : 'Offline'}</p>
      <p>Battery: {robot["Battery Percentage"]}%</p>
      <p>CPU Usage: {robot["CPU Usage"]}%</p>
      <p>RAM: {robot["RAM Consumption"]}MB</p>
      <p>Last Updated: {robot["Last Updated"]}</p>
      <p>Location: {robot["Location Coordinates"].join(', ')}</p>
    </div>
  );
};

export default RobotCard;
