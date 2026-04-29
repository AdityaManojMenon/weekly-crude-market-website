"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
  ScatterChart, Scatter, ZAxis, CartesianGrid,
} from "recharts";

/* ══════════════════════════════════════════════════════════════════════════
   1. SECTOR HEATMAP
   ══════════════════════════════════════════════════════════════════════════ */

interface HeatTile {
  ticker: string;
  name: string;
  ytd: number;
  mcapB: number; // market cap in $B — controls tile size
  type: string;
}

const heatData: HeatTile[] = [
  { ticker: "XOM",  name: "ExxonMobil",        ytd:  6.2,  mcapB: 490, type: "Integrated" },
  { ticker: "CVX",  name: "Chevron",            ytd:  4.8,  mcapB: 285, type: "Integrated" },
  { ticker: "SHEL", name: "Shell",              ytd:  3.4,  mcapB: 218, type: "Integrated" },
  { ticker: "BP",   name: "BP",                 ytd:  2.1,  mcapB: 97,  type: "Integrated" },
  { ticker: "COP",  name: "ConocoPhillips",     ytd:  9.6,  mcapB: 130, type: "Upstream"   },
  { ticker: "OXY",  name: "Occidental",         ytd: 12.4,  mcapB: 52,  type: "Upstream"   },
  { ticker: "APA",  name: "APA Corp",           ytd:  8.1,  mcapB: 10,  type: "Upstream"   },
  { ticker: "VLO",  name: "Valero Energy",      ytd:  5.3,  mcapB: 50,  type: "Refining"   },
  { ticker: "MPC",  name: "Marathon Petroleum", ytd:  7.8,  mcapB: 58,  type: "Refining"   },
  { ticker: "SLB",  name: "SLB",                ytd: -3.2,  mcapB: 62,  type: "Services"   },
  { ticker: "HAL",  name: "Halliburton",        ytd: -1.8,  mcapB: 32,  type: "Services"   },
];

const groups: { label: string; keys: string[] }[] = [
  { label: "Integrated", keys: ["XOM","CVX","SHEL","BP"] },
  { label: "Upstream",   keys: ["COP","OXY","APA"]       },
  { label: "Refining",   keys: ["VLO","MPC"]              },
  { label: "Services",   keys: ["SLB","HAL"]              },
];

const groupColors: Record<string, string> = {
  Integrated: "#d4922a",
  Upstream:   "#22c55e",
  Refining:   "#818cf8",
  Services:   "#94a3b8",
};

