import time
from prism import get_price, get_fear_greed, get_price_history
from kraken import place_order, get_pnl

def analyze_and_trade():
    print("\n" + "="*45)
    print(f"  Running agent...")
    print("="*45)

    # Fetch data
    price_data   = get_price("BTC")
    fg_data      = get_fear_greed()
    history_data = get_price_history("BTC")

    current_price = price_data["price_usd"]
    change_24h    = price_data["change_24h_pct"]
    fg_value      = fg_data["value"]
    fg_label      = fg_data["label"]

    # Moving average from last 6 real candles
    candles = [c for c in history_data["candles"] if c["volume"] is not None]
    last_6  = [c["close"] for c in candles[:6]]
    moving_avg = sum(last_6) / len(last_6)

    print(f"  BTC Price     : ${current_price:,.2f}")
    print(f"  24h Change    : {change_24h:.2f}%")
    print(f"  Fear & Greed  : {fg_value} ({fg_label})")
    print(f"  6h Moving Avg : ${moving_avg:,.2f}")

    # Decision logic
    if abs(change_24h) > 3:
        decision = "HOLD"
        reason = f"Too volatile ({change_24h:.2f}%)"
    elif fg_value < 25:
        decision = "BUY"
        reason = f"Extreme fear ({fg_value})"
    elif fg_value > 75:
        decision = "SELL"
        reason = f"Extreme greed ({fg_value})"
    elif current_price < moving_avg:
        decision = "BUY"
        reason = f"Price below 6h avg"
    elif current_price > moving_avg:
        decision = "SELL"
        reason = f"Price above 6h avg"
    else:
        decision = "HOLD"
        reason = "No clear signal"

    print(f"\n  Decision : {decision}")
    print(f"  Reason   : {reason}")

    # Execute
    # Execute
    pnl = get_pnl(current_price)
    if decision == "BUY" and pnl["usd"] >= current_price * 0.001:
        place_order("buy", current_price, volume=0.001)
    elif decision == "SELL" and pnl["btc"] >= 0.001:
        place_order("sell", current_price, volume=0.001)
    else:
        if decision != "HOLD":
            print(f"  Skipping {decision} — insufficient balance")
        else:
            print("  No order placed.")

    # Show PnL
    print(f"\n  Portfolio:")
    print(f"    USD        : ${pnl['usd']:,.2f}")
    print(f"    BTC        : {pnl['btc']} BTC")
    print(f"    Total Value: ${pnl['total_value']:,.2f}")
    print(f"    PnL        : ${pnl['pnl']:,.2f}")
    print(f"    Trades     : {pnl['trades']}")

    return {
        "price": current_price,
        "decision": decision,
        "reason": reason,
        "pnl": pnl
    }

if __name__ == "__main__":
    print("🤖 Trading Agent Started — running every 5 minutes")
    print("   Press Ctrl+C to stop\n")
    while True:
        try:
            analyze_and_trade()
            print("\n  Waiting 5 minutes...")
            time.sleep(300)
        except KeyboardInterrupt:
            print("\n\nAgent stopped.")
            break
        except Exception as e:
            print(f"  Error: {e}")
            time.sleep(60)