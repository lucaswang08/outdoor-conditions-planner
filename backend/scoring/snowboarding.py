from models.scoring import ScoreLabel, Score

#TODO: Wind, precipitation, visibility, etc.

def snowfall_score(snowfall_cm: float) -> tuple[int, str, str]:
    if snowfall_cm >= 20:
        return 100, "Fresh powder expected", "good"
    if snowfall_cm >= 10:
        return 85, "Good new snowfall", "good"
    if snowfall_cm >= 3:
        return 65, "Light new snow", "good"
    if snowfall_cm > 0:
        return 40, "Minimal new snow", "neutral"
    return 25, "No new snow expected", "bad"

def max_snow_depth(hourly: list[dict]) -> float:
    values = []

    for hour in hourly:
        value = hour["snow_depth"]["value"]
        if value is not None:
            values.append(value)

    if not values:
        return 0

    return max(values)

def snow_depth_score(snow_depth_m: float) -> tuple[int, str, str]:
    if snow_depth_m >= 1.0:
        return 100, "Deep snow base", "good"
    if snow_depth_m >= 0.5:
        return 80, "Solid snow base", "good"
    if snow_depth_m >= 0.2:
        return 50, "Thin snow base", "neutral"
    return 10, "Limited snow base", "bad"

def temperature_score(max_temperature: float) -> tuple[int, str, str]:
    if -8 <= max_temperature <= -1:
        return 100, "Ideal snow temperature", "good"
    if -15 <= max_temperature < -8:
        return 80, "Slightly cold", "good"
    if -1 < max_temperature <= 2:
        return 70, "Near-freezing conditions", "neutral"
    if 2 < max_temperature <= 6:
        return 40, "Warmer conditions", "bad"
    if max_temperature > 6:
        return 15, "Too warm", "bad"
    return 40, "Very cold conditions", "bad"

def score_to_label(score: int) -> ScoreLabel:
    if score >= 80:
        return "Excellent"
    elif score >= 70:
        return "Good"
    elif score >= 60:
        return "Fair"
    else:
        return "Poor"

def get_snowboarding_score(weather: dict) -> Score:
    summary = weather["summary"]
    snow_depth_m = max_snow_depth(weather["hourly"])
    temperature = weather["summary"]["temperature"]["apparent_max"]

    reasons = []

    score, message, impact = snowfall_score(weather["summary"]["snowfall_sum"]["value"])

    reasons.append({
        "factor": "snowfall",
        "impact": impact,
        "message": message
    })

    snow_depth_score_value, snow_depth_message, snow_depth_impact = snow_depth_score(snow_depth_m)
    reasons.append({
        "factor": "snow_depth",
        "impact": snow_depth_impact,
        "message": snow_depth_message
    })

    temperature_score_value, temperature_message, temperature_impact = temperature_score(temperature)
    reasons.append({
        "factor": "temperature",
        "impact": temperature_impact,
        "message": temperature_message
    })
    
    factor_priority = {
        "snowfall": 1,
        "snow_depth": 2,
        "temperature": 3
    }

    reasons = sorted(
        reasons,
        key=lambda reason: (
            reason["impact"] != "bad",
            factor_priority[reason["factor"]]
        )
    )[:3]

    score = round(score * 0.4 + snow_depth_score_value * 0.4 + temperature_score_value * 0.2)

    return {
        "activity": "snowboarding",
        "score": score,
        "label": score_to_label(score),
        "reasons": reasons
    }
