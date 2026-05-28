def get_forecast(latitude: float, longitude: float):
  return {
    "location": {
      "latitude": latitude,
      "longitude": longitude,
      "timezone": "Vancouver Time (PST)",
    },
    "forecast": [
      {
        "date": "2026-01-01",
        "summary": {
          "temperature": {
            "min": 10.0,
            "max": 20.0,
            "unit": "celsius"
          },
          "precipitation_sum": {
            "value": 0.0,
            "unit": "mm"
          },
          "snowfall_sum": {
            "value": 0.0,
            "unit": "cm"
          },
          "precipitation_probability_max": {
            "value": 20.0,
            "unit": "percent"
          },
          "wind_speed_max": {
            "value": 12.0,
            "unit": "km/h"
          },
          "wind_gust_max": {
            "value": 20.0,
            "unit": "km/h"
          },
          "weather_code": 1,
          "sunrise": "2026-01-01T08:05",
          "sunset": "2026-01-01T16:25",
          "daylight_hours": 8.33
        },
        "hourly": [
          {
            "time": "2026-01-01T00:00",
            "temperature": {
              "value": 12.0,
              "unit": "celsius"
            },
            "apparent_temperature": {
              "value": 10.0,
              "unit": "celsius"
            },
            "precipitation": {
              "value": 0.0,
              "unit": "mm"
            },
            "precipitation_probability": {
              "value": 10.0,
              "unit": "percent"
            },
            "snowfall": {
              "value": 0.0,
              "unit": "cm"
            },
            "snow_depth": {
              "value": 0.0,
              "unit": "cm"
            },
            "cloud_cover": {
              "value": 20.0,
              "unit": "percent"
            },
            "cloud_cover_low": {
              "value": 10.0,
              "unit": "percent"
            },
            "cloud_cover_mid": {
              "value": 5.0,
              "unit": "percent"
            },
            "cloud_cover_high": {
              "value": 5.0,
              "unit": "percent"
            },
            "visibility": {
              "value": 10.0,
              "unit": "km"
            },
            "wind_speed": {
              "value": 8.0,
              "unit": "km/h"
            },
            "wind_gust": {
              "value": 15.0,
              "unit": "km/h"
            },
            "weather_code": 1
          }
        ]
      }
    ],
  }