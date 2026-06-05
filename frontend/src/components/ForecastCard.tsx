import type { WeatherDay } from "../types/forecast"

type ForecastCardProps = {
  forecast: WeatherDay
  selectedActivity: string
}

function getWeekday(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { weekday: "short" })
}

function getDateFormat(dateStr: string) {
  const formatted = new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  return formatted
}

function getActivityScore(weather: WeatherDay, activity: string) {
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

function ForecastCard({ forecast, selectedActivity }: ForecastCardProps) {
  // const { summary } = forecast

  const activityScore = getActivityScore(forecast, selectedActivity)
  const score = activityScore.score
  const label = activityScore.label
  const reasons = activityScore.reasons.map(reason => reason.message)

  const weather = getWeatherDisplay(forecast.summary.weather_code)

  if (!activityScore) {
    return null
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
    </div>
  )
}

export default ForecastCard