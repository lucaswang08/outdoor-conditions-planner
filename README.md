# Outdoor Conditions Planner

A full-stack web app that helps users compare outdoor conditions for activities like hiking, stargazing, and skiing/snowboarding.

## Live Demo

[View the live app](https://outdoor-conditions-planner.vercel.app/)

## Features

- Search locations across Canada (easily expandable to worldwide)
- Access clear 7-day weather forecast
- Get activity-specific condition scores for hiking, stargazing, and skiing/snowboarding
- Explanations for each score based on weather forecast
- View structured AI trip advice for specific day and activity

## How It Works

The application retrieves forecast data and converts it into normalized daily weather summaries. Each activity uses its own deterministic scoring algorithm based on relevant factors such as precipitation, temperature, wind, cloud cover, humidity, and daylight.

The resulting score and weather data can then be passed to OpenAI to generate additional trip advice while keeping the core recommendation logic deterministic and explainable.


## Tech Stack

**Frontend**
- React
- TypeScript
- Vite

**Backend**
- Python
- FastAPI
- Pydantic

**APIs**
- Open-Meteo Weather API
- Open-Meteo Geocoding API
- OpenAI API

**Deployment**
- Vercel
- Render
