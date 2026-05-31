import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import ActivitySelector from './components/ActivitySelector'
import ForecastGrid from './components/ForecastGrid'

import {useEffect, useState} from 'react'
import { getHealth, getWeatherForecast } from './api/backend'
import type { Location, WeatherForecast } from './types/forecast'

function App() {

  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast | null>(null)
  const [forecastLoading, setForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState("")
  const [backendStatus, setBackendStatus] = useState("Checking...")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

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
        <ActivitySelector />
      </section>

      <ForecastGrid 
        forecast={weatherForecast}
        loading={forecastLoading}
        error={forecastError}
      />
    </main>
  )
}

export default App