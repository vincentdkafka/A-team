from agno.agent import Agent
from agno.models.openai import OpenAIChat
from skyfield.api import load, Topos, Star
from skyfield.data import hipparcos
from geopy.geocoders import Nominatim
from datetime import datetime
import pytz
import math
import os

# --- Constants & Mappings ---

# --- Ayurvedic Extension Mappings ---

PLANET_DHATU = {
    "Sun": "Rakta",
    "Moon": "Rasa",
    "Mars": "Mamsa",
    "Mercury": "Majja",
    "Jupiter": "Meda",
    "Venus": "Shukra",
    "Saturn": "Asthi",
    "Rahu": "Vata",     # influences Majja + Prana
    "Ketu": "Pitta"     # influences Rakta/Agni
}

DHATU_SCORE_BASE = {
    "Rasa": 0, "Rakta": 0, "Mamsa": 0, "Meda": 0,
    "Asthi": 0, "Majja": 0, "Shukra": 0
}

AGNI_RULES = {
    "Fire": "Tikshna",
    "Air": "Vishama",
    "Water": "Manda",
    "Earth": "Manda",
    "Mixed": "Vishama"
}

ZODIAC_ELEMENT = {
    "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
    "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
    "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
    "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
}

# Srotas weighting
SROTAS = {
    "Pranavaha": ["Moon", "Mercury", "Air"],
    "Annavaha": ["Sun", "Mars"],
    "Rasavaha": ["Moon", "Venus"],
    "Raktavaha": ["Sun", "Mars"],
    "Mamsavaha": ["Mars", "Saturn"],
    "Medovaha": ["Jupiter", "Venus"],
    "Asthivaha": ["Saturn"],
    "Majjavaha": ["Moon", "Saturn"],
    "Shukravaha": ["Venus", "Mars"],
    "Mutravaha": ["Venus", "Moon"],
    "Purishavaha": ["Saturn"],
    "Swedavaha": ["Sun", "Mars"]
}


NAKSHATRA_DOSHA = {
    0: "Vata", 1: "Pitta", 2: "Kapha", 3: "Kapha", 4: "Pitta", 5: "Vata",
    6: "Vata", 7: "Pitta", 8: "Kapha", 9: "Kapha", 10: "Pitta", 11: "Vata",
    12: "Vata", 13: "Pitta", 14: "Kapha", 15: "Kapha", 16: "Pitta", 17: "Vata",
    18: "Vata", 19: "Pitta", 20: "Kapha", 21: "Kapha", 22: "Pitta", 23: "Vata",
    24: "Vata", 25: "Pitta", 26: "Kapha"
}

NAKSHATRA_NAMES = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
]

ZODIAC_NAMES = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

ZODIAC_DOSHA = {
    "Aries": "Pitta", "Leo": "Pitta", "Sagittarius": "Pitta",
    "Gemini": "Vata", "Libra": "Vata", "Aquarius": "Vata",
    "Taurus": "Kapha", "Cancer": "Kapha", "Pisces": "Kapha",
    "Capricorn": "Vata-Kapha", # Mixed
    "Virgo": "Vata-Kapha", # Mixed
    "Scorpio": "Kapha-Pitta" # Mixed
}

WEEKDAY_DOSHA = {
    0: "Kapha", 1: "Pitta", 2: "Vata", 3: "Kapha", 4: "Kapha", 5: "Vata", 6: "Pitta"
}

# --- Helper Functions ---

