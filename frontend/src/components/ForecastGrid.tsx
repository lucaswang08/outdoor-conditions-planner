import type { WeatherForecast } from "../types/forecast"
import ForecastCard from "./ForecastCard"

type ForecastGridProps = {
  forecast: WeatherForecast | null
  loading: boolean
  error: string
}

function ForecastGrid({ forecast, loading, error }: ForecastGridProps) {
  if (loading) {
    return <p>Loading forecast...</p>
  }
  
  if (error) {
    return <p>{error}</p>
  }

  if (!forecast) {
    return <p>No forecast available. Please select a location.</p>
  }

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <h2>7-Day Forecast</h2>
        </div>
      </div>
        <p className="section-description">
          Scores are based on weather, comfort, and activity-specific conditions.
        </p>

      <div className="forecast-grid">
        {forecast.forecast.map((day) => (
          <ForecastCard key={day.date} forecast={day} />
        ))}
      </div>
    </section>
  )
}

export default ForecastGrid