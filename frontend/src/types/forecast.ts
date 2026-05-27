export type Activity = "hiking" | "snowboarding" | "stargazing"

export type ForecastLabel = "Excellent" | "Good" | "Fair" | "Poor"

export type Location = {
  name: string
  region: string
  country: string
  latitude: number
  longitude: number
}

export type ForecastDay = {
  id: number
  day: string
  date: string
  weather: string
  score: number
  label: ForecastLabel
  temperature: string
  reasons: string[]
}