def ayurvedic_constructs(lagna_sign, moon_sign, nakshatra_name, dosha_scores):
    """Computes Agni, Ama, Dhatu strength, Srotas sensitivity, Prana, Ojas, Nadi"""
    
    # --- AGNI ---
    moon_element = ZODIAC_ELEMENT.get(moon_sign, "Mixed")
    agni = AGNI_RULES[moon_element]
    
    # --- AMA (Vata + Moon weakness + Saturn dominance) ---
    ama_score = 0
    if dosha_scores['Vata'] > 0.45: ama_score += 30
    if moon_element == "Air": ama_score += 30
    if "Saturn" in [lagna_sign, moon_sign]: 
        ama_score += 20
    ama_level = "High" if ama_score > 60 else "Moderate" if ama_score > 30 else "Low"
    
    # --- DHATU Strength ---
    dhatus = DHATU_SCORE_BASE.copy()
    
    # Moon → Rasa
    dhatus["Rasa"] += 1 if moon_element == "Water" else 0
    dhatus["Majja"] += 1 if moon_element == "Air" else 0
    
    # Saturn → Asthi, Majja
    if ZODIAC_ELEMENT[lagna_sign] == "Earth":
        dhatus["Asthi"] += 2
    if moon_element == "Air":
        dhatus["Majja"] += 2
    
    # Jupiter → Meda
    if lagna_sign in ["Pisces", "Sagittarius"]:
        dhatus["Meda"] += 2
    
    # Mars → Rakta/Mamsa
    if moon_sign in ["Aries", "Scorpio"]:
        dhatus["Rakta"] += 1
        dhatus["Mamsa"] += 1
    
    # Normalize dhatu strengths
    max_dhatu = max(dhatus.values())
    dhatu_strength = {k: round((v/max_dhatu)*100) for k, v in dhatus.items()}
    
    # --- SROTAS ---
    srotas_result = {}
    for srotas, influences in SROTAS.items():
        score = 0
        if moon_element in influences: score += 1
        if ZODIAC_ELEMENT[lagna_sign] in influences: score += 1
        if "Saturn" in influences and moon_element == "Air": score += 1
        srotas_result[srotas] = ["Weak","Moderate","Strong"][min(score,2)]
    
    # --- PRANA SHAKTI ---
    prana = int( (dosha_scores['Vata']*60) + (dosha_scores['Pitta']*20) + 30 )
    if prana > 100: prana = 100
    
    # --- OJAS ---
    ojas = int( (dhatu_strength["Meda"]*0.4) + (dhatu_strength["Rasa"]*0.3) + (dhatu_strength["Majja"]*0.3) )
    
    # --- NADI ---
    if dosha_scores['Vata'] > dosha_scores['Pitta'] and dosha_scores['Vata'] > dosha_scores['Kapha']:
        nadi = "Vata Nadi"
    elif dosha_scores['Pitta'] > dosha_scores['Kapha']:
        nadi = "Pitta Nadi"
    else:
        nadi = "Kapha Nadi"
    
    return {
        "Agni": agni,
        "Ama": ama_level,
        "Dhatu": dhatu_strength,
        "Srotas": srotas_result,
        "Prana_Shakti": prana,
        "Ojas": ojas,
        "Nadi": nadi
    }


def get_ayanamsa(t):
    """Calculates Lahiri Ayanamsa (Approximate)."""
    # Base: 23 deg 51 min 11 sec at 2000 Jan 1 12:00 TT
    # Rate: 50.27 arcsec per year (Precession)
    # But Lahiri is fixed star.
    # Ayanamsa ~ 23.85 + (t.J - 2000.0) * 0.0139 (degrees)
    # This is a rough approximation.
    # Better: Use Skyfield to find position of Spica (Chitra) and offset?
    # Standard Lahiri: Spica is at 180 deg 0 min 0 sec.
    # Let's use a simple linear approximation for now.
    # 1993 is close to 2000.
    # Ayanamsa(2000) = 23.86 deg
    # Speed = 0.0139 deg/year
    year = t.utc.year
    return 23.86 + (year - 2000) * 0.0139

def normalize_angle(angle):
    """Normalizes angle to 0-360."""
    return angle % 360

def get_zodiac_sign(lon):
    """Returns Zodiac sign name from longitude."""
    index = int(lon / 30)
    return ZODIAC_NAMES[index % 12]

def get_nakshatra(lon):
    """Returns Nakshatra index and name from longitude."""
    index = int(lon / (360 / 27))
    return index, NAKSHATRA_NAMES[index % 27]

