import httpx

GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"

def fetch_geocode(query: str):
  params = {
    "name": query,
    "count": 7,
    "language": "en",
    "format": "json",
    "countryCode": "CA"
  }
  response = httpx.get(GEOCODING_URL, params=params, timeout=10)
  response.raise_for_status()
  return response.json()

def search_location(query: str):
  data = fetch_geocode(query)
  results = []
  if not data or "results" not in data:
    return results
  for item in data["results"]:
    results.append({
      "name": item["name"],
      "region": item["admin1"],
      "country": item["country"],
      "latitude": item["latitude"],
      "longitude": item["longitude"],
    })
  return results