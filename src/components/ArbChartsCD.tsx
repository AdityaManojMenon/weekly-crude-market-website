"use client";

import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  Tooltip, ResponsiveContainer, ReferenceLine,
  BarChart, Bar, LabelList,
} from "recharts";

// ─── Grade database for scatter ──────────────────────────────────────────────
const grades = [
  { grade: "WTI Midland",   api: 40.5, sulfur: 0.22, score: 88, color: "#d4922a" },
  { grade: "Bakken",        api: 42.0, sulfur: 0.18, score: 82, color: "#f59e0b" },
  { grade: "Bonny Light",   api: 35.4, sulfur: 0.12, score: 77, color: "#22c55e" },
  { grade: "Forties",       api: 38.0, sulfur: 0.35, score: 72, color: "#16a34a" },
  { grade: "Mars",          api: 27.9, sulfur: 1.82, score: 52, color: "#3b82f6" },
  { grade: "Dubai",         api: 31.0, sulfur: 2.00, score: 44, color: "#8b5cf6" },
  { grade: "Urals",         api: 31.5, sulfur: 1.50, score: 28, color: "#ef4444" },
  { grade: "WCS",           api: 21.0, sulfur: 3.50, score: 18, color: "#dc2626" },
];

// ─── Margin by region ────────────────────────────────────────────────────────
const margins = [
  { region: "USGC",      crack: 47.55, color: "#d4922a" },
  { region: "Europe",    crack: 38.20, color: "#3b82f6" },
  { region: "Singapore", crack: 32.40, color: "#8b5cf6" },
];

// ─── Tooltips ────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScatterTip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{ background:"#0a0a0a", border:"1px solid #222", borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>
      <div style={{ color: d.color, fontWeight:700, marginBottom:4 }}>{d.grade}</div>
      <div style={{ color:"#666" }}>API: <span style={{ color:"#ccc" }}>{d.api}°</span></div>
      <div style={{ color:"#666" }}>Sulfur: <span style={{ color:"#ccc" }}>{d.sulfur}%</span></div>
      <div style={{ color:"#666", marginTop:4 }}>
        Opportunity: <span style={{ color: d.score >= 70 ? "#22c55e" : d.score >= 45 ? "#eab308" : "#ef4444", fontWeight:700 }}>
          {d.score}/100
        </span>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MarginTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={{ background:"#0a0a0a", border:"1px solid #222", borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>
      <div style={{ color:"#555", marginBottom:4, fontSize:9 }}>{label}</div>
      <div style={{ color:"#d4922a", fontWeight:700 }}>${v?.toFixed(2)}/bbl crack</div>
    </div>
  );
}

const tick = { fill:"#666", fontSize:9, fontFamily:"monospace" };

