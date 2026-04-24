"use client";

import {
  ComposedChart, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea, Line,
} from "recharts";

// ─── Brent-WTI spread history ────────────────────────────────────────────────
const spreadData = [
  { week: "Jan 18", spread:  4.69 },
  { week: "Jan 25", spread:  4.81 },
  { week: "Feb 1",  spread:  5.48 },
  { week: "Feb 8",  spread:  4.50 },
  { week: "Feb 15", spread:  4.86 },
  { week: "Feb 22", spread:  5.37 },
  { week: "Mar 1",  spread:  5.46 },
  { week: "Mar 8",  spread:  1.79 },
  { week: "Mar 15", spread:  4.43 },
  { week: "Mar 22", spread: 13.87 },
  { week: "Mar 29", spread: 12.93 },
  { week: "Apr 5",  spread: -2.51 },
  { week: "Apr 12", spread: -1.37 },
  { week: "Apr 19", spread:  4.70 },
];

// Pre-shock "normal" range derived from Jan-Feb avg ± 1 std dev ≈ $3–6
const NORMAL_LOW  = 3.0;
const NORMAL_HIGH = 6.2;
const THREE_M_AVG = 5.37;

// ─── Grade differentials vs WTI / Brent ─────────────────────────────────────
const gradeDiffs = [
  { grade: "Midland / WTI",   diff: -0.20, ref: "WTI",   color: "#d4922a" },
  { grade: "Bakken / WTI",    diff: -1.00, ref: "WTI",   color: "#f59e0b" },
  { grade: "Bonny Lt / Brent",diff: -1.20, ref: "Brent", color: "#22c55e" },
  { grade: "Mars / WTI",      diff: -3.50, ref: "WTI",   color: "#3b82f6" },
  { grade: "Dubai / Brent",   diff: -2.80, ref: "Brent", color: "#8b5cf6" },
  { grade: "Urals / Brent",   diff: -8.50, ref: "Brent", color: "#ef4444" },
];

// ─── Tooltips ────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SpreadTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={{ background:"#0a0a0a", border:"1px solid #222", borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>
      <div style={{ color:"#555", marginBottom:4, fontSize:9 }}>{label}</div>
      <div style={{ color: v > NORMAL_HIGH ? "#f59e0b" : v < 0 ? "#ef4444" : "#22c55e", fontWeight:700 }}>
        Brent–WTI: ${v?.toFixed(2)}/bbl
      </div>
      <div style={{ color:"#444", fontSize:9, marginTop:3 }}>
        vs 3M avg {v > THREE_M_AVG ? "▲ wide" : "▼ narrow"} (${THREE_M_AVG}/bbl)
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DiffTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value as number;
  return (
    <div style={{ background:"#0a0a0a", border:"1px solid #222", borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11 }}>
      <div style={{ color:"#555", marginBottom:4, fontSize:9 }}>{label}</div>
      <div style={{ color: v > -1 ? "#22c55e" : v > -4 ? "#eab308" : "#ef4444", fontWeight:700 }}>
        {v?.toFixed(2)} $/bbl vs benchmark
      </div>
    </div>
  );
}

const tick = { fill:"#666", fontSize:9, fontFamily:"monospace" };

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ArbChartsB() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

      {/* 2-col: Spread chart | Grade diff bar */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:12 }}>

        {/* Graph 4 — Brent-WTI Spread + z-score band */}
        <div style={{ background:"#080808", border:"1px solid var(--border)", borderRadius:8, padding:"18px 20px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>
                Brent–WTI Spread
              </div>
              <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
                Wider spread = US crude more competitive for export
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              {[
                { label:`3M Avg $${THREE_M_AVG}`, color:"#666" },
                { label:"Normal Range", color:"rgba(59,130,246,0.6)" },
              ].map(l => (
                <div key={l.label} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <div style={{ width:14, height:2, background:l.color, borderRadius:1 }} />
                  <span style={{ color:"#555", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={spreadData} margin={{ top:4, right:8, left:0, bottom:2 }}>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={30}
                tickFormatter={v => `$${v}`} domain={[-4, 15]} />
              <Tooltip content={<SpreadTip />} />

              <ReferenceArea y1={NORMAL_LOW} y2={NORMAL_HIGH}
                fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeDasharray="3 4" />
              <ReferenceLine y={0} stroke="#333" strokeWidth={1} />
              <ReferenceLine y={THREE_M_AVG} stroke="#555" strokeDasharray="3 5" strokeWidth={1}
                label={{ value:`$${THREE_M_AVG} avg`, position:"insideTopRight", fill:"#555", fontSize:8, fontFamily:"monospace" }} />

              <Line type="monotone" dataKey="spread" name="Brent–WTI"
                stroke="#d4922a" strokeWidth={2} dot={{ r:2.5, fill:"#d4922a", strokeWidth:0 }}
                activeDot={{ r:4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>

          <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border-subtle)" }}>
            <div style={{ color:"var(--accent)", fontSize:11, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>
              Read-through
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {[
                "Brent-WTI peaked at $13.87 late March — geopolitical risk premium absorbed",
                "Swung negative Apr 5 ($-2.51) — Cushing delivery-point dislocation",
                "Recovered to $4.70 — back within normal range but below $5.37 avg",
                "Below avg = incomplete recovery — spread still compressing",
              ].map((b, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:"#d4922a", fontSize:11, flexShrink:0, marginTop:1 }}>·</span>
                  <span style={{ color:"#666", fontSize:11, fontFamily:"monospace", lineHeight:1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Graph 5 — Grade Differentials bar */}
        <div style={{ background:"#080808", border:"1px solid var(--border)", borderRadius:8, padding:"18px 20px" }}>
          <div style={{ marginBottom:14 }}>
            <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:3 }}>
              Grade Differentials
            </div>
            <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
              Below zero = discount vs benchmark · Closer to 0 = premium grade
            </div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={gradeDiffs} layout="vertical" margin={{ top:4, right:10, left:0, bottom:2 }}>
              <XAxis type="number" tick={tick} axisLine={false} tickLine={false}
                tickFormatter={v => `$${v}`} domain={[-10, 1]} />
              <YAxis type="category" dataKey="grade" tick={{ ...tick, fontSize:8, fill:"#777" }}
                axisLine={false} tickLine={false} width={95} />
              <Tooltip content={<DiffTip />} />
              <ReferenceLine x={0} stroke="#333" strokeWidth={1} />
              <Bar dataKey="diff" isAnimationActive={false}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                shape={(props: any) => {
                  const { x, y, width, height, index } = props;
                  const color = gradeDiffs[index]?.color ?? "#888";
                  return (
                    <rect
                      x={width < 0 ? x + width : x}
                      y={y + 1}
                      width={Math.abs(width)}
                      height={Math.max(height - 2, 1)}
                      fill={color}
                      fillOpacity={0.75}
                      rx={3}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border-subtle)" }}>
            <div style={{ color:"var(--accent)", fontSize:11, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>
              Read-through
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {[
                "Midland / Bakken near flat vs WTI — premium light sweet grades",
                "Mars at −$3.50 — wide discount supports USGC coker economics",
                "Urals at −$8.50 vs Brent — sanctions discount persistent structural",
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

    </div>
  );
}
