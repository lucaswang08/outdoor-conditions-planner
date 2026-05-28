from pydantic import BaseModel

class Location(BaseModel):
    latitude: float
    longitude: float
    timezone: str

class DailyTemperature(BaseModel):
    min: float
    max: float
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
    daylight_hours: float

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
    weather_code: int
    
class WeatherDay(BaseModel):
    date: str
    summary: DailySummary
    hourly: list[HourlyConditions]

class WeatherForecast(BaseModel):
    location: Location
    forecast: list[WeatherDay]