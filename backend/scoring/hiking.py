from models.scoring import ScoreLabel, Score

def precipitation_score(precipitation_chance: float) -> tuple[int, str, str]:
    if precipitation_chance <= 10:
        return 100, "No rain expected", "good"
    if precipitation_chance <= 30:
        return 80, "Low chance of rain", "good"
    if precipitation_chance <= 50:
        return 40, "Moderate chance of rain", "bad"
    if precipitation_chance <= 70:
        return 20, "High chance of rain", "bad"
    return 10, "High chance of rain", "bad"

def temperature_score(max_temperature: float) -> tuple[int, str, str]:
    if 10 <= max_temperature <= 20:
        return 100, "Perfect temperature", "good"
    if 5 <= max_temperature < 10:
        return 80, "Moderate temperature", "good"
    if 20 < max_temperature <= 25:
        return 80, "Moderate temperature", "good"
    if 0 <= max_temperature < 5:
        return 50, "Cold temperatures", "bad"
    if 25 < max_temperature <= 30:
        return 50, "Hot temperatures", "bad"
    if -5 <= max_temperature < 0:
        return 30, "Very cold temperatures", "bad"
    if 30 < max_temperature <= 35:
        return 30, "Very hot temperatures", "bad"
    if max_temperature < -5:
        return 10, "Extremely cold temperatures", "bad"
    return 10, "Extremely hot temperatures", "bad"

def wind_score(max_wind_speed: float) -> tuple[int, str, str]:
    if max_wind_speed <= 15:
        return 100, "Ideal wind speed","good"
    if max_wind_speed <= 30:
        return 80, "Light winds", "good"
    if max_wind_speed <= 40:
        return 50, "Moderate winds", "bad"
    if max_wind_speed <= 55:
        return 30, "Strong winds", "bad"
    return 10, "Very strong winds", "bad"
    
def daylight_score(daylight_duration: float) -> tuple[int, str, str]:
    if daylight_duration >= 12:
        return 100, "Plenty of daylight", "good"
    if daylight_duration >= 10:
        return 80, "Moderate daylight", "good"
    if daylight_duration >= 8:
        return 50, "Limited daylight", "bad"
    if daylight_duration >= 6:
        return 30, "Very limited daylight", "bad"
    return 10, "Extremely limited daylight", "bad"

def score_to_label(score: int) -> ScoreLabel:
    if score >= 80:
        return "Excellent"
    elif score >= 70:
        return "Good"
    elif score >= 60:
        return "Fair"
    else:
        return "Poor"

def get_hiking_score(weather: dict) -> Score:
    summary = weather["summary"]
    reasons = []

    rain_score, rain_message,rain_label = precipitation_score(summary["precipitation_probability_max"]["value"])
    reasons.append({
            "factor": "precipitation",
            "impact": rain_label,
            "message": rain_message
        })
    
    temp_score, temp_message, temp_label = temperature_score(summary["temperature"]["apparent_max"])
    reasons.append({
            "factor": "temperature",
            "impact": "good" if temp_label == "ideal" else "bad",
            "message": temp_message
        })
    
    wind_score_value, wind_message, wind_label = wind_score(summary["wind_speed_max"]["value"])
    reasons.append({
            "factor": "wind_speed",
            "impact": wind_label,
            "message": wind_message
        })
    
    daylight_score_value, daylight_message, daylight_label = daylight_score(summary["daylight_duration"] / 3600)
    reasons.append({
            "factor": "daylight_duration",
            "impact": daylight_label,
            "message": daylight_message
        })
    
    score = round(rain_score * 0.4 + temp_score * 0.3 + wind_score_value * 0.2 + daylight_score_value * 0.1)

    if rain_score <= 30:
        score = max(0, score - 20)

    factor_priority = {
        "precipitation": 1,
        "temperature": 2,
        "wind_speed": 3,
        "daylight_duration": 4,
    }

    reasons = sorted(
        reasons,
        key=lambda reason: (
            reason["impact"] != "bad",
            factor_priority[reason["factor"]]
        )
    )[:3]

    return {
        "activity": "hiking",
        "score": score,
        "label": score_to_label(score),
        "reasons": reasons
    }