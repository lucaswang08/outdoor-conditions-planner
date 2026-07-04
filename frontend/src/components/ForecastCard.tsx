import type { Activity, WeatherDay } from "../types/forecast"
import { useState } from "react"
import { getTripAdvice } from "../api/backend"
import type { TripAdvice } from "../types/advice"

type ForecastCardProps = {
  forecast: WeatherDay
  selectedActivity: Activity
  isAdviceOpen: boolean
  onOpenAdvice: () => void
  onCloseAdvice: () => void
}

function getWeekday(dateStr: string) {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString(undefined, { weekday: "short" })
}

function getDateFormat(dateStr: string) {
  const date = new Date(`${dateStr}T12:00:00`)
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })
}

function getActivityScore(weather: WeatherDay, activity: Activity) {
  return weather.scores.find(score => score.activity === activity)
}

const weatherCodeMap: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear", icon: "clear@4x.png" },
  1: { label: "Mostly clear", icon: "mostly-clear@4x.png" },
  2: { label: "Partly cloudy", icon: "partly-cloudy@4x.png" },
  3: { label: "Overcast", icon: "overcast@4x.png" },

  45: { label: "Fog", icon: "fog@4x.png" },
  48: { label: "Rime fog", icon: "rime-fog@4x.png" },

  51: { label: "Light drizzle", icon: "light-drizzle@4x.png" },
  53: { label: "Moderate drizzle", icon: "moderate-drizzle@4x.png" },
  55: { label: "Dense drizzle", icon: "dense-drizzle@4x.png" },

  56: { label: "Light freezing drizzle", icon: "light-freezing-drizzle@4x.png" },
  57: { label: "Dense freezing drizzle", icon: "dense-freezing-drizzle@4x.png" },

  61: { label: "Light rain", icon: "light-rain@4x.png" },
  63: { label: "Moderate rain", icon: "moderate-rain@4x.png" },
  65: { label: "Heavy rain", icon: "heavy-rain@4x.png" },

  66: { label: "Light freezing rain", icon: "light-freezing-rain@4x.png" },
  67: { label: "Heavy freezing rain", icon: "heavy-freezing-rain@4x.png" },

  71: { label: "Slight snowfall", icon: "slight-snowfall@4x.png" },
  73: { label: "Moderate snowfall", icon: "moderate-snowfall@4x.png" },
  75: { label: "Heavy snowfall", icon: "heavy-snowfall@4x.png" },
  77: { label: "Snow grains", icon: "snowflake@4x.png" },

  80: { label: "Light rain showers", icon: "light-rain@4x.png" },
  81: { label: "Moderate rain showers", icon: "moderate-rain@4x.png" },
  82: { label: "Heavy rain showers", icon: "heavy-rain@4x.png" },

  85: { label: "Slight snow showers", icon: "slight-snowfall@4x.png" },
  86: { label: "Heavy snow showers", icon: "heavy-snowfall@4x.png" },

  95: { label: "Thunderstorm", icon: "thunderstorm@4x.png" },
  96: { label: "Thunderstorm with hail", icon: "thunderstorm-with-hail@4x.png" },
  99: { label: "Thunderstorm with hail", icon: "thunderstorm-with-hail@4x.png" },
}

function getWeatherDisplay(weatherCode: number) {
  return weatherCodeMap[weatherCode] || { label: "Unknown", icon: "cloudy@4x.png"}
}

function ForecastCard({
  forecast,
  selectedActivity,
  isAdviceOpen,
  onOpenAdvice,
  onCloseAdvice,
}: ForecastCardProps) {
  // const { summary } = forecast

  const [advice, setAdvice] = useState<TripAdvice | null>(null)
  const [adviceLoading, setAdviceLoading] = useState(false)
  const [adviceError, setAdviceError] = useState<string | null>(null)

  const activityScore = getActivityScore(forecast, selectedActivity)
  

  if (!activityScore) {
    return null
  }

  const score = activityScore.score
  const label = activityScore.label
  const reasons = activityScore.reasons.map(reason => reason.message)

  const weather = getWeatherDisplay(forecast.summary.weather_code)

  const handleGetAdvice = async () => {
    setAdviceLoading(true)
    setAdviceError(null)

    try {
      const data = await getTripAdvice({
        activity: selectedActivity,
        date: forecast.date,
        weather: forecast.summary,
        score: activityScore
      })
      setAdvice(data)
      onOpenAdvice()
    } catch {
      setAdviceError("Failed to get advice. Please try again.")
    } finally {
      setAdviceLoading(false)
    }
  }

  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <p className="forecast-day">{getWeekday(forecast.date)}</p>
        <p className="forecast-date">{getDateFormat(forecast.date)}</p>
      </div>

      <img
        className="forecast-icon"
        src={`/weather-icons/${weather.icon}`}
        alt={weather.label}
      />

      <div className="forecast-score-block">
        <p className= {`forecast-score ${label}`}>{score}</p>
        <p className="forecast-label">{label}</p>

      </div>

      <ul className="forecast-reasons">
        {reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>

      <div className="score-track">
        <div
          className={`score-fill ${label}`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="advice-request">
        <button 
          className="advice-button"
          onClick={handleGetAdvice}
          disabled={adviceLoading}
        >
          {adviceLoading ? "Loading..." : "AI Trip Advice"}
        </button>
      </div>
      
      {adviceError && (
        <p className="advice-error">{adviceError}</p>
      )}

      {advice && isAdviceOpen && (
        <div className="advice-overlay">
          <div className="advice-content">
            <button 
              className="advice-close-button"
              onClick={onCloseAdvice}
            >
              x
            </button>

            <h3 className="advice-title">Trip Advice for {getDateFormat(forecast.date)}</h3>
            <p className="advice-summary">{advice.summary}</p>
            <h3>Gear</h3>
            <ul>
              {advice.gear.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Expectations</h3>
            <ul>
              {advice.expectations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3>Cautions</h3>
            <ul>
              {advice.cautions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}

export default ForecastCard