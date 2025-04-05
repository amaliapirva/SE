import json
import os

def load_data():
    """Încarcă datele despre restaurante din fișierul JSON."""
    path = os.path.join(os.path.dirname(__file__), "database/restaurants.json")
    with open(path, "r") as file:
        return json.load(file)

def filter_restaurants(user_preferences):
    """Filtrează restaurantele pe baza preferințelor utilizatorului."""
    restaurants = load_data()

    user_type = user_preferences.get("type")
    user_budget = user_preferences.get("budget")
    user_location = user_preferences.get("location")

    # Pas 1: filtrăm după tipul de mâncare
    if user_type:
        filtered = [r for r in restaurants if r["type"].lower() == user_type.lower()]
    else:
        filtered = restaurants  # Dacă nu e specificat tipul, le luăm pe toate

    # Pas 2: scorăm după buget și locație
    scored = []
    for r in filtered:
        score = 0
        if user_budget and r["budget"].lower() == user_budget.lower():
            score += 1
        if user_location:
    # Verificăm dacă user_location este în lista de locații ale restaurantului
            if isinstance(r["location"], list):
                if user_location.lower() in [loc.lower() for loc in r["location"]]:
                    score += 1
            else:
        # Pentru restaurantele care au o singură locație (string simplu)
                if r["location"].lower() == user_location.lower():
                    score += 1

        scored.append((score, r))

    # Sortăm descrescător după scor
    scored.sort(reverse=True, key=lambda x: x[0])

    # Returnăm doar restaurantele 
    return [{"restaurant": r[1], "score": r[0]} for r in scored]

