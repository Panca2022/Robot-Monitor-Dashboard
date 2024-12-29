# Robot Fleet Monitoring Dashboard

A web-based dashboard to monitor the real-time status and telemetry data of a fleet of robots. This project includes both a **backend** API for simulating robot data and a **frontend** dashboard to display the data in an interactive and responsive manner.

## Features

- **Robot List**: Displays a list of robots with the following details:
  - Robot ID (UUID)
  - Online/Offline status (Boolean)
  - Battery percentage (Int)
  - CPU usage (Int)
  - RAM consumption (Int)
  - Last updated timestamp
  - Location coordinates (latitude, longitude)
  
- **Real-time Updates**: 
  - The dashboard updates every 5 seconds to show real-time telemetry data.
  - Displays the robots' status and location on an interactive map.
  - Robots with offline status or low battery levels (< 20%) are highlighted in red.

- **Map View**: 
  - Uses **Leaflet.js** (or **Mapbox**) to display the robots' positions on an interactive map.
  - The map refreshes in real-time, showing the current location of robots on the field.

- **Filters**: 
  - Users can filter the robots by status (Online/Offline) or battery level.

## Tech Stack

### Backend
- **FastAPI**: Python web framework for building the backend API. FastAPI is used here for high performance and easy integration with WebSockets.
- **WebSockets / REST API**: For real-time data updates. The backend provides an API endpoint that streams telemetry data updates to the frontend.
- **Fake Robot Data**: Simulated telemetry data for up to 10 robots, including battery, CPU usage, RAM consumption, and location.

### Frontend
- **React.js**: JavaScript library for building the user interface. React is used to build the dynamic dashboard that interacts with the backend API.
- **Leaflet.js**: JavaScript library for embedding interactive maps. It displays robot locations in real-time.

### Deployment
- **Frontend**: Deployed on **Netlify** for easy static site hosting and continuous deployment.
- **Backend**: Deployed on **Heroku** or **Render** for hosting the FastAPI application.
- **Docker**: The application is containerized using Docker for easy deployment and environment consistency.

## Working Process

### Step 1: Backend (FastAPI)
1. The backend uses FastAPI to create an API that simulates robot telemetry data. This data is generated randomly or pulled from the `fake_robot_data.json` file.
2. The API runs on a WebSocket server, emitting real-time updates for robot data (status, battery, CPU, RAM, and location).
3. The backend also includes a REST API to serve the data in case WebSocket connections aren't possible.

### Step 2: Frontend (React.js)
1. The frontend fetches real-time updates from the backend using WebSockets or regular polling every 5 seconds.
2. It displays the list of robots and their telemetry data (status, battery, CPU, RAM, etc.).
3. It uses **Leaflet.js** to plot robot locations on a map. This map is updated every time new location data is received.
4. Robots with offline status or low battery levels (< 20%) are highlighted with a red background.

### Step 3: Real-Time Interaction
1. The backend continuously sends updates on each robot's telemetry data to the frontend.
2. The frontend renders these updates in real-time and adjusts the UI accordingly:
   - Robots that are offline will be highlighted in red.
   - Robots with low battery levels will also be marked in red.
3. The map continuously updates to reflect the real-time location of each robot.

### Step 4: Hosting and Deployment
- The backend is hosted on **Heroku** or **Render** for scalability.
- The frontend is deployed on **Netlify**, enabling users to access the dashboard via a public URL.

## Installation

### Backend Setup

1. Clone the repository:
   git clone https://github.com/your-username/robot-fleet-dashboard.git
   cd robot-fleet-dashboard/backend
   pip install -r requirements.txt
   uvicorn main:app --reload

### Frontend Setup
1. Navigate to the frontend directory:
  cd robot-fleet-dashboard/frontend
2. Install dependencies:
  npm install
3. Run the frontend development server:
  npm start

## Docker Setup
### Build the Docker image:
docker build -t robot-fleet-dashboard .
### Run the Docker container:
docker run -p 8080:8080 robot-fleet-dashboard

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- FastAPI for the backend framework.
- React.js for the frontend.
- Leaflet.js for map integration.
- Docker for containerization.

## Future Improvements
- Add authentication to the dashboard.
- Implement user roles and permissions (e.g., admin access).
- Provide more advanced robot telemetry data like temperature, speed, etc.
- Implement data persistence using a database.