// Custom scatter dot with grade label
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GradeDot(props: any) {
  const { cx, cy, payload } = props;
  const r = 6 + (payload.score / 100) * 12;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.25} stroke={payload.color} strokeWidth={1.5} />
      <text x={cx} y={cy - r - 4} textAnchor="middle"
        style={{ fill: payload.color, fontSize: 9, fontFamily: "monospace", fontWeight: 700 }}>
        {payload.grade.split(" ")[0]}
      </text>
    </g>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ArbChartsCD() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* Graph 6 — API vs Sulfur Scatter */}
      <div style={{ background:"#080808", border:"1px solid var(--border)", borderRadius:8, padding:"18px 20px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>
              API Gravity vs Sulfur Content
            </div>
            <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
              Upper-right = best grade (high API, low sulfur) · Bubble size = opportunity score
            </div>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            {[
              { label:"Score 70+",  color:"#22c55e" },
              { label:"Score 45–70", color:"#eab308" },
              { label:"Score <45",   color:"#ef4444" },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:l.color, opacity:0.7 }} />
                <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={290}>
          <ScatterChart margin={{ top:20, right:20, left:0, bottom:10 }}>
            <XAxis type="number" dataKey="api" name="API°" tick={tick} axisLine={false} tickLine={false}
              domain={[15, 48]} label={{ value:"API Gravity (°)", position:"insideBottom", offset:-4, fill:"#555", fontSize:10, fontFamily:"monospace" }} />
            <YAxis type="number" dataKey="sulfur" name="Sulfur %" tick={tick} axisLine={false} tickLine={false}
              width={30} domain={[0, 4]}
              label={{ value:"Sulfur %", angle:-90, position:"insideLeft", fill:"#555", fontSize:10, fontFamily:"monospace" }} />
            <ZAxis dataKey="score" range={[200, 1200]} />
            <Tooltip content={<ScatterTip />} />

            <ReferenceLine x={35}  stroke="#282828" strokeDasharray="3 4"
              label={{ value:"Light / Medium", position:"top", fill:"#444", fontSize:9, fontFamily:"monospace" }} />
            <ReferenceLine y={1.0} stroke="#282828" strokeDasharray="3 4"
              label={{ value:"Sweet / Sour", position:"right", fill:"#444", fontSize:9, fontFamily:"monospace" }} />

            <Scatter data={grades} shape={<GradeDot />} isAnimationActive={false} />
          </ScatterChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-3 mt-3 pt-3" style={{ borderTop:"1px solid var(--border-subtle)" }}>
          {[
            { q:"Light Sweet (API>35, S<1%)",   desc:"Broadest demand — best arb optionality", color:"#22c55e" },
            { q:"Light Sour (API>35, S>1%)",    desc:"Good economics — complex refineries only", color:"#eab308" },
            { q:"Medium Sweet (API<35, S<1%)",  desc:"Moderate discount — crack-dependent",  color:"#3b82f6" },
            { q:"Heavy Sour (API<35, S>1%)",    desc:"Deep discount — coking / hydro only", color:"#ef4444" },
          ].map(q => (
            <div key={q.q} className="flex items-start gap-2">
              <div style={{ width:6, height:6, borderRadius:"50%", background:q.color, marginTop:3, flexShrink:0 }} />
              <div>
                <span style={{ color:q.color, fontSize:10, fontFamily:"monospace", fontWeight:700 }}>{q.q} — </span>
                <span style={{ color:"#666", fontSize:10, fontFamily:"monospace" }}>{q.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graph 8 — Margin by Region bar */}
      <div style={{ background:"#080808", border:"1px solid var(--border)", borderRadius:8, padding:"18px 20px" }}>
        <div style={{ marginBottom:14 }}>
          <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>
            Refining Margin by Region
          </div>
          <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
            Higher = better margin · USGC leads — favors continued US crude exports
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={margins} margin={{ top:4, right:10, left:0, bottom:4 }}>
            <XAxis dataKey="region" tick={{ ...tick, fontSize:11, fill:"#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={28}
              tickFormatter={v => `$${v}`} domain={[0, 55]} />
            <Tooltip content={<MarginTip />} />
            <Bar dataKey="crack" maxBarSize={72} isAnimationActive={false}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              shape={(props: any) => {
                const { x, y, width, height, index } = props;
                const color = margins[index]?.color ?? "#888";
                return (
                  <rect x={x} y={y} width={width} height={height}
                    fill={color} fillOpacity={0.8} rx={4} />
                );
              }}
            >
              <LabelList dataKey="crack" position="top"
                formatter={(v: string | number | null | undefined) => typeof v === "number" ? `$${v.toFixed(1)}` : (v ?? "")}
                style={{ fill:"#aaa", fontSize:11, fontFamily:"monospace", fontWeight:700 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border-subtle)" }}>
          <div style={{ color:"var(--accent)", fontSize:11, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>
            Read-through
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {[
              "USGC at $47.55 — widest margin on strong gasoline + distillate cracks",
              "$9.35 premium over Europe — incentivizes US crude exports to Atlantic Basin",
              "$15.15 premium over Singapore — Asia demand signal structurally weak",
              "Regional gap favors continued USGC refiner feedstock demand",
            ].map((b, i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ color:"#d4922a", fontSize:11, flexShrink:0, marginTop:1 }}>·</span>
                <span style={{ color:"#666", fontSize:11, fontFamily:"monospace", lineHeight:1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
