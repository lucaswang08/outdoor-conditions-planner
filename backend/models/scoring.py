from typing import Literal
from pydantic import BaseModel

Activity = Literal["hiking", "snowboarding", "stargazing"]

ScoreLabel = Literal["Excellent", "Good", "Fair", "Poor"]

Impact = Literal["good", "bad", "neutral"]

class Reason(BaseModel):
    factor: str
    impact: Impact
    message: str

class Score(BaseModel):
    activity: Activity
    score: int
    label: ScoreLabel
    reasons: list[Reason]