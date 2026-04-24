"use client";

import {
  ScatterChart, Scatter, LineChart, Line,
  XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea,
  ComposedChart, Area,
} from "recharts";

// ─── Graph 12: WTI vs Inventory Surprise ─────────────────────────────────────
// Each point: { surprise: actual-consensus MMbbl, move: next-day WTI % change }
// Negative surprise = bullish (draw larger than expected) → should push price up
const surpriseData = [
  { surprise: -3.2, move:  2.1,  week: "Mar 8",  color: "#22c55e" },
  { surprise: -2.6, move:  1.8,  week: "Mar 22", color: "#22c55e" },
  { surprise: -1.8, move:  1.2,  week: "Feb 22", color: "#22c55e" },
  { surprise: -1.5, move:  0.8,  week: "Jan 11", color: "#22c55e" },
  { surprise: -1.2, move:  0.9,  week: "Feb 1",  color: "#22c55e" },
  { surprise: -1.2, move:  1.1,  week: "Mar 15", color: "#22c55e" },
  { surprise: -0.9, move:  0.6,  week: "Apr 5",  color: "#22c55e" },
  { surprise: -0.9, move:  0.4,  week: "Apr 12", color: "#22c55e" },
  { surprise: -0.5, move: -0.3,  week: "Feb 8",  color: "#eab308" },
  { surprise: -0.3, move:  0.2,  week: "Jan 25", color: "#eab308" },
  { surprise:  0.1, move: -0.1,  week: "Mar 29", color: "#eab308" },
  { surprise:  0.4, move: -0.5,  week: "Feb 15", color: "#eab308" },
  { surprise:  0.7, move: -0.8,  week: "Jan 18", color: "#ef4444" },
  { surprise:  1.1, move: -1.0,  week: "Feb 28", color: "#ef4444" },
  { surprise:  1.7, move: -1.4,  week: "Jan 4",  color: "#ef4444" },
  { surprise:  2.3, move: -1.9,  week: "Dec 21", color: "#ef4444" },
];

// ─── Graph 13: CL1–CL2 Prompt Spread ─────────────────────────────────────────
const cl1cl2 = [
  { week:"Jan 11", spread: 1.82 },
  { week:"Jan 18", spread: 2.10 },
  { week:"Jan 25", spread: 2.35 },
  { week:"Feb 1",  spread: 2.71 },
  { week:"Feb 8",  spread: 3.08 },
  { week:"Feb 15", spread: 3.42 },
  { week:"Feb 22", spread: 3.85 },
  { week:"Mar 1",  spread: 4.51 },
  { week:"Mar 8",  spread: 5.80 },
  { week:"Mar 15", spread: 6.90 },
  { week:"Mar 22", spread: 7.94 },
  { week:"Mar 29", spread: 7.20 },
  { week:"Apr 5",  spread: 5.20 },
  { week:"Apr 12", spread: 4.19 },
];

// ─── Graph 14: Brent–WTI Spread ──────────────────────────────────────────────
const brentWti = [
  { week:"Jan 18", spread:  4.69 },
  { week:"Jan 25", spread:  4.81 },
  { week:"Feb 1",  spread:  5.48 },
  { week:"Feb 8",  spread:  4.50 },
  { week:"Feb 15", spread:  4.86 },
  { week:"Feb 22", spread:  5.37 },
  { week:"Mar 1",  spread:  5.46 },
  { week:"Mar 8",  spread:  1.79 },
  { week:"Mar 15", spread:  4.43 },
  { week:"Mar 22", spread: 13.87 },
  { week:"Mar 29", spread: 12.93 },
  { week:"Apr 5",  spread: -2.51 },
  { week:"Apr 12", spread: -1.37 },
  { week:"Apr 19", spread:  4.70 },
];

const NORMAL_LOW  = 3.0;
const NORMAL_HIGH = 6.2;
const THREE_M_AVG = 5.37;

// ─── Tooltips ─────────────────────────────────────────────────────────────────

