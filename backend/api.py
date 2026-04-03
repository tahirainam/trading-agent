from flask import Flask, jsonify
from flask_cors import CORS
from prism import get_price, get_fear_greed
from kraken import get_pnl, load_portfolio

app = Flask(__name__)
CORS(app)

@app.route("/api/status")
def status():
    price_data = get_price("BTC")
    fg_data    = get_fear_greed()
    price      = price_data["price_usd"]
    pnl        = get_pnl(price)
    portfolio  = load_portfolio()

    return jsonify({
        "price":       price,
        "change_24h":  price_data["change_24h_pct"],
        "fear_greed":  fg_data["value"],
        "fg_label":    fg_data["label"],
        "usd":         pnl["usd"],
        "btc":         pnl["btc"],
        "total_value": pnl["total_value"],
        "pnl":         pnl["pnl"],
        "trades":      portfolio["trades"]
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)