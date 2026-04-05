import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#eaeaea", fontFamily: "Inter, sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 48px", borderBottom: "1px solid #1e2130"
      }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#6366f1" }}>
          TradeBot AI
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#6366f1", color: "#fff", border: "none",
            borderRadius: 8, padding: "10px 22px", cursor: "pointer",
            fontWeight: 600, fontSize: 14
          }}>
          Live Dashboard
        </button>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "100px 24px 60px" }}>
        <div style={{
          display: "inline-block", background: "#1a1d27",
          border: "1px solid #2a2d3a", borderRadius: 20,
          padding: "6px 16px", fontSize: 13, color: "#6366f1",
          marginBottom: 24
        }}>
          AI Trading Agents Hackathon — LabLab.ai
        </div>

        <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
          An AI Agent That<br />
          <span style={{ color: "#6366f1" }}>Trades Bitcoin</span> For You
        </h1>

        <p style={{
          color: "#888", fontSize: 18, maxWidth: 560,
          margin: "0 auto 40px", lineHeight: 1.7
        }}>
          A fully autonomous trading agent that reads real market data,
          makes intelligent decisions, and executes trades — all without
          human intervention.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "#6366f1", color: "#fff", border: "none",
              borderRadius: 10, padding: "14px 32px", cursor: "pointer",
              fontWeight: 700, fontSize: 16
            }}>
            View Live Dashboard
          </button>
          <button
            onClick={() => window.open("https://github.com", "_blank")}
            style={{
              background: "transparent", color: "#eaeaea",
              border: "1px solid #2a2d3a",
              borderRadius: 10, padding: "14px 32px", cursor: "pointer",
              fontWeight: 600, fontSize: 16
            }}>
            View Source Code
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 48,
        padding: "40px 24px", borderTop: "1px solid #1e2130",
        borderBottom: "1px solid #1e2130", flexWrap: "wrap"
      }}>
        {[
          { label: "Starting Capital", value: "$1,000" },
          { label: "Asset Traded", value: "BTC / USD" },
          { label: "Data Sources", value: "PRISM API" },
          { label: "Execution", value: "Kraken" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#6366f1" }}>{s.value}</div>
            <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
          How It Works
        </h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: 56 }}>
          Four steps from raw market data to executed trade
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            {
              step: "01",
              title: "Fetch Market Data",
              desc: "PRISM API provides real-time BTC price, 24h change, and historical candles from Coinbase and OKX.",
              color: "#6366f1"
            },
            {
              step: "02",
              title: "Analyze Signals",
              desc: "The agent calculates a 6-hour moving average and reads the Fear & Greed index to understand market sentiment.",
              color: "#8b5cf6"
            },
            {
              step: "03",
              title: "Make Decision",
              desc: "Using a rule-based strategy, the agent decides to BUY, SELL, or HOLD based on price vs average and market mood.",
              color: "#a855f7"
            },
            {
              step: "04",
              title: "Execute Trade",
              desc: "The decision is executed via Kraken's API. Every trade is logged with timestamp, price, volume, and value.",
              color: "#c026d3"
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: "#1a1d27", border: "1px solid #2a2d3a",
              borderRadius: 16, padding: 28, flex: 1, minWidth: 200, maxWidth: 240
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: item.color,
                marginBottom: 12, letterSpacing: 1
              }}>
                STEP {item.step}
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>
                {item.title}
              </div>
              <div style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div style={{
        background: "#1a1d27", borderTop: "1px solid #1e2130",
        borderBottom: "1px solid #1e2130", padding: "60px 24px"
      }}>
        <h2 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginBottom: 40 }}>
          Built With
        </h2>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { name: "PRISM API", desc: "Real-time market data" },
            { name: "Kraken", desc: "Trade execution" },
            { name: "Python", desc: "Agent & backend" },
            { name: "React", desc: "Frontend dashboard" },
            { name: "Flask", desc: "REST API bridge" },
          ].map((t, i) => (
            <div key={i} style={{
              background: "#0f1117", border: "1px solid #2a2d3a",
              borderRadius: 12, padding: "20px 28px", textAlign: "center",
              minWidth: 140
            }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{t.name}</div>
              <div style={{ color: "#888", fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          See It Trading Live
        </h2>
        <p style={{ color: "#888", marginBottom: 32 }}>
          The agent is running right now — check the dashboard to see real decisions being made.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "#6366f1", color: "#fff", border: "none",
            borderRadius: 10, padding: "14px 36px", cursor: "pointer",
            fontWeight: 700, fontSize: 16
          }}>
          Open Live Dashboard
        </button>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1e2130", padding: "24px",
        textAlign: "center", color: "#555", fontSize: 13
      }}>
        Built for AI Trading Agents Hackathon · LabLab.ai · Powered by PRISM + Kraken
      </div>

    </div>
  )
}

