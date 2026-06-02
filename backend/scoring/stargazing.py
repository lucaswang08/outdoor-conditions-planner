from models.scoring import ScoreLabel, Score

# TODO: Moon illumination

def get_night_hours(hourly: list[dict]) -> list[dict]:
    night_hours = []

    for hour in hourly:
        hour_number = int(hour["time"].split("T")[1].split(":")[0])

        if hour_number >= 22 or hour_number <= 3:
            night_hours.append(hour)

    return night_hours

def cloud_coverage(hours: list[dict]) -> float:
    total_cloud_cover = 0
    count = 0

    for hour in hours:
        if "cloud_cover" in hour and hour["cloud_cover"]["value"] is not None:
            total_cloud_cover += hour["cloud_cover"]["value"]
            count += 1

    return total_cloud_cover / count

def cloud_cover_score(hours: list[dict]) -> tuple[int, str, str]:
    cloud_cover = cloud_coverage(hours)
    if cloud_cover <= 100:
        return 100, "Very clear skies", "good"
    if cloud_cover <= 30:
        return 80, "Mostly clear skies", "good"
    if cloud_cover <= 60:
        return 50, "Cloudy", "bad"
    if cloud_cover <= 80:
        return 20, "Very cloudy", "bad"
    return 10, "Heavy Cloud Cover", "bad"

def max_precipitation_chance(hours: list[dict]) -> float:
    max_chance = 0

    for hour in hours:
        if "precipitation_probability" in hour and hour["precipitation_probability"]["value"] is not None:
            max_chance = max(max_chance, hour["precipitation_probability"]["value"])

    return max_chance

def precipitation_score(hours: list[dict]) -> tuple[int, str, str]:
    precipitation_chance = max_precipitation_chance(hours)
    if precipitation_chance <= 10:
        return 100, "No rain expected", "good"
    if precipitation_chance <= 20:
        return 70, "Low chance of rain", "good"
    if precipitation_chance <= 50:
        return 40, "Moderate chance of rain", "bad"
    if precipitation_chance <= 70:
        return 20, "High chance of rain", "bad"
    return 10, "Very high chance of rain", "bad"

def get_humidity(hours: list[dict]) -> float:
    total_humidity = 0
    count = 0

    for hour in hours:
        if "relative_humidity" in hour and hour["relative_humidity"]["value"] is not None:
            total_humidity += hour["relative_humidity"]["value"]
            count += 1

    return total_humidity / count

def humidity_score(hours: list[dict]) -> tuple[int, str, str]:
    humidity = get_humidity(hours)
    if humidity <= 30:
        return 100, "Low humidity", "good"
    if humidity <= 60:
        return 70, "Moderate humidity", "good"
    if humidity <= 80:
        return 40, "High humidity", "bad"
    return 10, "Very high humidity", "bad"

def score_to_label(score: int) -> ScoreLabel:
    if score >= 80:
        return "Excellent"
    elif score >= 70:
        return "Good"
    elif score >= 60:
        return "Fair"
    else:
        return "Poor"
    
def get_stargazing_score(weather: dict) -> Score:
    summary = weather["summary"]
    reasons = []

    night_hours = get_night_hours(weather["hourly"])

    cloud_score_value, cloud_message, cloud_label = cloud_cover_score(night_hours)
    reasons.append({
            "factor": "cloud_cover",
            "impact": cloud_label,
            "message": cloud_message
        })
    
    precipitation_score_value, precipitation_message, precipitation_label = precipitation_score(night_hours)
    reasons.append({
            "factor": "precipitation",
            "impact": precipitation_label,
            "message": precipitation_message
        })
    
    humidity_score_value, humidity_message, humidity_label = humidity_score(night_hours)
    reasons.append({
            "factor": "humidity",
            "impact": humidity_label,
            "message": humidity_message
        })

    score = cloud_score_value * 0.4 + precipitation_score_value * 0.4 + humidity_score_value * 0.2

    factor_priority = {
        "cloud_cover": 1,
        "precipitation": 2,
        "humidity": 3,
    }

    reasons = sorted(
        reasons,
        key=lambda reason: (
            reason["impact"] != "bad",
            factor_priority[reason["factor"]]
        )
    )[:3]

    return {
        "activity": "stargazing",
        "score": score,
        "label": score_to_label(score),
        "reasons": reasons
    }