from pydantic import BaseModel

class TripAdviceRequest(BaseModel):
    activity: str
    date: str
    weather: dict
    score: dict

class TripAdvice(BaseModel):
    summary: str
    gear: list[str]
    expectations: list[str]
    cautions: list[str]
