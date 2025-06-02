import sqlite3
import os

def get_connection():
    db_path = os.path.join(os.path.dirname(__file__), "database/restaurants.db")
    return sqlite3.connect(db_path)

def filter_restaurants(user_preferences):
    """Filtrează restaurantele pe baza preferințelor utilizatorului folosind SQLite."""
    user_type = user_preferences.get("type", "").lower()
    user_budget = user_preferences.get("budget", "").lower()
    user_location = user_preferences.get("location", "").lower()

    conn = get_connection()
    cursor = conn.cursor()

    # Selectăm toate restaurantele și le procesăm manual pentru scoruri
    cursor.execute("SELECT name, type, budget, location, images, url FROM restaurants")
    rows = cursor.fetchall()
    conn.close()

    results = []

    for row in rows:
        name, type_, budget, location, images, url = row
        score = 0

        if user_type and type_.lower() == user_type:
            score += 1
        if user_budget and budget.lower() == user_budget:
            score += 1
        if user_location:
            loc_list = [l.strip().lower() for l in location.split(",")]
            if user_location in loc_list:
                score += 1

        if user_type == "" or type_.lower() == user_type:
            results.append((
                score,
                {
                    "name": name,
                    "type": type_,
                    "budget": budget,
                    "location": location,
                    "images": images,
                    "url": url
                }
            ))

    results.sort(reverse=True, key=lambda x: x[0])
    return [{"restaurant": r[1], "score": r[0]} for r in results]
