from models.advice import TripAdviceRequest, TripAdvice
import json, os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

def get_trip_advice(request: TripAdviceRequest) -> TripAdvice:
    response = client.responses.parse(
        model=os.getenv("OPENAI_MODEL"),
        input=[
            {
                "role": "system",
                "content": "You give concise, practical outdoor trip advice based only on the provided activity, weather, and score data.",
            },
            {
                "role": "user",
                "content": json.dumps(request.model_dump()),
            },
        ],
        text_format=TripAdvice,
    )

    return response.output_parsed
