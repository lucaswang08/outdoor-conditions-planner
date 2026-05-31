import httpx

OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

def get_scores_for_forecast(): #temporary
  return [
    {
      "activity": "hiking",
      "score": 82,
      "label": "Excellent",
      "reasons": [
        {
          "factor": "precipitation",
          "impact": "good",
          "message": "Low rain chance."
        },
        {
          "factor": "temperature",
          "impact": "good",
          "message": "Mild temperatures."
        },
        {
          "factor": "wind_speed",
          "impact": "bad",
          "message": "High winds."
        }
      ]
    },
    {
      "activity": "snowboarding",
      "score": 30,
      "label": "Poor",
      "reasons": [
        {
          "factor": "precipitation",
          "impact": "good",
          "message": "Low rain chance."
        },
        {
          "factor": "temperature",
          "impact": "good",
          "message": "Mild temperatures."
        },
        {
          "factor": "wind_speed",
          "impact": "bad",
          "message": "High winds."
        }
      ]
    },
    {"activity": "stargazing",
      "score": 70,
      "label": "Good",
      "reasons": [
        {
          "factor": "precipitation",
          "impact": "good",
          "message": "Low rain chance."
        },
        {
          "factor": "temperature",
          "impact": "good",
          "message": "Mild temperatures."
        },
        {
          "factor": "wind_speed",
          "impact": "bad",
          "message": "High winds."
        }
      ]
    }
  ]
  

def fetch_open_meteo_forecast(latitude: float, longitude: float):
  params = {
    "latitude": latitude,
    "longitude": longitude,
    "daily": ",".join([
      "temperature_2m_min",
      "temperature_2m_max",
      "precipitation_sum",
      "snowfall_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "weather_code",
      "sunrise",
      "sunset",
      "daylight_duration"
    ]),
    "hourly": ",".join([
      "temperature_2m",
      "apparent_temperature",
      "precipitation",
      "precipitation_probability",
      "snowfall",
      "snow_depth",
      "cloud_cover",
      "cloud_cover_low",
      "cloud_cover_mid",
      "cloud_cover_high",
      "visibility",
      "wind_speed_10m",
      "wind_gusts_10m",
      "relative_humidity_2m",
      "weather_code"
    ]),
    "timezone": "auto"
  }
  
  response = httpx.get(OPEN_METEO_URL, params=params, timeout=10)
  response.raise_for_status()
  return response.json()


def value_at(values: list, index: int):
  if values is None or index >= len(values):
    return None
  return values[index]


def normalize_open_meteo_data(data: dict):
  daily_data = data["daily"]
  hourly_data = data["hourly"]
  daily_units = data.get("daily_units", {})
  hourly_units = data.get("hourly_units", {})

  forecast = []

  for daily_index, date in enumerate(daily_data["time"]):
    hourly = []

    for hourly_index, time in enumerate(hourly_data["time"]):
      if not time.startswith(date):
        continue

      hourly.append({
        "time": time,
        "temperature": {
          "value": value_at(hourly_data.get("temperature_2m"), hourly_index),
          "unit": hourly_units.get("temperature_2m", "celsius")
        },
        "apparent_temperature": {
          "value": value_at(hourly_data.get("apparent_temperature"), hourly_index),
          "unit": hourly_units.get("apparent_temperature", "celsius")
        },
        "precipitation": {
          "value": value_at(hourly_data.get("precipitation"), hourly_index),
          "unit": hourly_units.get("precipitation", "mm")
        },
        "precipitation_probability": {
          "value": value_at(hourly_data.get("precipitation_probability"), hourly_index),
          "unit": hourly_units.get("precipitation_probability", "percent")
        },
        "snowfall": {
          "value": value_at(hourly_data.get("snowfall"), hourly_index),
          "unit": hourly_units.get("snowfall", "cm")
        },
        "snow_depth": {
          "value": value_at(hourly_data.get("snow_depth"), hourly_index),
          "unit": hourly_units.get("snow_depth", "m")
        },
        "cloud_cover": {
          "value": value_at(hourly_data.get("cloud_cover"), hourly_index),
          "unit": hourly_units.get("cloud_cover", "percent")
        },
        "cloud_cover_low": {
          "value": value_at(hourly_data.get("cloud_cover_low"), hourly_index),
          "unit": hourly_units.get("cloud_cover_low", "percent")
        },
        "cloud_cover_mid": {
          "value": value_at(hourly_data.get("cloud_cover_mid"), hourly_index),
          "unit": hourly_units.get("cloud_cover_mid", "percent")
        },
        "cloud_cover_high": {
          "value": value_at(hourly_data.get("cloud_cover_high"), hourly_index),
          "unit": hourly_units.get("cloud_cover_high", "percent")
        },
        "visibility": {
          "value": value_at(hourly_data.get("visibility"), hourly_index),
          "unit": hourly_units.get("visibility", "m")
        },
        "wind_speed": {
          "value": value_at(hourly_data.get("wind_speed_10m"), hourly_index),
          "unit": hourly_units.get("wind_speed_10m", "km/h")
        },
        "wind_gust": {
          "value": value_at(hourly_data.get("wind_gusts_10m"), hourly_index),
          "unit": hourly_units.get("wind_gusts_10m", "km/h")
        },
        "relative_humidity": {
          "value": value_at(hourly_data.get("relative_humidity_2m"), hourly_index),
          "unit": hourly_units.get("relative_humidity_2m", "percent")
        },
        "weather_code": value_at(hourly_data.get("weather_code"), hourly_index)
      })

    forecast.append({
      "date": date,
      "summary": {
        "temperature": {
          "min": value_at(daily_data.get("temperature_2m_min"), daily_index),
          "max": value_at(daily_data.get("temperature_2m_max"), daily_index),
          "unit": daily_units.get("temperature_2m_min", "celsius")
        },
        "precipitation_sum": {
          "value": value_at(daily_data.get("precipitation_sum"), daily_index),
          "unit": daily_units.get("precipitation_sum", "mm")
        },
        "snowfall_sum": {
          "value": value_at(daily_data.get("snowfall_sum"), daily_index),
          "unit": daily_units.get("snowfall_sum", "cm")
        },
        "precipitation_probability_max": {
          "value": value_at(daily_data.get("precipitation_probability_max"), daily_index),
          "unit": daily_units.get("precipitation_probability_max", "percent")
        },
        "wind_speed_max": {
          "value": value_at(daily_data.get("wind_speed_10m_max"), daily_index),
          "unit": daily_units.get("wind_speed_10m_max", "km/h")
        },
        "wind_gust_max": {
          "value": value_at(daily_data.get("wind_gusts_10m_max"), daily_index),
          "unit": daily_units.get("wind_gusts_10m_max", "km/h")
        },
        "weather_code": value_at(daily_data.get("weather_code"), daily_index),
        "sunrise": value_at(daily_data.get("sunrise"), daily_index),
        "sunset": value_at(daily_data.get("sunset"), daily_index),
        "daylight_duration": value_at(daily_data.get("daylight_duration"), daily_index) 
      },
      "hourly": hourly,
      "scores": get_scores_for_forecast()
    })

  return {
    "location": {
      "latitude": data["latitude"],
      "longitude": data["longitude"],
      "timezone": data["timezone"]
    },
    "forecast": forecast
  }

def get_forecast(latitude: float, longitude: float):
  data = fetch_open_meteo_forecast(latitude, longitude)
  return normalize_open_meteo_data(data)
