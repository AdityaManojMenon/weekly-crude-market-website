"use client";

import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, ErrorBar,
  BarChart, Cell,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

// 14 weeks of forecast vs actual (MMbbl, negative = draw)
const history = [
  { week: "Jan 11", forecast: -1.2, actual: -0.8,  error: 0.7 },
  { week: "Jan 18", forecast: -0.5, actual:  1.2,  error: 0.8 },
  { week: "Jan 25", forecast:  0.8, actual:  0.5,  error: 0.6 },
  { week: "Feb 1",  forecast: -1.5, actual: -2.1,  error: 0.9 },
  { week: "Feb 8",  forecast: -0.9, actual: -1.4,  error: 0.7 },
  { week: "Feb 15", forecast:  0.3, actual: -0.3,  error: 0.5 },
  { week: "Feb 22", forecast: -1.1, actual: -1.8,  error: 0.8 },
  { week: "Mar 1",  forecast: -2.0, actual: -3.3,  error: 1.1 },
  { week: "Mar 8",  forecast: -1.8, actual: -4.2,  error: 1.2 },
  { week: "Mar 15", forecast: -0.5, actual:  0.9,  error: 0.9 },
  { week: "Mar 22", forecast: -1.3, actual: -2.6,  error: 1.0 },
  { week: "Mar 29", forecast: -0.8, actual: -0.9,  error: 0.6 },
  { week: "Apr 5",  forecast:  0.2, actual: -0.9,  error: 0.7 },
  { week: "Apr 12", forecast: -0.6, actual: null,  error: 0.8 },
  { week: "Apr 19", forecast: -1.1, actual: null,  error: 0.9 },
];

// Probability distribution for current week forecast
const distribution = [
  { bucket: "Large Build\n> +2",   prob: 8,  color: "#ef4444", dir: "bear" },
  { bucket: "Build\n0 – +2",       prob: 17, color: "#f97316", dir: "bear" },
  { bucket: "Flat\n±0.5",          prob: 12, color: "#eab308", dir: "neutral" },
  { bucket: "Draw\n0 – 2",         prob: 38, color: "#22c55e", dir: "bull" },
  { bucket: "Large Draw\n> 2",     prob: 25, color: "#16a34a", dir: "bull" },
];

// Waterfall driver data — current week breakdown
// "base" = invisible stack, "value" = visible delta bar
const drivers = [
  { label: "Production",     value:  0.85, base: 0,    color: "#ef4444", dir: "bear", note: "+0.1 MMbbl/d WoW" },
  { label: "Imports",        value:  0.30, base: 0.85, color: "#f97316", dir: "bear", note: "Gulf Coast arrivals up" },
  { label: "Exports",        value: -1.40, base: 1.15, color: "#22c55e", dir: "bull", note: "Midland → Europe surge" },
  { label: "Refinery Runs",  value: -0.95, base: 0,    color: "#22c55e", dir: "bull", note: "Utilization +2.4% WoW" },
  { label: "Adj. Factor",    value:  0.19, base:-0.95, color: "#eab308", dir: "neutral", note: "Statistical residual" },
];

// ─── Tooltips ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ForecastTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const f = payload.find((p: { name: string }) => p.name === "Forecast")?.value as number | undefined;
  const a = payload.find((p: { name: string }) => p.name === "Actual")?.value as number | undefined;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>
      <div style={{ color: "#555", marginBottom: 5, fontSize: 10 }}>{label}</div>
      {f !== undefined && (
        <div style={{ color: "#d4922a", marginBottom: 2 }}>
          Forecast: <span style={{ fontWeight: 700 }}>{f > 0 ? "+" : ""}{f.toFixed(2)} MMbbl</span>
        </div>
      )}
      {a !== undefined && a !== null && (
        <div style={{ color: a < 0 ? "#22c55e" : "#ef4444" }}>
          Actual: <span style={{ fontWeight: 700 }}>{a > 0 ? "+" : ""}{a.toFixed(2)} MMbbl</span>
          <span style={{ color: "#444", marginLeft: 6, fontSize: 9 }}>{a < 0 ? "DRAW" : "BUILD"}</span>
        </div>
      )}
      {a == null && <div style={{ color: "#444", fontSize: 9 }}>Actual pending</div>}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DistTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>
      <div style={{ color: "#777", marginBottom: 4, whiteSpace: "pre-line" }}>{label}</div>
      <div style={{ color: "#fff", fontWeight: 700 }}>{v}% probability</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DriverTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const entry = payload.find((p: { name: string }) => p.name === "delta");
  if (!entry) return null;
  const d = entry.payload;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>
      <div style={{ color: d.color, fontWeight: 700, marginBottom: 3 }}>{d.label}</div>
      <div style={{ color: "#ccc" }}>
        Impact: <span style={{ fontWeight: 700 }}>{d.value > 0 ? "+" : ""}{d.value.toFixed(2)} MMbbl</span>
      </div>
      <div style={{ color: "#444", fontSize: 10, marginTop: 3 }}>{d.note}</div>
    </div>
  );
}

