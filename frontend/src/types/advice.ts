import type { Activity, DailyForecast, Score } from "./forecast"

export type TripAdviceRequest = {
    activity: Activity
    date: string
    weather: DailyForecast
    score: Score
}

export type TripAdvice = {
    summary: string
    gear: string[]
    expectations: string[]
    cautions: string[]
}