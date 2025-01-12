# The Weather App

## Overview
The Weather App is a full-stack application that provides users with real-time weather information and a weekly forecast for cities around the world. It also includes a search feature to easily find city-specific weather updates.

## Features
- Current Weather: Displays the current temperature, conditions, and other key details for the selected city.
- Weekly Forecast: Provides a 3-day weather forecast.
- City Search: Allows users to search for weather updates by city name.

## Technologies Used

### Frontend

- HTML and CSS: Used to design and style a custom and interactive user interface.

- React.js: Used to build the dynamic and interactive user interface.

- Axios: For making API requests to the backend server.

- GitHub Pages: Used for deploying the frontend of the application.

### Backend

- Flask: Serves as the backend framework for handling API requests.

- Flask-CORS: Handles cross-origin requests to allow communication between the frontend and backend.

- WeatherAPI: A third-party API used to fetch weather data.

- Render: Used for deploying the backend server.

### Deployment

- Frontend: Deployed on GitHub Pages.

- Backend: Hosted on Render to provide public API endpoints.

## How It Works

1. Users interact with the React-based frontend to search for a city or view weather updates.

2. The frontend makes API requests to the Flask backend hosted on Render.

3. The backend processes the request, fetches data from the WeatherAPI, and sends the response back to the frontend.

4. The frontend dynamically updates the weather information based on the response.

## Collaborators

This projected was created in collaboration with Evan Romano (https://github.com/EVR0). I was primarily responsible for designing and implementing the React-based frontend using HTML and CSS, and integrating it with the Flask backend by configuring and managing API requests with Axios. Meanwhile, Evan was primarily responsible for the backend development and deployment, designing and implementing the Flask backend, including defining API endpoints, and deploying the server on Render to handle API requests.

While we had distinct primary responsibilities both of us worked closely together throughout the project. We supported each other in understanding and implementing all aspects of the application, ensuring that both of us are proficient in the frontend and backend technologies used in this project.