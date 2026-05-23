import Header from './components/Header'
import LocationSearch from './components/LocationSearch'
import ActivitySelector from './components/ActivitySelector'

function App() {
  return (
    <main className="app-shell">
      <Header />
    <section className="controls-panel">
      <LocationSearch />
      <ActivitySelector />
    </section>
    </main>
  )
}

export default App