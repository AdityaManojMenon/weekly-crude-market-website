"use client";

import {
  ComposedChart, AreaChart, Area, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, ReferenceArea,
} from "recharts";

// ─── Graph 10: Commercial Crude Stocks vs 5Y Avg ──────────────────────────────
// Weekly crude inventories + 5Y range band (min/max/avg)
const stocks = [
  { week:"Jan 11", current:470.2, avg5y:436.1, min5y:408.2, max5y:478.5 },
  { week:"Jan 18", current:468.9, avg5y:434.8, min5y:407.1, max5y:476.2 },
  { week:"Jan 25", current:467.4, avg5y:433.5, min5y:406.0, max5y:473.9 },
  { week:"Feb 1",  current:465.8, avg5y:432.2, min5y:404.9, max5y:471.6 },
  { week:"Feb 8",  current:464.1, avg5y:431.0, min5y:403.8, max5y:469.3 },
  { week:"Feb 15", current:463.3, avg5y:430.1, min5y:403.0, max5y:467.8 },
  { week:"Feb 22", current:461.9, avg5y:429.5, min5y:402.5, max5y:466.7 },
  { week:"Mar 1",  current:460.2, avg5y:429.1, min5y:402.1, max5y:465.9 },
  { week:"Mar 8",  current:457.6, avg5y:428.8, min5y:401.8, max5y:465.3 },
  { week:"Mar 15", current:455.1, avg5y:428.6, min5y:401.6, max5y:464.9 },
  { week:"Mar 22", current:453.4, avg5y:428.5, min5y:401.5, max5y:464.7 },
  { week:"Mar 29", current:452.1, avg5y:428.6, min5y:401.6, max5y:464.9 },
  { week:"Apr 5",  current:464.7, avg5y:429.0, min5y:402.0, max5y:465.5 },
  { week:"Apr 12", current:463.8, avg5y:429.4, min5y:402.4, max5y:466.2 },
];

// ─── Graph 11: Cushing Stocks + Z-score ───────────────────────────────────────
const cushing = [
  { week:"Jan 11", stocks:28.2, zscore: 0.3 },
  { week:"Jan 18", stocks:27.9, zscore: 0.2 },
  { week:"Jan 25", stocks:27.4, zscore: 0.0 },
  { week:"Feb 1",  stocks:27.0, zscore:-0.1 },
  { week:"Feb 8",  stocks:26.5, zscore:-0.3 },
  { week:"Feb 15", stocks:26.2, zscore:-0.4 },
  { week:"Feb 22", stocks:25.8, zscore:-0.6 },
  { week:"Mar 1",  stocks:25.3, zscore:-0.8 },
  { week:"Mar 8",  stocks:24.9, zscore:-1.0 },
  { week:"Mar 15", stocks:24.4, zscore:-1.2 },
  { week:"Mar 22", stocks:24.0, zscore:-1.4 },
  { week:"Mar 29", stocks:23.7, zscore:-1.5 },
  { week:"Apr 5",  stocks:25.5, zscore:-0.9 },
  { week:"Apr 12", stocks:23.8, zscore:-1.4 },
];

// ─── Tooltips ─────────────────────────────────────────────────────────────────