export function SectorHeatmap() {
  return (
    <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
          Constituent Performance
        </div>
        <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
          YTD return by ticker · Tile size reflects market cap · Updated weekly
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="flex items-center gap-2 mb-3">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: groupColors[g.label] }} />
              <span style={{ color: groupColors[g.label], fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {g.label}
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {g.keys.map((t) => {
                const d = heatData.find((x) => x.ticker === t)!;
                const isUp = d.ytd >= 0;
                return (
                  <div key={t} style={{ background: "#111", border: `1px solid ${isUp ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.15)"}`, borderRadius: 8, padding: "12px 14px" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ color: groupColors[g.label], fontSize: 12, fontFamily: "monospace", fontWeight: 700 }}>{d.ticker}</span>
                      <span style={{
                        background: isUp ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        color: isUp ? "#22c55e" : "#ef4444",
                        border: `1px solid ${isUp ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                        fontSize: 9, fontFamily: "monospace", padding: "1px 6px", borderRadius: 4,
                      }}>YTD</span>
                    </div>
                    <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace", marginBottom: 4 }}>{d.name}</div>
                    <div style={{ color: isUp ? "#22c55e" : "#ef4444", fontSize: 18, fontFamily: "monospace", fontWeight: 700, lineHeight: 1 }}>
                      {isUp ? "+" : ""}{d.ytd}%
                    </div>
                    <div style={{ color: "#333", fontSize: 9, fontFamily: "monospace", marginTop: 4 }}>Mcap ${d.mcapB}B</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. RELATIVE PERFORMANCE CHART
   ══════════════════════════════════════════════════════════════════════════ */

const perfDataSets: Record<string, { date: string; XLE: number; SPX: number; WTI: number }[]> = {
  "1M": [
    { date: "Mar 28", XLE: 100, SPX: 100, WTI: 100 },
    { date: "Apr 4",  XLE: 98.2, SPX: 97.4, WTI: 96.8 },
    { date: "Apr 11", XLE: 101.4, SPX: 98.1, WTI: 99.3 },
    { date: "Apr 18", XLE: 103.1, SPX: 99.5, WTI: 102.4 },
    { date: "Apr 28", XLE: 104.8, SPX: 100.6, WTI: 104.1 },
  ],
  "3M": [
    { date: "Jan 28", XLE: 100, SPX: 100, WTI: 100 },
    { date: "Feb 10", XLE: 101.2, SPX: 102.4, WTI: 98.6 },
    { date: "Feb 24", XLE: 99.8, SPX: 101.8, WTI: 97.1 },
    { date: "Mar 10", XLE: 102.3, SPX: 100.9, WTI: 101.4 },
    { date: "Mar 24", XLE: 103.6, SPX: 99.7, WTI: 103.2 },
    { date: "Apr 28", XLE: 104.8, SPX: 100.6, WTI: 104.1 },
  ],
  "YTD": [
    { date: "Jan 1",  XLE: 100, SPX: 100, WTI: 100 },
    { date: "Jan 20", XLE: 101.4, SPX: 103.2, WTI: 99.1 },
    { date: "Feb 10", XLE: 100.8, SPX: 104.1, WTI: 97.8 },
    { date: "Mar 1",  XLE: 102.6, SPX: 102.8, WTI: 101.2 },
    { date: "Mar 20", XLE: 104.1, SPX: 101.4, WTI: 103.8 },
    { date: "Apr 10", XLE: 105.2, SPX: 101.9, WTI: 104.8 },
    { date: "Apr 28", XLE: 106.3, SPX: 102.2, WTI: 105.4 },
  ],
  "1Y": [
    { date: "Apr 26",  XLE: 100, SPX: 100, WTI: 100 },
    { date: "Jun 26",  XLE: 96.4, SPX: 104.1, WTI: 94.2 },
    { date: "Aug 26",  XLE: 98.2, SPX: 107.8, WTI: 96.8 },
    { date: "Oct 26",  XLE: 102.8, SPX: 109.4, WTI: 101.4 },
    { date: "Dec 26",  XLE: 104.6, SPX: 112.1, WTI: 103.9 },
    { date: "Feb 27",  XLE: 103.2, SPX: 108.7, WTI: 101.8 },
    { date: "Apr 27",  XLE: 106.3, SPX: 110.2, WTI: 105.4 },
  ],
};

const RANGES = ["1M", "3M", "YTD", "1Y"] as const;
type Range = typeof RANGES[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PerfTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>
      <div style={{ color: "#555", marginBottom: 4, fontSize: 9 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey}: {p.value > 100 ? "+" : ""}{(p.value - 100).toFixed(1)}%
        </div>
      ))}
    </div>
  );
}

export function RelativePerformanceChart() {
  const [range, setRange] = useState<Range>("YTD");
  const data = perfDataSets[range];

  return (
    <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
            Relative Performance
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 6 }}>
            {[
              { key: "XLE", color: "#d4922a" },
              { key: "SPX", color: "#818cf8" },
              { key: "WTI", color: "#22c55e" },
            ].map((s) => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 16, height: 2, borderRadius: 1, background: s.color }} />
                <span style={{ color: s.color, fontSize: 10, fontFamily: "monospace" }}>{s.key}</span>
              </div>
            ))}
            <span style={{ color: "#444", fontSize: 10, fontFamily: "monospace" }}>Indexed to 100</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: "4px 10px",
                fontSize: 10,
                fontFamily: "monospace",
                borderRadius: 4,
                cursor: "pointer",
                background: range === r ? "rgba(212,146,42,0.15)" : "transparent",
                color: range === r ? "#d4922a" : "#444",
                border: `1px solid ${range === r ? "rgba(212,146,42,0.3)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 20, left: -10, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#555", fontFamily: "monospace" }} tickLine={false} axisLine={false} />
          <YAxis
            tick={{ fontSize: 9, fill: "#555", fontFamily: "monospace" }} tickLine={false} axisLine={false}
            domain={["dataMin - 1.5", "dataMax + 1.5"]}
            tickFormatter={(v) => `${v >= 100 ? "+" : ""}${(v - 100).toFixed(1)}%`} />
          <ReferenceLine y={100} stroke="#282828" strokeDasharray="3 4" />
          <Tooltip content={<PerfTooltip />} />
          <Line dataKey="XLE" stroke="#d4922a" strokeWidth={2} dot={false} />
          <Line dataKey="SPX" stroke="#818cf8" strokeWidth={2} dot={false} strokeDasharray="4 2" />
          <Line dataKey="WTI" stroke="#22c55e" strokeWidth={2} dot={false} strokeDasharray="6 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. OIL SENSITIVITY BUBBLE CHART
   ══════════════════════════════════════════════════════════════════════════ */

interface BubbleTick {
  ticker: string;
  oilBeta: number;
  valScore: number;
  divYield: number;
  color: string;
}

const bubbleData: BubbleTick[] = [
  { ticker: "OXY",  oilBeta: 1.62, valScore: 78, divYield: 1.8,  color: "#22c55e" },
  { ticker: "COP",  oilBeta: 1.38, valScore: 74, divYield: 2.1,  color: "#22c55e" },
  { ticker: "APA",  oilBeta: 1.51, valScore: 82, divYield: 3.2,  color: "#22c55e" },
  { ticker: "XOM",  oilBeta: 0.72, valScore: 62, divYield: 3.4,  color: "#d4922a" },
  { ticker: "CVX",  oilBeta: 0.68, valScore: 65, divYield: 4.1,  color: "#d4922a" },
  { ticker: "BP",   oilBeta: 0.81, valScore: 72, divYield: 5.2,  color: "#d4922a" },
  { ticker: "VLO",  oilBeta: 0.48, valScore: 76, divYield: 3.1,  color: "#818cf8" },
  { ticker: "MPC",  oilBeta: 0.44, valScore: 79, divYield: 2.3,  color: "#818cf8" },
  { ticker: "SLB",  oilBeta: 0.94, valScore: 48, divYield: 2.6,  color: "#94a3b8" },
  { ticker: "HAL",  oilBeta: 0.88, valScore: 51, divYield: 2.2,  color: "#94a3b8" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BubbleTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload as BubbleTick;
  if (!d) return null;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>
      <div style={{ color: d.color, fontWeight: 700, marginBottom: 4 }}>{d.ticker}</div>
      <div style={{ color: "#666" }}>Oil Beta: <span style={{ color: "#ccc" }}>{d.oilBeta.toFixed(2)}</span></div>
      <div style={{ color: "#666" }}>Value Score: <span style={{ color: "#ccc" }}>{d.valScore}</span></div>
      <div style={{ color: "#666", marginTop: 4 }}>
        Div Yield: <span style={{ color: "#22c55e", fontWeight: 700 }}>{d.divYield}%</span>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SensitivityDot(props: any) {
  const { cx, cy, payload } = props;
  if (!cx || !cy || !payload) return null;
  const r = 6 + (payload.divYield / 5.5) * 14;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.22} stroke={payload.color} strokeWidth={1.5} />
      <text x={cx} y={cy - r - 4} textAnchor="middle"
        style={{ fill: payload.color, fontSize: 9, fontFamily: "monospace", fontWeight: 700 }}>
        {payload.ticker}
      </text>
    </g>
  );
}

const scatterTick = { fill: "#666", fontSize: 9, fontFamily: "monospace" } as const;

export function OilSensitivityBubble() {
  return (
    <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
            Oil Beta vs Valuation Attractiveness
          </div>
          <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
            Upper-right = high beta + cheap · Bubble size = dividend yield
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Upstream",   color: "#22c55e" },
            { label: "Integrated", color: "#d4922a" },
            { label: "Refining",   color: "#818cf8" },
            { label: "Services",   color: "#94a3b8" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, opacity: 0.8 }} />
              <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <XAxis type="number" dataKey="oilBeta" name="Oil Beta"
            tick={scatterTick} axisLine={false} tickLine={false}
            domain={[0.3, 1.8]}
            label={{ value: "Oil Beta →", position: "insideBottomRight", offset: -4, fill: "#555", fontSize: 10, fontFamily: "monospace" }}
          />
          <YAxis type="number" dataKey="valScore" name="Value Score"
            tick={scatterTick} axisLine={false} tickLine={false}
            width={28} domain={[40, 90]}
            label={{ value: "Value ↑", angle: -90, position: "insideLeft", fill: "#555", fontSize: 10, fontFamily: "monospace" }}
          />
          <ZAxis dataKey="divYield" range={[1, 1]} />
          <Tooltip content={<BubbleTooltip />} cursor={{ stroke: "#222" }} />

          <ReferenceLine x={0.95} stroke="#282828" strokeDasharray="3 4"
            label={{ value: "Low / High Beta", position: "top", fill: "#444", fontSize: 9, fontFamily: "monospace" }} />
          <ReferenceLine y={65} stroke="#282828" strokeDasharray="3 4"
            label={{ value: "Cheap / Expensive", position: "right", fill: "#444", fontSize: 9, fontFamily: "monospace" }} />

          <Scatter data={bubbleData} shape={<SensitivityDot />} isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Quadrant legend */}
      <div className="grid grid-cols-2 gap-3 mt-3 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {[
          { q: "High Beta · Cheap Value",      desc: "Best risk/reward in oil rally — OXY, APA territory",    color: "#22c55e" },
          { q: "Low Beta · Cheap Value",        desc: "Defensive value play — refiners (VLO, MPC), BP",        color: "#818cf8" },
          { q: "High Beta · Expensive",         desc: "Expensive leverage — risk of mean reversion",           color: "#f97316" },
          { q: "Low Beta · Defensive Majors",   desc: "Stability + income focus — XOM, CVX ballast",           color: "#d4922a" },
        ].map(q => (
          <div key={q.q} className="flex items-start gap-2">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: q.color, marginTop: 3, flexShrink: 0 }} />
            <div>
              <span style={{ color: q.color, fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{q.q} — </span>
              <span style={{ color: "#666", fontSize: 10, fontFamily: "monospace" }}>{q.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. CORRELATION SPARKLINES
   ══════════════════════════════════════════════════════════════════════════ */

interface CorrSpark {
  pair: string;
  driver: string;
  current: number;
  color: string;
  data: { m: string; r: number }[];
}

const corrSparks: CorrSpark[] = [
  {
    pair: "XOM",
    driver: "Brent",
    current: 0.55,
    color: "#d4922a",
    data: [
      { m: "May", r: 0.61 }, { m: "Jun", r: 0.44 }, { m: "Jul", r: 0.38 },
      { m: "Aug", r: 0.52 }, { m: "Sep", r: 0.67 }, { m: "Oct", r: 0.71 },
      { m: "Nov", r: 0.63 }, { m: "Dec", r: 0.48 }, { m: "Jan", r: 0.40 },
      { m: "Feb", r: 0.58 }, { m: "Mar", r: 0.49 }, { m: "Apr", r: 0.55 },
    ],
  },
  {
    pair: "VLO",
    driver: "Crack Spreads",
    current: 0.78,
    color: "#818cf8",
    data: [
      { m: "May", r: 0.58 }, { m: "Jun", r: 0.72 }, { m: "Jul", r: 0.65 },
      { m: "Aug", r: 0.80 }, { m: "Sep", r: 0.74 }, { m: "Oct", r: 0.88 },
      { m: "Nov", r: 0.83 }, { m: "Dec", r: 0.69 }, { m: "Jan", r: 0.76 },
      { m: "Feb", r: 0.85 }, { m: "Mar", r: 0.71 }, { m: "Apr", r: 0.78 },
    ],
  },
  {
    pair: "OXY",
    driver: "WTI",
    current: 0.84,
    color: "#f97316",
    data: [
      { m: "May", r: 0.70 }, { m: "Jun", r: 0.63 }, { m: "Jul", r: 0.78 },
      { m: "Aug", r: 0.91 }, { m: "Sep", r: 0.86 }, { m: "Oct", r: 0.75 },
      { m: "Nov", r: 0.68 }, { m: "Dec", r: 0.82 }, { m: "Jan", r: 0.89 },
      { m: "Feb", r: 0.79 }, { m: "Mar", r: 0.73 }, { m: "Apr", r: 0.84 },
    ],
  },
  {
    pair: "SLB",
    driver: "Rig Count",
    current: 0.71,
    color: "#94a3b8",
    data: [
      { m: "May", r: 0.82 }, { m: "Jun", r: 0.76 }, { m: "Jul", r: 0.61 },
      { m: "Aug", r: 0.55 }, { m: "Sep", r: 0.63 }, { m: "Oct", r: 0.78 },
      { m: "Nov", r: 0.84 }, { m: "Dec", r: 0.79 }, { m: "Jan", r: 0.67 },
      { m: "Feb", r: 0.58 }, { m: "Mar", r: 0.64 }, { m: "Apr", r: 0.71 },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SparkTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: "6px 10px", fontFamily: "monospace", fontSize: 10 }}>
      <span style={{ color: "#666" }}>{payload[0]?.payload?.m}: </span>
      <span style={{ color: "#ccc", fontWeight: 700 }}>{payload[0]?.value?.toFixed(2)}</span>
    </div>
  );
}

export function CorrelationSparklines() {
  return (
    <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
          Rolling Correlations
        </div>
        <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
          12-month rolling Pearson r · Equity price vs primary commodity driver
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corrSparks.map((cs) => (
          <div key={cs.pair} style={{ background: "#000", border: `1px solid ${cs.color}22`, borderRadius: 8, padding: "16px 18px" }}>
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ color: cs.color, fontSize: 15, fontFamily: "monospace", fontWeight: 700 }}>{cs.pair}</span>
                  <span style={{ color: "#333", fontSize: 10, fontFamily: "monospace" }}>↔</span>
                  <span style={{ color: "#999", fontSize: 12, fontFamily: "monospace" }}>{cs.driver}</span>
                </div>
                <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace" }}>12-month rolling Pearson r</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: cs.color, fontSize: 28, fontFamily: "monospace", fontWeight: 700, lineHeight: 1 }}>
                  {cs.current.toFixed(2)}
                </div>
                <div style={{ color: "#444", fontSize: 9, fontFamily: "monospace", marginTop: 2 }}>current</div>
              </div>
            </div>
            {/* Sparkline — full black, tall */}
            <div style={{ background: "#000", borderRadius: 4, border: "1px solid #111", padding: "10px 4px 6px" }}>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={cs.data} margin={{ top: 6, right: 8, left: 8, bottom: 6 }}>
                  <YAxis domain={["dataMin - 0.06", "dataMax + 0.06"]} hide />
                  <ReferenceLine y={cs.current} stroke={cs.color} strokeDasharray="3 2" strokeOpacity={0.25} />
                  <Tooltip content={<SparkTooltip />} />
                  <Line dataKey="r" stroke={cs.color} strokeWidth={2.5} dot={false} type="monotone" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ color: "#444", fontSize: 9, fontFamily: "monospace" }}>
                {cs.data[0].m} {new Date().getFullYear() - 1}
              </span>
              <span style={{ color: "#444", fontSize: 9, fontFamily: "monospace" }}>
                {cs.data[cs.data.length - 1].m} {new Date().getFullYear()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5. CATALYST TIMELINE
   ══════════════════════════════════════════════════════════════════════════ */

type CatCategory = "Earnings" | "OPEC" | "EIA" | "Fed" | "Dividend";

interface CatEvent {
  date: string;
  event: string;
  ticker?: string;
  category: CatCategory;
}

const catColors: Record<CatCategory, { text: string; bg: string; border: string }> = {
  Earnings: { text: "#d4922a", bg: "rgba(212,146,42,0.12)", border: "rgba(212,146,42,0.3)"  },
  OPEC:     { text: "#f97316", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.3)"  },
  EIA:      { text: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.3)"   },
  Fed:      { text: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)" },
  Dividend: { text: "#818cf8", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.3)"  },
};

const catalystEvents: CatEvent[] = [
  { date: "Apr 30", event: "EIA WPSR Release",                    category: "EIA"      },
  { date: "May 1",  event: "Fed FOMC Decision",                    category: "Fed"      },
  { date: "May 2",  event: "XOM Q1 Earnings",  ticker: "XOM",     category: "Earnings" },
  { date: "May 2",  event: "CVX Q1 Earnings",  ticker: "CVX",     category: "Earnings" },
  { date: "May 5",  event: "OPEC+ Ministerial",                    category: "OPEC"     },
  { date: "May 7",  event: "EIA WPSR Release",                     category: "EIA"      },
  { date: "May 8",  event: "VLO Q1 Earnings",  ticker: "VLO",     category: "Earnings" },
  { date: "May 9",  event: "MPC Q1 Earnings",  ticker: "MPC",     category: "Earnings" },
  { date: "May 12", event: "OXY Dividend Ex-Date", ticker: "OXY", category: "Dividend" },
  { date: "May 16", event: "SLB Q1 Earnings",  ticker: "SLB",     category: "Earnings" },
];

export function CatalystTimeline() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "18px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
          Upcoming Catalysts
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 8 }}>
          {(Object.keys(catColors) as CatCategory[]).map((k) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: catColors[k].bg, border: `1px solid ${catColors[k].border}` }} />
              <span style={{ color: catColors[k].text, fontSize: 9, fontFamily: "monospace" }}>{k}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 47, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {catalystEvents.map((ev, i) => {
              const c = catColors[ev.category];
              return (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "default",
                           opacity: hovered !== null && hovered !== i ? 0.35 : 1,
                           transition: "opacity 0.15s" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{ width: 40, flexShrink: 0, textAlign: "right" }}>
                    <span style={{ color: "#444", fontSize: 10, fontFamily: "monospace" }}>{ev.date}</span>
                  </div>
                  <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.text, border: `2px solid ${c.border}`, position: "relative", zIndex: 1 }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`,
                                   fontSize: 9, fontFamily: "monospace", padding: "2px 7px", borderRadius: 4 }}>
                      {ev.category}
                    </span>
                    <span style={{ color: "#e2e8f0", fontSize: 13, fontFamily: "monospace" }}>{ev.event}</span>
                    {ev.ticker && (
                      <span style={{ background: "rgba(212,146,42,0.08)", color: "#d4922a",
                                     border: "1px solid rgba(212,146,42,0.2)",
                                     fontSize: 9, fontFamily: "monospace", padding: "2px 6px", borderRadius: 4 }}>
                        {ev.ticker}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ color: "#333", fontSize: 10, fontFamily: "monospace" }}>
          * Dates are illustrative. Verify against official IR pages and CME / EIA / Fed schedules.
        </span>
      </div>
    </div>
  );
}
