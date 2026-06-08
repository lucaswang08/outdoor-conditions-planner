from pydantic import BaseModel
from models.scoring import Score

class Location(BaseModel):
    latitude: float
    longitude: float
    timezone: str

class DailyTemperature(BaseModel):
    min: float
    max: float
    apparent_max: float
    unit: str

class TemperatureValue(BaseModel):
    value: float
    unit: str

class PercentageValue(BaseModel):
    value: float
    unit: str

class AmountValue(BaseModel):
    value: float
    unit: str

class SpeedValue(BaseModel):
    value: float
    unit: str

class DistanceValue(BaseModel):
    value: float
    unit: str

class DailySummary(BaseModel):
    temperature: DailyTemperature
    precipitation_sum: AmountValue
    snowfall_sum: AmountValue
    precipitation_probability_max: PercentageValue
    wind_speed_max: SpeedValue
    wind_gust_max: SpeedValue
    weather_code: int
    sunrise: str
    sunset: str
    daylight_duration: float

class HourlyConditions(BaseModel):
    time: str
    temperature: TemperatureValue
    apparent_temperature: TemperatureValue
    precipitation: AmountValue
    precipitation_probability: PercentageValue
    snowfall: AmountValue
    snow_depth: AmountValue
    cloud_cover: PercentageValue
    cloud_cover_low: PercentageValue
    cloud_cover_mid: PercentageValue
    cloud_cover_high: PercentageValue
    visibility: DistanceValue
    wind_speed: SpeedValue
    wind_gust: SpeedValue
    relative_humidity: PercentageValue
    weather_code: int
    
class WeatherDay(BaseModel):
    date: str
    summary: DailySummary
    hourly: list[HourlyConditions]
    scores: list[Score]

class WeatherForecast(BaseModel):
    location: Location
    forecast: list[WeatherDay]