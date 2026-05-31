import type { WeatherDay } from "../types/forecast"

type ForecastCardProps = {
  forecast: WeatherDay
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
// function getConditionScore() {

//   return Math.floor(Math.random() * 55) + 40
// }

// function getScoreLabel(score: number) {
//   if (score >= 80) return "Excellent"
//   if (score >= 70) return "Good"
//   if (score >= 60) return "Fair"
//   return "Poor"
// }

// function getReasons() {
//   // const { summary } = forecast
//   const reasons = ["Reason 1", "Reason 2", "Reason 3"]
//   return reasons
// }

function ForecastCard({ forecast }: ForecastCardProps) {
  // const { summary } = forecast

  const activityScore = getActivityScore(forecast, "hiking") // TODO: pass activity as prop
  const score = activityScore.score
  const label = activityScore.label
  const reasons = activityScore.reasons.map(reason => reason.message)

  return (
    <div className="forecast-card">
      <div className="forecast-header">
        <p className="forecast-day">{getWeekday(forecast.date)}</p>
        <p className="forecast-date">{getDateFormat(forecast.date)}</p>
      </div>

      <div className="forecast-icon" aria-hidden="true">
        ☀
      </div>

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