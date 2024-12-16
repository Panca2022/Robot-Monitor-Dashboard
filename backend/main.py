import asyncio
from fastapi import FastAPI, WebSocket
import random
import uuid
import time
from typing import List
app = FastAPI()
# Enable CORS for frontend-backend communication
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Robot Data Simulation
robots = [
    {
        "Robot ID": str(uuid.uuid4()),
        "Online/Offline": random.choice([True, False]),
        "Battery Percentage": random.randint(40, 100),  # Start with a higher battery percentage
        "Battery Health": random.uniform(80, 100),  # Starting health (battery condition)
        "CPU Usage": random.randint(10, 100),
        "RAM Consumption": random.randint(2000, 8000),
        "Last Updated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "Location Coordinates": [round(random.uniform(-90, 90), 6), round(random.uniform(-180, 180), 6)],
    }
    for _ in range(10)
]
@app.get("/")
async def home():
    return {"message": "Robot Fleet Monitoring API is running"}

@app.get("/robots")
async def get_robots():
    # Update robot details on each request
    for robot in robots:
        # Simulate random fluctuation for battery percentage
        battery_fluctuation = random.randint(-3, 3)  # Random fluctuation between -3 and 3
        robot["Battery Percentage"] = max(min(robot["Battery Percentage"] + battery_fluctuation, 100), 0)
        # Simulate random fluctuation for battery health (between -0.2 and 0.2)
        health_fluctuation = random.uniform(-0.2, 0.2)
        robot["Battery Health"] = max(min(robot["Battery Health"] + health_fluctuation, 100), 50)
        # Random fluctuation for CPU Usage (between -5 and 5)
        cpu_fluctuation = random.randint(-5, 5)
        robot["CPU Usage"] = max(min(robot["CPU Usage"] + cpu_fluctuation, 100), 0)
        # Random fluctuation for RAM Consumption (between -500 and 500)
        ram_fluctuation = random.randint(-500, 500)
        robot["RAM Consumption"] = max(min(robot["RAM Consumption"] + ram_fluctuation, 8000), 2000)
        # Randomly determine Online/Offline status with a chance for robots to go offline
        # Make a robot go offline based on battery percentage and health or a random chance
        if robot["Battery Percentage"] > 0 and random.random() < 0.1:  # 10% chance to go offline
            robot["Online/Offline"] = False
        else:
            robot["Online/Offline"] = robot["Battery Percentage"] > 0
        # Update last updated time
        robot["Last Updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
        # Simulate random location coordinates fluctuation
        robot["Location Coordinates"] = [
            round(random.uniform(-90, 90), 6),
            round(random.uniform(-180, 180), 6),
        ]
    return robots
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        for robot in robots:
            # Simulate random fluctuation for battery percentage
            battery_fluctuation = random.randint(-3, 3)
            robot["Battery Percentage"] = max(min(robot["Battery Percentage"] + battery_fluctuation, 100), 0)
            # Simulate random fluctuation for battery health
            health_fluctuation = random.uniform(-0.2, 0.2)
            robot["Battery Health"] = max(min(robot["Battery Health"] + health_fluctuation, 100), 50)
            # Random fluctuation for CPU Usage
            cpu_fluctuation = random.randint(-5, 5)
            robot["CPU Usage"] = max(min(robot["CPU Usage"] + cpu_fluctuation, 100), 0)
            # Random fluctuation for RAM Consumption
            ram_fluctuation = random.randint(-500, 500)
            robot["RAM Consumption"] = max(min(robot["RAM Consumption"] + ram_fluctuation, 8000), 2000)
            # Randomly determine Online/Offline status with a chance for robots to go offline
            if robot["Battery Percentage"] > 0 and random.random() < 0.1:  # 10% chance to go offline
                robot["Online/Offline"] = False
            else:
                robot["Online/Offline"] = robot["Battery Percentage"] > 0
            # Update last updated time
            robot["Last Updated"] = time.strftime("%Y-%m-%d %H:%M:%S")
            # Simulate random location coordinates fluctuation
            robot["Location Coordinates"] = [
                round(random.uniform(-90, 90), 6),
                round(random.uniform(-180, 180), 6),
            ]
        await websocket.send_json(robots)
        await asyncio.sleep(5)