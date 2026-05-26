import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import ActivitySelector from './components/ActivitySelector'
import ForecastGrid from './components/ForecastGrid'

import {useEffect, useState} from 'react'
import { getHealth } from './api/backend'

function App() {

  const [backendStatus, setBackendStatus] = useState("Checking...")

  useEffect(() => {
    getHealth()
      .then((data) => {
        setBackendStatus(data.status)
      })
      .catch(() => {
        setBackendStatus("offline")
      })
  }, [])

  return (
    <main className="app-shell">
      <Header />
      <p>Backend Status: {backendStatus}</p>
    <section className="controls-panel">
      <LocationSearch />
      <ActivitySelector />
    </section>
      <ForecastGrid />
    </main>
  )
}

export default App