function LocationSearch() {
  return (
    <div className='location-search'>
      <input 
        className='location-input'
        type="text" 
        placeholder="Enter location" 
      />
      <button className='search-button'>Search</button>
    </div>
  )
}   

export default LocationSearch;