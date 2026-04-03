import json
import os
from datetime import datetime

PAPER_FILE = "paper_trades.json"
STARTING_BALANCE = 1000.0  # fake USD

def load_portfolio():
    if os.path.exists(PAPER_FILE):
        with open(PAPER_FILE, "r") as f:
            return json.load(f)
    return {
        "usd": STARTING_BALANCE,
        "btc": 0.0,
        "trades": []
    }

def save_portfolio(portfolio):
    with open(PAPER_FILE, "w") as f:
        json.dump(portfolio, f, indent=2)

def get_balance():
    p = load_portfolio()
    return {"USD": p["usd"], "BTC": p["btc"]}

def place_order(side, price, volume=0.001):
    portfolio = load_portfolio()
    trade_value = price * volume
    timestamp = datetime.now().isoformat()

    if side == "buy":
        if portfolio["usd"] < trade_value:
            print("  Not enough USD to buy")
            return None
        portfolio["usd"] -= trade_value
        portfolio["btc"] += volume
        print(f"  BOUGHT {volume} BTC at ${price:,.2f} (spent ${trade_value:.2f})")

    elif side == "sell":
        if portfolio["btc"] < volume:
            print("  Not enough BTC to sell")
            return None
        portfolio["usd"] += trade_value
        portfolio["btc"] -= volume
        print(f"  SOLD {volume} BTC at ${price:,.2f} (got ${trade_value:.2f})")

    trade = {
        "time": timestamp,
        "side": side,
        "price": price,
        "volume": volume,
        "value_usd": trade_value
    }
    portfolio["trades"].append(trade)
    save_portfolio(portfolio)
    return trade

def get_pnl(current_price):
    portfolio = load_portfolio()
    total_value = portfolio["usd"] + (portfolio["btc"] * current_price)
    pnl = total_value - STARTING_BALANCE
    return {
        "usd": portfolio["usd"],
        "btc": portfolio["btc"],
        "total_value": total_value,
        "pnl": pnl,
        "trades": len(portfolio["trades"])
    }

if __name__ == "__main__":
    print("Balance:", get_balance())
    print("PnL:", get_pnl(66000))