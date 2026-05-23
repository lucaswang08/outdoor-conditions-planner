import type { ForecastDay } from "../types/forecast"

type ForecastCardProps = {
  forecast: ForecastDay
}

function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <p className="forecast-day">{forecast.day}</p>
        <p className="forecast-date">{forecast.date}</p>
      </div>

      <div className="forecast-body">
        <p className="forecast-weather">{forecast.weather}</p>
        <p className={`forecast-score ${forecast.label.toLowerCase()}`}>{forecast.score}</p>
        <p className="forecast-label">{forecast.label}</p>
        <p className="forecast-temperature">{forecast.temperature}</p>

        <ul className="forecast-reasons">
          {forecast.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ForecastCard