const tick = { fill: "#666", fontSize: 9, fontFamily: "monospace" };

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ForecastCharts() {
  // Build waterfall data: invisible base bar + visible delta bar
  const waterfallData = drivers.map(d => ({
    ...d,
    // For negative deltas, base shifts down
    base:   d.value >= 0 ? d.base : d.base + d.value,
    delta:  Math.abs(d.value),
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Graph 1 — Forecast vs Actual */}
      <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
            Forecast vs Actual
          </div>
          <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
            Weekly EIA crude inventory change — MMbbl · Negative = draw (bullish)
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
          {[
            { color: "#d4922a", label: "Forecast", dash: false },
            { color: "#3b82f6", label: "Actual print", dash: false },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
              <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(212,146,42,0.12)", border: "1px dashed rgba(212,146,42,0.3)" }} />
            <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>Confidence interval</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={history} margin={{ top: 10, right: 12, left: 0, bottom: 2 }}>
            <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={2} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={34}
              tickFormatter={v => `${v > 0 ? "+" : ""}${v}`}
              domain={[-5, 2.5]}
              label={{ value: "MMbbl", angle: -90, position: "insideLeft", fill: "#444", fontSize: 9, fontFamily: "monospace", dx: 10 }} />
            <Tooltip content={<ForecastTip />} />
            <ReferenceLine y={0} stroke="#333" strokeWidth={1} />
            <ReferenceLine y={-2} stroke="#1a3a1a" strokeDasharray="3 4" strokeWidth={1}
              label={{ value: "LARGE DRAW", position: "insideTopRight", fill: "#1e4a1e", fontSize: 8, fontFamily: "monospace" }} />
            <ReferenceLine y={1.5} stroke="#3a1a1a" strokeDasharray="3 4" strokeWidth={1}
              label={{ value: "LARGE BUILD", position: "insideBottomRight", fill: "#4a1e1e", fontSize: 8, fontFamily: "monospace" }} />

            {/* Forecast error band using Bar with opacity */}
            <Bar dataKey="error" name="CI" stackId="ci"
              fill="rgba(212,146,42,0.08)"
              stroke="rgba(212,146,42,0.2)"
              strokeDasharray="2 3"
              isAnimationActive={false} />

            <Line type="monotone" dataKey="forecast" name="Forecast"
              stroke="#d4922a" strokeWidth={2} dot={{ r: 2.5, fill: "#d4922a", strokeWidth: 0 }}
              activeDot={{ r: 4 }} isAnimationActive={false}
              strokeDasharray="4 3" />

            <Line type="monotone" dataKey="actual" name="Actual"
              stroke="#3b82f6" strokeWidth={2.5}
              dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 5 }} isAnimationActive={false}
              connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Accuracy metrics */}
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
          <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Model Performance — trailing 13 weeks
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: "Hit Rate",        value: "69%",    sub: "Correct direction",   color: "#22c55e" },
              { label: "MAE",             value: "0.71",   sub: "MMbbl mean abs error", color: "#d4922a" },
              { label: "RMSE",            value: "0.94",   sub: "Root mean sq error",  color: "#eab308" },
              { label: "Dir. Accuracy",   value: "77%",    sub: "Bull/bear call",      color: "#22c55e" },
            ].map(m => (
              <div key={m.label} style={{ background: "#0d0d0d", border: "1px solid var(--border)", borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ color: "#444", fontSize: 9, fontFamily: "monospace", marginBottom: 4 }}>{m.label}</div>
                <div style={{ color: m.color, fontSize: 16, fontFamily: "monospace", fontWeight: 700 }}>{m.value}</div>
                <div style={{ color: "#333", fontSize: 9, fontFamily: "monospace", marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Graph 2 + 3 — Side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Graph 2 — Forecast Distribution */}
        <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
              Forecast Distribution
            </div>
            <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
              Probability mass per outcome bucket — current week
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={distribution} margin={{ top: 10, right: 10, left: 0, bottom: 24 }}>
              <XAxis dataKey="bucket" tick={{ fill: "#777", fontSize: 9, fontFamily: "monospace" }}
                axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={28}
                tickFormatter={v => `${v}%`} domain={[0, 45]} />
              <Tooltip content={<DistTip />} />
              <Bar dataKey="prob" maxBarSize={52} radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {distribution.map((d, i) => (
                  <Cell key={i} fill={d.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Mode label */}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent)", fontSize: 11, fontFamily: "monospace", fontWeight: 700, marginBottom: 6 }}>
              Read-through
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                "63% probability of a draw — dominant bull scenario this week",
                "Draw 0–2 MMbbl is modal outcome at 38%",
                "Only 25% chance of a build — supply-side risks limited",
                "Refinery run recovery + export surge driving draw probability",
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", fontSize: 11, flexShrink: 0, marginTop: 1 }}>·</span>
                  <span style={{ color: "#666", fontSize: 11, fontFamily: "monospace", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graph 3 — Driver Contribution Waterfall */}
        <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
              Driver Contribution
            </div>
            <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
              Forecast decomposition — MMbbl · Green = draws inventory, Red = builds
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={waterfallData} margin={{ top: 10, right: 10, left: 0, bottom: 4 }}>
              <XAxis dataKey="label" tick={{ fill: "#777", fontSize: 9, fontFamily: "monospace" }}
                axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={28}
                tickFormatter={v => `${v > 0 ? "+" : ""}${v.toFixed(1)}`}
                domain={[-1.6, 1.4]} />
              <Tooltip content={<DriverTip />} />
              <ReferenceLine y={0} stroke="#333" strokeWidth={1} />

              {/* Invisible base */}
              <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />

              {/* Visible delta */}
              <Bar dataKey="delta" name="delta" stackId="wf" maxBarSize={48}
                radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {waterfallData.map((d, i) => (
                  <Cell key={i} fill={d.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent)", fontSize: 11, fontFamily: "monospace", fontWeight: 700, marginBottom: 8 }}>
              This Week Forecast
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {drivers.map(d => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", items: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 2, background: d.color, marginTop: 3, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ color: "#777", fontSize: 10, fontFamily: "monospace", marginLeft: 6 }}>{d.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: d.color, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
                      {d.value > 0 ? "+" : ""}{d.value.toFixed(2)}
                    </span>
                    <span style={{ color: "#333", fontSize: 9, fontFamily: "monospace" }}>{d.note}</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>NET FORECAST</span>
                <span style={{ color: "#22c55e", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
                  −1.01 MMbbl (DRAW)
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