const tipStyle = {
  background:"#0a0a0a", border:"1px solid #222",
  borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11,
};
const tipLabel = { color:"#555", marginBottom:4, fontSize:9 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StockTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const cur  = payload.find((p: { dataKey: string }) => p.dataKey === "current")?.value as number | undefined;
  const avg  = payload.find((p: { dataKey: string }) => p.dataKey === "avg5y")?.value as number | undefined;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {cur !== undefined && (
        <div style={{ color:"#d4922a", fontWeight:700, marginBottom:2 }}>
          Current: {cur.toFixed(1)} MMbbl
        </div>
      )}
      {avg !== undefined && (
        <div style={{ color:"#555" }}>5Y avg: {avg.toFixed(1)} MMbbl</div>
      )}
      {cur !== undefined && avg !== undefined && (
        <div style={{ color: cur > avg ? "#ef4444" : "#22c55e", fontSize:9, marginTop:3 }}>
          {cur > avg ? `+${(cur - avg).toFixed(1)} above avg` : `${(cur - avg).toFixed(1)} below avg`}
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CushTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const s = payload.find((p: { dataKey: string }) => p.dataKey === "stocks")?.value as number | undefined;
  const z = payload.find((p: { dataKey: string }) => p.dataKey === "zscore")?.value as number | undefined;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {s !== undefined && (
        <div style={{ color:"#3b82f6", fontWeight:700, marginBottom:2 }}>Stocks: {s.toFixed(1)} MMbbl</div>
      )}
      {z !== undefined && (
        <div style={{ color: z < -1 ? "#22c55e" : z > 1 ? "#ef4444" : "#eab308", fontWeight:700 }}>
          Z-score: {z.toFixed(2)}
        </div>
      )}
    </div>
  );
}

const tick = { fill:"#666", fontSize:9, fontFamily:"monospace" };

const CARD_STYLE = {
  background:"#080808", border:"1px solid var(--border)",
  borderRadius:8, padding:"18px 20px",
};

function Bullets({ items, color = "#d4922a" }: { items: string[]; color?: string }) {
  return (
    <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid var(--border-subtle)" }}>
      <div style={{ color:"var(--accent)", fontSize:11, fontFamily:"monospace", fontWeight:700, marginBottom:6 }}>Read-through</div>
      <div style={{ display:"flex", flexDirection:"column" as const, gap:4 }}>
        {items.map((b, i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
            <span style={{ color, fontSize:11, flexShrink:0, marginTop:1 }}>·</span>
            <span style={{ color:"#666", fontSize:11, fontFamily:"monospace", lineHeight:1.5 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ForecastStorageCharts() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* ── Section D label ── */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:3, height:24, borderRadius:2, background:"var(--accent)", flexShrink:0 }} />
        <div>
          <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const }}>
            Storage
          </div>
          <div style={{ color:"#555", fontSize:10, fontFamily:"monospace", marginTop:1 }}>
            Crude inventory levels vs seasonal norms and delivery-point tightness
          </div>
        </div>
      </div>

      {/* Graphs 10 + 11 — side by side */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>

      {/* Graph 10 — Commercial Stocks vs 5Y Avg */}
      <div style={CARD_STYLE}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:3 }}>
              Commercial Crude Stocks vs 5Y Avg
            </div>
            <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
              MMbbl — shaded band = 5Y min/max range
            </div>
          </div>
          <div style={{ textAlign:"right" as const }}>
            <div style={{ color:"#d4922a", fontSize:16, fontFamily:"monospace", fontWeight:700 }}>463.8 MMbbl</div>
            <div style={{ color:"#ef4444", fontSize:10, fontFamily:"monospace", fontWeight:700, marginTop:2 }}>
              +34.4 above 5Y avg
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display:"flex", gap:12, marginBottom:12, flexWrap:"wrap" as const }}>
          {[
            { color:"#d4922a",              label:"Current" },
            { color:"#3b82f6",              label:"5Y avg", dash:true },
            { color:"rgba(59,130,246,0.15)", label:"5Y range" },
          ].map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
              {l.color.startsWith("rgba") ? (
                <div style={{ width:12, height:9, background:l.color, borderRadius:2, border:"1px solid rgba(59,130,246,0.35)" }} />
              ) : (
                <div style={{ width:14, height:2, background:l.color, borderRadius:1 }} />
              )}
              <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={stocks} margin={{ top:4, right:10, left:0, bottom:2 }}>
            <defs>
              <linearGradient id="curGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#d4922a" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#d4922a" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={50}
              tickFormatter={v => `${v}`} domain={[395, 485]}
              label={{ value:"MMbbl", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />
            <Tooltip content={<StockTip />} />

            <ReferenceArea y1={401} y2={479} fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.12)" strokeDasharray="3 4" />
            <Line type="monotone" dataKey="avg5y" name="5Y Avg"
              stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 3"
              dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="current" name="Current"
              stroke="#d4922a" strokeWidth={2.5}
              dot={{ r:2.5, fill:"#d4922a", strokeWidth:0 }}
              activeDot={{ r:4 }} isAnimationActive={false} />
            <ReferenceLine y={429} stroke="rgba(59,130,246,0.2)" strokeDasharray="2 6" />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Surplus bar */}
        <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid var(--border-subtle)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
            <span style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>Surplus vs 5Y avg</span>
            <span style={{ color:"#ef4444", fontSize:11, fontFamily:"monospace", fontWeight:700 }}>+34.4 MMbbl</span>
          </div>
          <div style={{ height:5, borderRadius:3, background:"#1a1a1a", overflow:"hidden" }}>
            <div style={{ height:5, borderRadius:3, width:`${Math.min((34.4/80)*100,100)}%`, background:"linear-gradient(90deg,#ef444460,#ef4444)" }} />
          </div>
        </div>

        <Bullets items={[
          "463.8 MMbbl — +34.4 above 5Y avg, bearish overhang",
          "Drawdown: Jan peak 470 → Apr 463 (−6.2 in 14 weeks)",
          "Converging toward avg range but still elevated",
          "Apr 5 spike reversed quickly — data timing anomaly",
        ]} />
      </div>

      {/* Graph 11 — Cushing Stocks + Z-score */}
      <div style={CARD_STYLE}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <div>
            <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:3 }}>
              Cushing, OK Stocks + Z-score
            </div>
            <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>
              WTI delivery point inventory — Z-score vs 5Y seasonal avg (right axis)
            </div>
          </div>
          <div style={{ textAlign:"right" as const }}>
            <div style={{ color:"#3b82f6", fontSize:18, fontFamily:"monospace", fontWeight:700 }}>23.8 MMbbl</div>
            <div style={{ color:"#22c55e", fontSize:10, fontFamily:"monospace", fontWeight:700, marginTop:2 }}>
              Z-score −1.4 — tighter than normal
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display:"flex", gap:18, marginBottom:12 }}>
          {[
            { color:"#3b82f6", label:"Cushing stocks" },
            { color:"#22c55e", label:"Z-score (right axis)", dash:true },
          ].map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:14, height:2, background:l.color, borderRadius:1 }} />
              <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={cushing} margin={{ top:4, right:38, left:0, bottom:2 }}>
            <defs>
              <linearGradient id="cushGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />

            {/* Left axis: stock level */}
            <YAxis yAxisId="stocks" tick={tick} axisLine={false} tickLine={false} width={46}
              tickFormatter={v => `${v}`} domain={[22, 30]}
              label={{ value:"MMbbl", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />

            {/* Right axis: z-score */}
            <YAxis yAxisId="zscore" orientation="right" tick={{ fill:"#666", fontSize:8, fontFamily:"monospace" }}
              axisLine={false} tickLine={false} width={40}
              tickFormatter={v => v.toFixed(1)} domain={[-2, 1]}
              label={{ value:"Z-score", angle:90, position:"insideRight", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:-20 }} />

            <Tooltip content={<CushTip />} />

            {/* Z-score reference bands */}
            <ReferenceArea yAxisId="zscore" y1={-1} y2={1}
              fill="rgba(234,179,8,0.04)" stroke="rgba(234,179,8,0.08)" strokeDasharray="2 4" />
            <ReferenceLine yAxisId="zscore" y={0} stroke="#333" strokeWidth={1} />
            <ReferenceLine yAxisId="zscore" y={-1} stroke="#22c55e22" strokeDasharray="2 4" />
            <ReferenceLine yAxisId="zscore" y={1}  stroke="#ef444422" strokeDasharray="2 4" />

            {/* Cushing stock area */}
            <Area yAxisId="stocks" type="monotone" dataKey="stocks" name="Cushing"
              stroke="#3b82f6" strokeWidth={2.5} fill="url(#cushGrad)"
              dot={false} activeDot={{ r:4 }} isAnimationActive={false} />

            {/* Z-score line */}
            <Line yAxisId="zscore" type="monotone" dataKey="zscore" name="Z-score"
              stroke="#22c55e" strokeWidth={2} strokeDasharray="4 3"
              dot={{ r:2, fill:"#22c55e", strokeWidth:0 }}
              activeDot={{ r:3 }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Z-score gauge */}
        <div style={{ marginTop:12, padding:"10px 14px", borderRadius:6, background:"rgba(34,197,94,0.06)", border:"1px solid rgba(34,197,94,0.15)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ color:"#555", fontSize:9, fontFamily:"monospace", marginBottom:2 }}>CURRENT Z-SCORE</div>
            <div style={{ color:"#22c55e", fontSize:20, fontFamily:"monospace", fontWeight:700 }}>−1.4</div>
          </div>
          <div style={{ textAlign:"right" as const }}>
            <div style={{ color:"#22c55e", fontSize:11, fontFamily:"monospace", fontWeight:700 }}>TIGHT</div>
            <div style={{ color:"#555", fontSize:9, fontFamily:"monospace" }}>Below −1σ seasonal avg</div>
            <div style={{ color:"#444", fontSize:9, fontFamily:"monospace", marginTop:2 }}>
              {"< −1 = bullish contango risk  |  > +1 = bearish surplus"}
            </div>
          </div>
        </div>

        <Bullets color="#3b82f6" items={[
          "Cushing at 23.8 MMbbl — multi-year low for this time of year",
          "Z-score −1.4: 1.4 std deviations below seasonal norm — structurally tight",
          "Tight Cushing = supports WTI backwardation and CL1–CL2 spread premium",
          "Apr 5 anomaly spike was delivery-point dislocation — reversed quickly",
          "Continued draws at Cushing are the primary catalyst for prompt strength",
        ]} />
      </div>

      </div>{/* end grid */}

    </div>
  );
}
