import { useState } from 'react';
import { searchLocation } from '../api/backend';
import type { Location } from '../types/forecast';

type LocationSearchProps = {
  onSelectLocation: (location: Location) => void;
}

function LocationSearch({ onSelectLocation }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSearch() {
    if (query.trim()) {
      setLoading(true);
      setError("");
      try {
        const locations = await searchLocation(query);
        setResults(locations);
      } catch {
        setError("Failed to search location");
      } finally {
        setLoading(false);
      }
    }
  }

  function handleSelectLocation(location: Location) {
    onSelectLocation(location);
    setQuery(location.name);
    setResults([]);
  }

  return (
    <div className='location-search-wrapper'>
      <div className = 'location-search'>
        <input 
          className='location-input'
          type="text" 
          placeholder="Enter city, trailhead, resort, or viewpoint"
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button 
          className='search-button'
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className='search-error'>{error}</p>}

      {results.length > 0 && (
        <div className="location-results">
          {results.map((location) => (
            <button
              key={`${location.name}-${location.latitude}-${location.longitude}`}
              className="location-result"
              onClick={() => handleSelectLocation(location)}
            >
              <strong>{location.name}</strong>
              <span>
                {location.region}, {location.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}   

export default LocationSearch;