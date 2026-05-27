import type { Location } from "../types/forecast";

const API_BASE_URL = "http://localhost:8000";

export async function getHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("Failed to connect");
  }
  return response.json();
}

export async function searchLocation(query: string): Promise<Location[]> {
  const response = await fetch(`${API_BASE_URL}/api/geocode?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Failed to search location");
  }
  const data = await response.json();
  return data.results;
}