def calculate_ascendant(t, lat, lon):
    """
    Calculates the Ascendant (Lagna) longitude.
    Uses a simplified formula for Tropical Ascendant, then converts to Sidereal.
    """
    # Local Sidereal Time (degrees)
    # Skyfield doesn't give LST directly in degrees easily, but we can get GMST and add longitude.
    # t.gast is Greenwich Apparent Sidereal Time in hours.
    gast = t.gast
    lst = (gast * 15 + lon) % 360
    
    # Obliquity of Ecliptic (approx 23.44)
    eps = 23.44
    eps_rad = math.radians(eps)
    lst_rad = math.radians(lst)
    lat_rad = math.radians(lat)
    
    # Formula for Ascendant
    # tan(Asc) = -cos(LST) / (sin(LST)*cos(eps) + tan(lat)*sin(eps))
    # We use atan2(y, x)
    y = -math.cos(lst_rad)
    x = math.sin(lst_rad) * math.cos(eps_rad) + math.tan(lat_rad) * math.sin(eps_rad)
    
    asc_rad = math.atan2(y, x)
    asc_deg = math.degrees(asc_rad)
    
    return normalize_angle(asc_deg)

def get_coordinates(city_name):
    """Gets latitude and longitude for a city."""
    geolocator = Nominatim(user_agent="astro_agent_v2")
    location = geolocator.geocode(city_name)
    if location:
        return location.latitude, location.longitude
    return None, None

