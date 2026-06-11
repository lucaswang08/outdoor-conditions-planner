from models.advice import TripAdviceRequest, TripAdvice

def get_trip_advice(request: TripAdviceRequest) -> TripAdvice:
    return TripAdvice(
        summary="Enjoy your outdoor adventure!",
        gear=["Water bottle", "Layers", "Snacks"],
        expectations=["Conditions look manageable."],
        cautions=["Check conditions again before leaving."]
    )