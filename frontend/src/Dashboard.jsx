import { useState, useEffect } from "react"
import axios from "axios"
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts"

const API = "http://127.0.0.1:5000/api/status"

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: "#1a1d27",
      border: "1px solid #2a2d3a",
      borderRadius: 12,
      padding: "20px 24px",
      flex: 1,
      minWidth: 160
    }}>
      <div style={{ color: "#888", fontSize: 13, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || "#eaeaea" }}>{value}</div>
    </div>
  )
}

function Badge({ side }) {
  const colors = {
    buy:  { bg: "#0d2d1f", color: "#22c55e", label: "BUY" },
    sell: { bg: "#2d0d0d", color: "#ef4444", label: "SELL" }
  }
  const c = colors[side] || { bg: "#1a1d27", color: "#888", label: side }
  return (
    <span style={{
      background: c.bg, color: c.color,
      borderRadius: 6, padding: "2px 10px",
      fontSize: 12, fontWeight: 600
    }}>{c.label}</span>
  )
}

export default function Dashboard() {
  const [data, setData]       = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError]     = useState(null)

  const fetchData = async () => {
    try {
      const res = await axios.get(API)
      const d   = res.data
      setData(d)
      setHistory(prev => {
        const entry = {
          time:  new Date().toLocaleTimeString(),
          price: parseFloat(d.price.toFixed(2)),
          value: parseFloat(d.total_value.toFixed(2))
        }
        return [...prev.slice(-29), entry]
      })
      setError(null)
    } catch {
      setError("Cannot reach backend — is api.py running?")
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  if (error) return (
    <div style={{ padding: 40, color: "#ef4444" }}>{error}</div>
  )

  if (!data) return (
    <div style={{ padding: 40, color: "#888" }}>Loading agent data...</div>
  )

  const pnlColor    = data.pnl >= 0 ? "#22c55e" : "#ef4444"
  const pnlSign     = data.pnl >= 0 ? "+" : ""
  const changeColor = data.change_24h >= 0 ? "#22c55e" : "#ef4444"

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>
          AI Trading Agent
        </h1>
        <p style={{ color: "#888", fontSize: 14 }}>
          Live BTC paper trading — powered by PRISM + Kraken
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        <StatCard
          label="BTC Price"
          value={`$${data.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        />
        <StatCard
          label="24h Change"
          value={`${data.change_24h.toFixed(2)}%`}
          color={changeColor}
        />
        <StatCard
          label="Fear & Greed"
          value={`${data.fear_greed} — ${data.fg_label}`}
          color="#f59e0b"
        />
        <StatCard
          label="Portfolio Value"
          value={`$${data.total_value.toFixed(2)}`}
        />
        <StatCard
          label="PnL"
          value={`${pnlSign}$${data.pnl.toFixed(2)}`}
          color={pnlColor}
        />
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>

        {/* Price Chart */}
        <div style={{
          background: "#1a1d27", border: "1px solid #2a2d3a",
          borderRadius: 12, padding: 24, flex: 2, minWidth: 300
        }}>
          <div style={{ marginBottom: 16, fontWeight: 600 }}>BTC Price (live)</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
              <XAxis dataKey="time" tick={{ fill: "#888", fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1a1d27", border: "1px solid #2a2d3a" }}
                labelStyle={{ color: "#888" }}
              />
              <Line
                type="monotone" dataKey="price"
                stroke="#6366f1" strokeWidth={2} dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Chart */}
        <div style={{
          background: "#1a1d27", border: "1px solid #2a2d3a",
          borderRadius: 12, padding: 24, flex: 1, minWidth: 260
        }}>
          <div style={{ marginBottom: 16, fontWeight: 600 }}>Portfolio Value</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3a" />
              <XAxis dataKey="time" tick={{ fill: "#888", fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#1a1d27", border: "1px solid #2a2d3a" }}
                labelStyle={{ color: "#888" }}
              />
              <Line
                type="monotone" dataKey="value"
                stroke="#22c55e" strokeWidth={2} dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Breakdown */}
      <div style={{
        background: "#1a1d27", border: "1px solid #2a2d3a",
        borderRadius: 12, padding: 24, marginBottom: 32
      }}>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Portfolio Breakdown</div>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <div style={{ color: "#888", fontSize: 13 }}>USD Balance</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>${data.usd.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ color: "#888", fontSize: 13 }}>BTC Holdings</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{data.btc} BTC</div>
          </div>
          <div>
            <div style={{ color: "#888", fontSize: 13 }}>Total Trades</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{data.trades.length}</div>
          </div>
        </div>
      </div>

      {/* Trade History */}
      <div style={{
        background: "#1a1d27", border: "1px solid #2a2d3a",
        borderRadius: 12, padding: 24
      }}>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Trade History</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: "#888", textAlign: "left" }}>
              <th style={{ paddingBottom: 12 }}>Time</th>
              <th style={{ paddingBottom: 12 }}>Side</th>
              <th style={{ paddingBottom: 12 }}>Price</th>
              <th style={{ paddingBottom: 12 }}>Volume</th>
              <th style={{ paddingBottom: 12 }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {[...data.trades].reverse().map((t, i) => (
              <tr key={i} style={{
                borderTop: "1px solid #2a2d3a",
                color: "#eaeaea"
              }}>
                <td style={{ padding: "10px 0" }}>
                  {new Date(t.time).toLocaleTimeString()}
                </td>
                <td style={{ padding: "10px 0" }}>
                  <Badge side={t.side} />
                </td>
                <td style={{ padding: "10px 0" }}>
                  ${t.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </td>
                <td style={{ padding: "10px 0" }}>{t.volume} BTC</td>
                <td style={{ padding: "10px 0" }}>${t.value_usd.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 24, color: "#555", fontSize: 12, textAlign: "center" }}>
        Auto-refreshes every 15 seconds · Built with PRISM API + Kraken
      </div>

    </div>
  )
}