def calculate_dosha(birth_date: str, birth_time: str, city: str):
    """
    Calculates the Ayurvedic Dosha based on birth details.
    
    Args:
        birth_date (str): Birth date in "DD-MM-YYYY" format.
        birth_time (str): Birth time in "HH:MM AM/PM" format.
        city (str): Birth city.
    """
    try:
        # 1. Setup Skyfield
        ts = load.timescale()
        eph = load('de421.bsp')
        earth = eph['earth']
        moon = eph['moon']
        
        # 2. Parse Input
        dt_str = f"{birth_date} {birth_time}"
        # Assume input is local time. We need to convert to UTC for Skyfield.
        # We'll assume a timezone based on coordinates or default to India (+5.5) for the example.
        # Ideally, use timezonefinder.
        dt_obj = datetime.strptime(dt_str, "%d-%m-%Y %I:%M %p")
        
        # Get Coords
        lat, lon = get_coordinates(city)
        if not lat:
            return f"Could not find coordinates for city: {city}"
            
        # Timezone Handling (Simplified)
        # If lat/lon in India (approx), use IST. Else UTC?
        # For robustness, let's assume the user provides local time and we subtract 5.5h if in India.
        # Or just use pytz if we knew the timezone.
        # Hack: For "Patna", it's IST.
        offset_hours = 5.5 # Default to IST
        
        # Create Skyfield Time object (UTC)
        # Local - Offset = UTC
        # We construct a datetime with timezone info
        # But Skyfield takes UTC datetime usually.
        # Let's manually adjust.
        dt_utc = dt_obj # Placeholder
        # Subtract offset
        # We'll assume the input is +5.5 UTC
        from datetime import timedelta
        dt_utc = dt_obj - timedelta(hours=offset_hours)
        
        t = ts.utc(dt_utc.year, dt_utc.month, dt_utc.day, dt_utc.hour, dt_utc.minute)
        
        # 3. Calculate Positions (Tropical)
        
        # Moon
        astrometric = earth.at(t).observe(moon)
        apparent = astrometric.apparent()
        lat_moon, lon_moon, dist_moon = apparent.ecliptic_latlon()
        lon_moon_deg = lon_moon.degrees
        
        # Ascendant (Tropical)
        asc_tropical = calculate_ascendant(t, lat, lon)
        
        # 4. Convert to Sidereal (Lahiri)
        ayanamsa = get_ayanamsa(t)
        
        moon_sidereal = normalize_angle(lon_moon_deg - ayanamsa)
        asc_sidereal = normalize_angle(asc_tropical - ayanamsa)
        
        # 5. Determine Signs and Nakshatras
        lagna_sign = get_zodiac_sign(asc_sidereal)
        moon_sign = get_zodiac_sign(moon_sidereal)
        nakshatra_idx, nakshatra_name = get_nakshatra(moon_sidereal)
        
        # Weekday
        weekday_idx = dt_obj.weekday()
        
        # 6. Map to Doshas
        lagna_dosha = ZODIAC_DOSHA.get(lagna_sign, "Mixed")
        moon_sign_dosha = ZODIAC_DOSHA.get(moon_sign, "Mixed")
        nakshatra_dosha = NAKSHATRA_DOSHA.get(nakshatra_idx, "Mixed")
        weekday_dosha = WEEKDAY_DOSHA.get(weekday_idx, "Mixed")
        
        # 7. Scoring
        scores = {"Vata": 0.0, "Pitta": 0.0, "Kapha": 0.0}
        
        def add_score(dosha, weight):
            if dosha == "Mixed":
                pass
            elif "-" in dosha:
                parts = dosha.split("-")
                for part in parts:
                    scores[part] += weight / len(parts)
            else:
                scores[dosha] += weight

        add_score(lagna_dosha, 0.4)
        add_score(moon_sign_dosha, 0.3)
        add_score(nakshatra_dosha, 0.2)
        add_score(weekday_dosha, 0.1)
        
        total = sum(scores.values())
        if total > 0:
            vata_pct = (scores["Vata"] / total) * 100
            pitta_pct = (scores["Pitta"] / total) * 100
            kapha_pct = (scores["Kapha"] / total) * 100
        else:
            vata_pct = pitta_pct = kapha_pct = 0
            
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        dominant = sorted_scores[0][0]
        
        constructs = ayurvedic_constructs(
            lagna_sign, moon_sign, nakshatra_name,
            {"Vata": scores["Vata"], "Pitta": scores["Pitta"], "Kapha": scores["Kapha"]}
        )
        # 8. Output
        result = f"""
### Ayurvedic Dosha Analysis

**Birth Details:**
- Date: {birth_date}
- Time: {birth_time}
- City: {city} (Lat: {lat:.2f}, Lon: {lon:.2f})

**Astrological Factors (Sidereal):**
1. **Lagna (Ascendant):** {lagna_sign} ({lagna_dosha}) [Lon: {asc_sidereal:.2f}]
2. **Moon Sign:** {moon_sign} ({moon_sign_dosha}) [Lon: {moon_sidereal:.2f}]
3. **Nakshatra:** {nakshatra_name} ({nakshatra_dosha})
4. **Weekday:** {dt_obj.strftime('%A')} ({weekday_dosha})

**Dosha Scores:**
- **Vata:** {vata_pct:.1f}%
- **Pitta:** {pitta_pct:.1f}%
- **Kapha:** {kapha_pct:.1f}%

**Conclusion:**
Your Prakriti tendency is **{dominant}** dominant.
"""

        result += f"""
        ### Extended Ayurvedic Constructs

        **Agni (Metabolism):** {constructs['Agni']}
        **Ama Level:** {constructs['Ama']}
        **Nadi Type:** {constructs['Nadi']}

        **Prana Shakti Score:** {constructs['Prana_Shakti']} / 100
        **Ojas Strength:** {constructs['Ojas']} / 100

        **Dhatu Strength Levels:**
        {constructs['Dhatu']}

        **Srotas Sensitivity:**
        {constructs['Srotas']}
        """
        return result

    except Exception as e:
        return f"Error calculating Dosha: {str(e)}"

# --- Agent Definition ---

agent = Agent(
    name="Agno Astrologer",
    model=OpenAIChat(
        id="google/gemini-2.5-flash",
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
    ),
    tools=[calculate_dosha],
    instructions="""
    You are an expert Ayurvedic Astrologer.
    Your goal is to calculate the user's Dosha (Vata, Pitta, Kapha) based on their birth details.
    
    Follow these steps:
    1. Ask for the user's Birth Date, Time, and City if not provided.
    2. Use the `calculate_dosha` tool to perform the calculation.
    3. Present the results clearly, explaining the factors (Lagna, Moon, Nakshatra) and how they contribute to the Dosha.
    4. Provide a brief behavioral cross-check based on the dominant Dosha.
    
    Use the specific logic provided:
    - Lagna (40% weight)
    - Moon Sign (30% weight)
    - Nakshatra (20% weight)
    - Weekday (10% weight)
    
    Be empathetic and insightful.
    """,
    markdown=True
)

if __name__ == "__main__":
    # Example usage
    print("--- Testing Agno Astrologer Agent ---")
    agent.print_response("Calculate dosha for 26-01-1993, 7:53 AM, Patna, Bihar", stream=True)
