import requests
from dotenv import load_dotenv
import os
load_dotenv()
PRISM_KEY = os.getenv("PRISM_KEY")

HEADERS = {"X-API-Key": PRISM_KEY}
BASE = "https://api.prismapi.ai"

def get_price(symbol="BTC"):
    r = requests.get(f"{BASE}/crypto/price/{symbol}", headers=HEADERS, timeout=10)
    return r.json()

def get_market_overview():
    r = requests.get(f"{BASE}/market/overview", headers=HEADERS, timeout=10)
    return r.json()

def get_fear_greed():
    r = requests.get(f"{BASE}/market/fear-greed", headers=HEADERS, timeout=10)
    return r.json()

def get_price_history(symbol="BTC"):
    r = requests.get(f"{BASE}/assets/{symbol}/prices?interval=1h&limit=24", headers=HEADERS, timeout=10)
    return r.json()

if __name__ == "__main__":
    print("--- BTC PRICE ---")
    print(get_price())

    print("\n--- FEAR & GREED ---")
    print(get_fear_greed())

    print("\n--- PRICE HISTORY (last 24 candles) ---")
    print(get_price_history())