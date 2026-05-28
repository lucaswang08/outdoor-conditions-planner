from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.geocoding import search_location
from services.weather import get_forecast

from models.weather import WeatherForecast

app = FastAPI(
  title="Outdoor Conditions Planner API",
  description="Backend API for location search, weather forecasts, and outdoor condition scoring.",
  version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
  return {"status": "ok"}

@app.get("/api/geocode")
def geocode_location(query: str):
  results = search_location(query)
  return {
    "query": query,
    "results": results
  }

@app.get("/api/weather", response_model=WeatherForecast)
def weather_forecast(latitude: float, longitude: float):
  return get_forecast(latitude, longitude)