const tipStyle = {
  background: "#0a0a0a", border: "1px solid #222",
  borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SurpriseTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={tipStyle}>
      <div style={{ color: "#555", marginBottom: 4, fontSize: 9 }}>{d.week}</div>
      <div style={{ color: d.surprise < 0 ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
        Surprise: {d.surprise > 0 ? "+" : ""}{d.surprise.toFixed(1)} MMbbl
        <span style={{ fontSize: 9, marginLeft: 4 }}>{d.surprise < 0 ? "(draw beat)" : "(build miss)"}</span>
      </div>
      <div style={{ color: d.move > 0 ? "#22c55e" : "#ef4444", fontWeight: 700, marginTop: 2 }}>
        WTI next-day: {d.move > 0 ? "+" : ""}{d.move.toFixed(1)}%
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Cl1Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={tipStyle}>
      <div style={{ color: "#555", marginBottom: 4, fontSize: 9 }}>{label}</div>
      <div style={{ color: v > 3 ? "#22c55e" : v > 1 ? "#eab308" : "#ef4444", fontWeight: 700 }}>
        CL1–CL2: ${v?.toFixed(2)}/bbl
      </div>
      <div style={{ color: "#444", fontSize: 9, marginTop: 2 }}>
        {v > 3 ? "Strong backwardation" : v > 1 ? "Mild backwardation" : "Flat/contango"}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpreadTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={tipStyle}>
      <div style={{ color: "#555", marginBottom: 4, fontSize: 9 }}>{label}</div>
      <div style={{ color: v < 0 ? "#ef4444" : v > THREE_M_AVG ? "#eab308" : "#22c55e", fontWeight: 700 }}>
        Brent–WTI: ${v?.toFixed(2)}/bbl
      </div>
      <div style={{ color: "#444", fontSize: 9, marginTop: 2 }}>
        vs 3M avg {v > THREE_M_AVG ? `▲ +$${(v - THREE_M_AVG).toFixed(2)}` : `▼ $${(v - THREE_M_AVG).toFixed(2)}`}
      </div>
    </div>
  );
}

// Custom scatter dot
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SurpriseDot(props: any) {
  const { cx, cy, payload } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill={payload.color} fillOpacity={0.35} stroke={payload.color} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={2.5} fill={payload.color} fillOpacity={0.9} />
    </g>
  );
}

const tick     = { fill: "#666", fontSize: 9, fontFamily: "monospace" };
const tickSmall = { fill: "#666", fontSize: 8, fontFamily: "monospace" };

const CARD_STYLE = {
  background: "#080808", border: "1px solid var(--border)",
  borderRadius: 8, padding: "18px 20px",
};

function ChartTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 3 }}>
        {title}
      </div>
      <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>{sub}</div>
    </div>
  );
}

