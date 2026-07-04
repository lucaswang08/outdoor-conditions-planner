import type { Activity, WeatherForecast } from "../types/forecast"
import { useEffect, useState } from "react"
import ForecastCard from "./ForecastCard"

type ForecastGridProps = {
  forecast: WeatherForecast | null
  loading: boolean
  error: string
  selectedActivity: Activity
}

function getBestDays(forecast: WeatherForecast, selectedActivity: Activity) {
  return forecast.forecast
    .map((day) => {
      const activityScore = day.scores.find(
        (score) => score.activity === selectedActivity
      )

      return {
        date: day.date,
        score: activityScore?.score ?? 0,
      }
    })
    .filter((day) => day.score >= 70)
    .sort((a, b) => b.score - a.score)
}

function getWeekday(dateStr: string) {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString(undefined, { weekday: "long" })
}

function ForecastGrid({ forecast, loading, error, selectedActivity }: ForecastGridProps) {
  const [openAdviceDate, setOpenAdviceDate] = useState<string | null>(null)

  useEffect(() => {
    setOpenAdviceDate(null)
  }, [selectedActivity])

  if (loading) {
    return <p>Loading forecast...</p>
  }
  
  if (error) {
    return <p>{error}</p>
  }

  if (!forecast) {
    return <p>No forecast available. Please select a location.</p>
  }


  const bestDays = getBestDays(forecast, selectedActivity)

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
          <ForecastCard
            key={day.date}
            forecast={day}
            selectedActivity={selectedActivity}
            isAdviceOpen={openAdviceDate === day.date}
            onOpenAdvice={() => setOpenAdviceDate(day.date)}
            onCloseAdvice={() => setOpenAdviceDate(null)}
          />
        ))}
      </div>
      
      <div className="best-days-section">
        <div className="best-days-content">
          {bestDays.length > 0 ? (
            <>
              <p className="best-days-title">Best Days to Go</p>

              <div className="best-days-dates">
                <span>
                  {bestDays.map((day) => getWeekday(day.date)).join(", ")}
                </span>
              </div>

              <p className="best-days-text">
                These days have the best overall conditions for {selectedActivity}.
              </p>
            </>
          ) : (
            <>
              <p className="best-days-title">No Strong Days This Week</p>
              <p className="best-days-text">
                No days scored 70 or above. Check the forecast again later.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ForecastGrid