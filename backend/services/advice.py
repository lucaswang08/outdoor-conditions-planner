from models.advice import TripAdviceRequest, TripAdvice
import json, os
from dotenv import load_dotenv
from openai import OpenAI

def get_trip_advice(request: TripAdviceRequest) -> TripAdvice:
    load_dotenv()
    client = OpenAI()
    
    return TripAdvice(
        summary="Enjoy your outdoor adventure!",
        gear=["Water bottle", "Layers", "Snacks"],
        expectations=["Conditions look manageable."],
        cautions=["Check conditions again before leaving."]
    )