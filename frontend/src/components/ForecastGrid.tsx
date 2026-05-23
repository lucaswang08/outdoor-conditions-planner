import { mockForecast } from "../data/mockForecast"
import ForecastCard from "./ForecastCard"

function ForecastGrid() {
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
        {mockForecast.map((forecast) => (
          <ForecastCard key={forecast.id} forecast={forecast} />
        ))}
      </div>
    </section>
  )
}

export default ForecastGrid