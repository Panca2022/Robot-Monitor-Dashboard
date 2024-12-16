import { useEffect } from "react";

const SocketConnection = ({ setRobots }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data from WebSocket:", data); // Add logging here
      setRobots(data); // Set the robots data when received
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    return () => {
      socket.close(); // Close the socket when the component unmounts
    };
  }, [setRobots]);

  return null;
};

export default SocketConnection;