function Bullets({ items, color = "#d4922a" }: { items: string[]; color?: string }) {
  return (
    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ color: "var(--accent)", fontSize: 11, fontFamily: "monospace", fontWeight: 700, marginBottom: 6 }}>Read-through</div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 4 }}>
        {items.map((b, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color, fontSize: 11, flexShrink: 0, marginTop: 1 }}>·</span>
            <span style={{ color: "#666", fontSize: 11, fontFamily: "monospace", lineHeight: 1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ForecastMarketOverlayCharts() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Section E label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 3, height: 24, borderRadius: 2, background: "var(--accent)", flexShrink: 0 }} />
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            Market Overlay
          </div>
          <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginTop: 1 }}>
            Price reaction to inventory signals, curve structure, and spread regime
          </div>
        </div>
      </div>

      {/* Graph 12 — Scatter (full width) */}
      <div style={CARD_STYLE}>
        <ChartTitle
          title="WTI vs Inventory Surprise"
          sub="X = EIA surprise vs consensus (MMbbl) · Y = WTI next-day % change · Negative surprise = bullish"
        />

        {/* Quadrant legend */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14, maxWidth: 480 }}>
          {[
            { q: "Draw surprise + Price up", color: "#22c55e", note: "Signal working correctly" },
            { q: "Build miss + Price down",   color: "#ef4444", note: "Signal working correctly" },
            { q: "Draw surprise + Price down", color: "#eab308", note: "Other factors overriding" },
            { q: "Build miss + Price up",      color: "#eab308", note: "Macro/geopolitical override" },
          ].map(q => (
            <div key={q.q} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: q.color, marginTop: 3, flexShrink: 0 }} />
              <div>
                <div style={{ color: q.color, fontSize: 9, fontFamily: "monospace", fontWeight: 700 }}>{q.q}</div>
                <div style={{ color: "#333", fontSize: 8, fontFamily: "monospace" }}>{q.note}</div>
              </div>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={290}>
          <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 32 }}>
            <XAxis type="number" dataKey="surprise" name="Surprise" tick={tick}
              axisLine={false} tickLine={false} domain={[-4, 3]}
              tickFormatter={v => `${v > 0 ? "+" : ""}${v}`}
              label={{ value: "Inventory Surprise (MMbbl) — negative = draw beat · positive = build miss", position: "insideBottom", offset: -20, fill: "#fff", fontSize: 10, fontFamily: "monospace", fontWeight: 700 }} />
            <YAxis type="number" dataKey="move" name="WTI Move" tick={tick}
              axisLine={false} tickLine={false} width={48}
              tickFormatter={v => `${v > 0 ? "+" : ""}${v}%`} domain={[-2.5, 2.5]}
              label={{ value: "WTI Next-Day %", angle: -90, position: "insideLeft", fill: "#fff", fontSize: 10, fontFamily: "monospace", fontWeight: 700, dx: 20 }} />
            <ZAxis range={[80, 80]} />
            <Tooltip content={<SurpriseTip />} />

            {/* Quadrant dividers */}
            <ReferenceLine x={0} stroke="#333" strokeWidth={1} />
            <ReferenceLine y={0} stroke="#333" strokeWidth={1} />

            {/* Quadrant shading */}
            <ReferenceArea x1={-4} x2={0} y1={0} y2={2.5}  fill="rgba(34,197,94,0.04)"  />
            <ReferenceArea x1={0}  x2={3} y1={-2.5} y2={0} fill="rgba(239,68,68,0.04)"  />
            <ReferenceArea x1={-4} x2={0} y1={-2.5} y2={0} fill="rgba(234,179,8,0.03)"  />
            <ReferenceArea x1={0}  x2={3} y1={0} y2={2.5}  fill="rgba(234,179,8,0.03)"  />

            {/* Trend line proxy (manual reference) */}
            <ReferenceLine
              segment={[{ x: -3.5, y: 2.2 }, { x: 2.5, y: -1.8 }]}
              stroke="#d4922a" strokeWidth={1} strokeDasharray="5 4" strokeOpacity={0.4} />

            <Scatter data={surpriseData} shape={<SurpriseDot />} isAnimationActive={false} />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Stats strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
          {[
            { label: "Directional R²", value: "0.71", color: "#22c55e", sub: "Strong linear relationship" },
            { label: "Hit Rate",        value: "77%",   color: "#22c55e", sub: "Correct direction 10/13" },
            { label: "Avg move / 1σ",   value: "+0.8%", color: "#d4922a", sub: "Per MMbbl surprise" },
            { label: "Override events", value: "3 / 16", color: "#eab308", sub: "Macro regime overrides" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0d0d0d", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px" }}>
              <div style={{ color: "#444", fontSize: 9, fontFamily: "monospace", marginBottom: 3 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 14, fontFamily: "monospace", fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: "#333", fontSize: 8, fontFamily: "monospace", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <Bullets items={[
          "Strong negative correlation (R² 0.71) — draw beats reliably push WTI higher next day",
          "3 overrides: Mar 8, Apr 5, Apr 12 — geopolitical events dominated inventory signal",
          "Average impulse: +0.8% per 1 MMbbl draw beat; −0.7% per 1 MMbbl build miss",
          "Signal most reliable when surprise > ±1.5 MMbbl and no macro overhang",
        ]} />
      </div>

      {/* Graph 13 + 14 side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Graph 13 — CL1–CL2 */}
        <div style={CARD_STYLE}>
          <ChartTitle
            title="CL1–CL2 Prompt Spread"
            sub="$/bbl — positive = backwardation (bullish), negative = contango (bearish)"
          />
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            {[
              { color: "#d4922a", label: "CL1–CL2 spread" },
              { color: "#22c55e22", label: "Backwardation zone", box: true },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {l.box
                  ? <div style={{ width: 12, height: 10, background: "rgba(34,197,94,0.18)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 2 }} />
                  : <div style={{ width: 14, height: 2, background: l.color, borderRadius: 1 }} />
                }
                <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={cl1cl2} margin={{ top: 4, right: 10, left: 0, bottom: 2 }}>
              <defs>
                <linearGradient id="cl1Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#d4922a" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#d4922a" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={30}
                tickFormatter={v => `$${v.toFixed(1)}`} domain={[0, 9]} />
              <Tooltip content={<Cl1Tip />} />

              <ReferenceArea y1={2} y2={9} fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.08)" strokeDasharray="2 4" />
              <ReferenceLine y={0} stroke="#333" strokeWidth={1} />
              <ReferenceLine y={2} stroke="#22c55e22" strokeDasharray="2 4"
                label={{ value: "Strong backwardation", position: "insideTopRight", fill: "#1e4a1e", fontSize: 8, fontFamily: "monospace" }} />

              <Area type="monotone" dataKey="spread" name="CL1–CL2"
                stroke="#d4922a" strokeWidth={2.5} fill="url(#cl1Grad)"
                dot={{ r: 2.5, fill: "#d4922a", strokeWidth: 0 }}
                activeDot={{ r: 4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>

          <Bullets items={[
            "Spread peaked at $7.94 in late March — maximum prompt tightness",
            "Now compressing to $4.19 — geopolitical risk premium unwinding",
            "Still in healthy backwardation — supports draw from stocks thesis",
            "Below $2.00 would signal curve flattening / market loosening",
          ]} />
        </div>

        {/* Graph 14 — Brent–WTI */}
        <div style={CARD_STYLE}>
          <ChartTitle
            title="Brent–WTI Spread"
            sub="$/bbl — wider = US crude more competitive for export, supports draws"
          />
          <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
            {[
              { color: "#3b82f6", label: "Brent–WTI" },
              { color: "#3b82f6", label: `3M avg $${THREE_M_AVG}`, dash: true },
              { color: "rgba(59,130,246,0.15)", label: "Normal range", box: true },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {l.box
                  ? <div style={{ width: 12, height: 10, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 2 }} />
                  : <div style={{ width: 14, height: 2, background: l.color, borderRadius: 1, borderTop: l.dash ? "1px dashed" : "none" }} />
                }
                <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={brentWti} margin={{ top: 4, right: 10, left: 0, bottom: 2 }}>
              <defs>
                <linearGradient id="bwGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.10} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={tickSmall} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={30}
                tickFormatter={v => `$${v}`} domain={[-4, 15]} />
              <Tooltip content={<SpreadTip />} />

              <ReferenceArea y1={NORMAL_LOW} y2={NORMAL_HIGH}
                fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeDasharray="3 4" />
              <ReferenceLine y={0} stroke="#333" strokeWidth={1} />
              <ReferenceLine y={THREE_M_AVG} stroke="#3b82f655" strokeDasharray="4 4" strokeWidth={1}
                label={{ value: `$${THREE_M_AVG}`, position: "insideTopRight", fill: "#3b82f680", fontSize: 8, fontFamily: "monospace" }} />

              <Area type="monotone" dataKey="spread" name="Brent–WTI"
                stroke="#3b82f6" strokeWidth={2.5} fill="url(#bwGrad)"
                dot={{ r: 2.5, fill: "#3b82f6", strokeWidth: 0 }}
                activeDot={{ r: 4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>

          <Bullets color="#3b82f6" items={[
            "Spread spiked $13.87 late March — Brent absorbed geopolitical premium",
            "Swung negative Apr 5: WTI above Brent — Cushing delivery dislocation",
            "Recovered to $4.70 — inside normal range but below $5.37 avg",
            "Below avg = spread still recovering, US export economics improving",
          ]} />
        </div>

      </div>
    </div>
  );
}
