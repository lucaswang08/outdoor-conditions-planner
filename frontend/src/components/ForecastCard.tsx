import type { WeatherDay } from "../types/forecast"

type ForecastCardProps = {
  forecast: WeatherDay
}

function ForecastCard({ forecast }: ForecastCardProps) {
  const { summary } = forecast

  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <p className="forecast-day">{forecast.date}</p>
      </div>

      <div className="forecast-body">
        <p className="forecast-weather">Weather code: {summary.weather_code}</p>

        <p className="forecast-temperature">
          {summary.temperature.min}° / {summary.temperature.max}°
        </p>

        <ul className="forecast-reasons">
          <li>Precipitation chance: {summary.precipitation_probability_max.value}{summary.precipitation_probability_max.unit}</li>
          <li>Wind: {summary.wind_speed_max.value} {summary.wind_speed_max.unit}</li>
          <li>Sunset: {summary.sunset}</li>
        </ul>
      </div>
    </div>
  )
}

export default ForecastCard