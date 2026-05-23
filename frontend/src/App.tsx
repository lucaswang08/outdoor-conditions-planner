import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import ActivitySelector from './components/ActivitySelector'
import ForecastGrid from './components/ForecastGrid'

function App() {
  return (
    <main className="app-shell">
      <Header />
    <section className="controls-panel">
      <LocationSearch />
      <ActivitySelector />
    </section>
      <ForecastGrid />
    </main>
  )
}

export default App