import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import ActivitySelector from './components/ActivitySelector'
import ForecastGrid from './components/ForecastGrid'

import {useEffect, useState} from 'react'
import { getHealth, getWeatherForecast } from './api/backend'
import type { Location, WeatherForecast, Activity } from './types/forecast'

function App() {

  const DEFAULT_LOCATION: Location = {
    name: "Vancouver",
    region: "British Columbia",
    country: "Canada",
    latitude: 49.2827,
    longitude: -123.1207,
  }

  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null)
  const [forecastLoading, setForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState("")
  const [backendStatus, setBackendStatus] = useState("Checking...")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(DEFAULT_LOCATION)
  const [selectedActivity, setSelectedActivity] = useState<Activity>("hiking")

  useEffect(() => {
    getHealth()
      .then((data) => {
        setBackendStatus(data.status)
      })
      .catch(() => {
        setBackendStatus("offline")
      })
  }, [])

  useEffect(() => {
    if (!selectedLocation) return

    const location = selectedLocation

    async function loadForecast() {
      setForecastLoading(true)
      setForecastError("")

      try {
        const data = await getWeatherForecast(
          location.latitude,
          location.longitude
        )
        setWeatherForecast(data)
      } catch {
        setForecastError("Failed to load forecast")
      } finally {
        setForecastLoading(false)
      }
    }

    loadForecast()
  }, [selectedLocation])

  return (
    <main className="app-shell">
      <Header />

      <p>Backend Status: {backendStatus}</p>

      <section className="controls-panel">
        <LocationSearch onSelectLocation={setSelectedLocation} />
        <ActivitySelector 
          selectedActivity={selectedActivity}
          onSelectActivity={setSelectedActivity}
        />
      </section>

      <ForecastGrid 
        forecast={weatherForecast}
        loading={forecastLoading}
        error={forecastError}
        selectedActivity={selectedActivity}
      />
    </main>
  )
}

export default App