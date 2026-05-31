export type Activity = "hiking" | "snowboarding" | "stargazing"

export type ScoreLabel = "Excellent" | "Good" | "Fair" | "Poor"

export type Impact = "good" | "bad" | "neutral"

export type Reason = {
  factor: string
  impact: Impact
  message: string
}

export type Score = {
  activity: Activity
  score: number
  label: ScoreLabel
  reasons: Reason[]
}
 
export type Location = {
  name: string
  region: string
  country: string
  latitude: number
  longitude: number
}

export type ValueUnit = {
  value: number
  unit: string
}

export type DailyTemperature = {
  min: number
  max: number
  unit: string
}

export type WeatherResponseLocation = {
  latitude: number
  longitude: number
  timezone: string
}

export type DailyForecast = {
  temperature: DailyTemperature
  precipitation_sum: ValueUnit
  snowfall_sum: ValueUnit
  precipitation_probability_max: ValueUnit
  wind_speed_max: ValueUnit
  wind_gust_max: ValueUnit
  weather_code: number
  sunrise: string
  sunset: string
  daylight_duration: number
}

export type WeatherDay = {
  date: string
  summary: DailyForecast
  scores: Score[]
}

export type WeatherForecast = {
  location: WeatherResponseLocation
  forecast: WeatherDay[]
}