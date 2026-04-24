"use client";

import {
  LineChart, Line, AreaChart, Area,
  ComposedChart, Bar, XAxis, YAxis, YAxisProps,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";

// ─── Shared weekly spine (14 weeks) ──────────────────────────────────────────

const WEEKS = [
  "Jan 11","Jan 18","Jan 25","Feb 1","Feb 8","Feb 15",
  "Feb 22","Mar 1","Mar 8","Mar 15","Mar 22","Mar 29",
  "Apr 5","Apr 12",
];

// ─── Graph 4: U.S. Production ─────────────────────────────────────────────────
const production = [
  { week:"Jan 11", prod:13.5, avg13:13.44 },
  { week:"Jan 18", prod:13.5, avg13:13.45 },
  { week:"Jan 25", prod:13.5, avg13:13.46 },
  { week:"Feb 1",  prod:13.5, avg13:13.47 },
  { week:"Feb 8",  prod:13.5, avg13:13.47 },
  { week:"Feb 15", prod:13.6, avg13:13.48 },
  { week:"Feb 22", prod:13.6, avg13:13.49 },
  { week:"Mar 1",  prod:13.6, avg13:13.50 },
  { week:"Mar 8",  prod:13.6, avg13:13.51 },
  { week:"Mar 15", prod:13.6, avg13:13.52 },
  { week:"Mar 22", prod:13.6, avg13:13.53 },
  { week:"Mar 29", prod:13.6, avg13:13.54 },
  { week:"Apr 5",  prod:13.6, avg13:13.55 },
  { week:"Apr 12", prod:13.6, avg13:13.55 },
];
const prodYoY = +1.4; // %

// ─── Graph 5: Imports vs Exports ──────────────────────────────────────────────
const tradeFlow = [
  { week:"Jan 11", imports:7.1, exports:3.8, net:3.3 },
  { week:"Jan 18", imports:6.9, exports:4.0, net:2.9 },
  { week:"Jan 25", imports:6.8, exports:4.1, net:2.7 },
  { week:"Feb 1",  imports:7.0, exports:3.9, net:3.1 },
  { week:"Feb 8",  imports:6.7, exports:4.2, net:2.5 },
  { week:"Feb 15", imports:6.8, exports:4.1, net:2.7 },
  { week:"Feb 22", imports:6.9, exports:4.0, net:2.9 },
  { week:"Mar 1",  imports:6.6, exports:4.3, net:2.3 },
  { week:"Mar 8",  imports:6.5, exports:4.5, net:2.0 },
  { week:"Mar 15", imports:6.7, exports:4.4, net:2.3 },
  { week:"Mar 22", imports:6.8, exports:4.3, net:2.5 },
  { week:"Mar 29", imports:6.9, exports:4.2, net:2.7 },
  { week:"Apr 5",  imports:6.8, exports:4.2, net:2.6 },
  { week:"Apr 12", imports:6.8, exports:4.2, net:2.6 },
];

// ─── Graph 6: SPR Stocks ──────────────────────────────────────────────────────
const spr = [
  { week:"Jan 11", stocks:347.2 },
  { week:"Jan 18", stocks:347.8 },
  { week:"Jan 25", stocks:348.5 },
  { week:"Feb 1",  stocks:349.1 },
  { week:"Feb 8",  stocks:349.0 },
  { week:"Feb 15", stocks:348.6 },
  { week:"Feb 22", stocks:348.2 },
  { week:"Mar 1",  stocks:347.9 },
  { week:"Mar 8",  stocks:347.4 },
  { week:"Mar 15", stocks:347.0 },
  { week:"Mar 22", stocks:346.5 },
  { week:"Mar 29", stocks:346.2 },
  { week:"Apr 5",  stocks:345.8 },
  { week:"Apr 12", stocks:345.4 },
];

// ─── Graph 7: Refinery Utilization ───────────────────────────────────────────
const refUtil = [
  { week:"Jan 11", util:88.2, seasonal:86.5 },
  { week:"Jan 18", util:87.8, seasonal:86.9 },
  { week:"Jan 25", util:88.5, seasonal:87.3 },
  { week:"Feb 1",  util:88.1, seasonal:87.7 },
  { week:"Feb 8",  util:87.9, seasonal:88.0 },
  { week:"Feb 15", util:89.2, seasonal:88.2 },
  { week:"Feb 22", util:89.6, seasonal:88.4 },
  { week:"Mar 1",  util:90.1, seasonal:88.6 },
  { week:"Mar 8",  util:90.5, seasonal:88.8 },
  { week:"Mar 15", util:91.2, seasonal:89.0 },
  { week:"Mar 22", util:91.5, seasonal:89.2 },
  { week:"Mar 29", util:91.0, seasonal:89.3 },
  { week:"Apr 5",  util:87.2, seasonal:89.5 },
  { week:"Apr 12", util:89.6, seasonal:89.6 },
];

// ─── Graph 8: Refinery Crude Inputs ──────────────────────────────────────────
const refInputs = [
  { week:"Jan 11", runs:15.8 },
  { week:"Jan 18", runs:15.7 },
  { week:"Jan 25", runs:15.9 },
  { week:"Feb 1",  runs:15.8 },
  { week:"Feb 8",  runs:15.8 },
  { week:"Feb 15", runs:16.0 },
  { week:"Feb 22", runs:16.1 },
  { week:"Mar 1",  runs:16.2 },
  { week:"Mar 8",  runs:16.3 },
  { week:"Mar 15", runs:16.4 },
  { week:"Mar 22", runs:16.4 },
  { week:"Mar 29", runs:16.3 },
  { week:"Apr 5",  runs:15.6 },
  { week:"Apr 12", runs:16.1 },
];

// ─── Graph 9: Product Supplied ────────────────────────────────────────────────
const products = [
  { week:"Jan 11", gasoline:8.5, distillate:4.1, jet:1.6 },
  { week:"Jan 18", gasoline:8.4, distillate:4.3, jet:1.7 },
  { week:"Jan 25", gasoline:8.6, distillate:4.0, jet:1.7 },
  { week:"Feb 1",  gasoline:8.8, distillate:3.9, jet:1.8 },
  { week:"Feb 8",  gasoline:8.7, distillate:3.8, jet:1.8 },
  { week:"Feb 15", gasoline:8.9, distillate:3.7, jet:1.9 },
  { week:"Feb 22", gasoline:8.8, distillate:3.8, jet:1.9 },
  { week:"Mar 1",  gasoline:9.0, distillate:3.9, jet:2.0 },
  { week:"Mar 8",  gasoline:9.1, distillate:3.8, jet:2.0 },
  { week:"Mar 15", gasoline:9.2, distillate:4.0, jet:2.1 },
  { week:"Mar 22", gasoline:9.3, distillate:4.1, jet:2.1 },
  { week:"Mar 29", gasoline:9.1, distillate:4.0, jet:2.0 },
  { week:"Apr 5",  gasoline:9.0, distillate:3.9, jet:2.0 },
  { week:"Apr 12", gasoline:9.2, distillate:3.8, jet:2.0 },
];

// ─── Tooltips ─────────────────────────────────────────────────────────────────

const tipStyle = {
  background:"#0a0a0a", border:"1px solid #222",
  borderRadius:8, padding:"8px 12px", fontFamily:"monospace", fontSize:11,
};
const tipLabel = { color:"#555", marginBottom:4, fontSize:9 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProdTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color, marginBottom:1 }}>
          {p.name}: <span style={{ fontWeight:700 }}>{p.value?.toFixed(1)} MMbbl/d</span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TradeTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color, marginBottom:1 }}>
          {p.name}: <span style={{ fontWeight:700 }}>{p.value?.toFixed(1)} MMbbl/d</span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SprTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      <div style={{ color:"#8b5cf6", fontWeight:700 }}>{payload[0]?.value?.toFixed(1)} MMbbl</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UtilTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color, marginBottom:1 }}>
          {p.name}: <span style={{ fontWeight:700 }}>{p.value?.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RunsTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      <div style={{ color:"#d4922a", fontWeight:700 }}>{payload[0]?.value?.toFixed(1)} MMbbl/d</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProdSupTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tipStyle}>
      <div style={tipLabel}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color, marginBottom:1 }}>
          {p.name}: <span style={{ fontWeight:700 }}>{p.value?.toFixed(1)} MMbbl/d</span>
        </div>
      ))}
    </div>
  );
}

const tick = { fill:"#666", fontSize:9, fontFamily:"monospace" };
const tickSm = { fill:"#666", fontSize:8, fontFamily:"monospace" };

const CARD_STYLE = {
  background:"#080808", border:"1px solid var(--border)",
  borderRadius:8, padding:"18px 20px",
};

function ChartTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:3 }}>
        {title}
      </div>
      <div style={{ color:"#555", fontSize:10, fontFamily:"monospace" }}>{sub}</div>
    </div>
  );
}

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

// Suppress unused import warning — WEEKS used as length reference
void WEEKS;

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ForecastSupplyDemandCharts() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

      {/* ── Section B label ── */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:3, height:24, borderRadius:2, background:"var(--accent)", flexShrink:0 }} />
        <div>
          <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const }}>
            Supply
          </div>
          <div style={{ color:"#555", fontSize:10, fontFamily:"monospace", marginTop:1 }}>
            Production, trade flows, and strategic reserves
          </div>
        </div>
      </div>

      {/* Graph 4 + 5 side by side */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>

        {/* Graph 4 — Production Trend */}
        <div style={CARD_STYLE}>
          <ChartTitle title="U.S. Production Trend" sub="MMbbl/d — weekly output vs 13-week rolling avg" />
          <div style={{ display:"flex", gap:20, marginBottom:10 }}>
            {[
              { color:"#d4922a", label:"Weekly production" },
              { color:"#555",    label:"13-week avg", dash:true },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:16, height:2, background:l.color, borderRadius:1, borderTop: l.dash ? "1px dashed" : "none" }} />
                <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
              </div>
            ))}
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ color:"#22c55e", fontSize:9, fontFamily:"monospace", fontWeight:700 }}>YoY +{prodYoY}%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={production} margin={{ top:4, right:8, left:0, bottom:2 }}>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={48}
                tickFormatter={v => `${v.toFixed(1)}`} domain={[13.3, 13.8]}
                label={{ value:"MMbbl/d", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />
              <Tooltip content={<ProdTip />} />
              <Line type="monotone" dataKey="avg13" name="13W Avg"
                stroke="#555" strokeWidth={1.5} strokeDasharray="4 3"
                dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="prod" name="Production"
                stroke="#d4922a" strokeWidth={2.5}
                dot={{ r:2.5, fill:"#d4922a", strokeWidth:0 }}
                activeDot={{ r:4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <Bullets items={[
            "Production flat at 13.6 MMbbl/d — plateaued near record highs",
            "YoY growth +1.4% — Permian Basin driving marginal gains",
            "13W avg trending up slowly — no structural decline signal",
          ]} />
        </div>

        {/* Graph 5 — Imports vs Exports */}
        <div style={CARD_STYLE}>
          <ChartTitle title="Imports vs Exports" sub="MMbbl/d — net import trend (imports minus exports)" />
          <div style={{ display:"flex", gap:16, marginBottom:10 }}>
            {[
              { color:"#ef4444", label:"Imports" },
              { color:"#22c55e", label:"Exports" },
              { color:"#3b82f6", label:"Net imports", dash:true },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:14, height:2, background:l.color, borderRadius:1 }} />
                <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={tradeFlow} margin={{ top:4, right:8, left:0, bottom:2 }}>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
              <YAxis yAxisId="left" tick={tick} axisLine={false} tickLine={false} width={46}
                tickFormatter={v => `${v.toFixed(1)}`} domain={[2, 8]}
                label={{ value:"MMbbl/d", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />
              <YAxis yAxisId="right" orientation="right" tick={tickSm} axisLine={false} tickLine={false}
                width={36} tickFormatter={v => `${v.toFixed(1)}`} domain={[1.5, 4]}
                label={{ value:"Net (MMbbl/d)", angle:90, position:"insideRight", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:-18 }} />
              <Tooltip content={<TradeTip />} />
              <Line yAxisId="left" type="monotone" dataKey="imports" name="Imports"
                stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line yAxisId="left" type="monotone" dataKey="exports" name="Exports"
                stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
              <Line yAxisId="right" type="monotone" dataKey="net" name="Net imports"
                stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 3" dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <Bullets items={[
            "Exports rising to 4.2 MMbbl/d — USGC→Europe arb supporting demand",
            "Net imports compressing to 2.6 — reducing supply-side inventory pressure",
            "Import decline reflects higher domestic output displacing foreign barrels",
          ]} />
        </div>
      </div>

      {/* Graph 6 — SPR Stocks (full width) */}
      <div style={CARD_STYLE}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
          <ChartTitle title="Strategic Petroleum Reserve (SPR)" sub="MMbbl — current stocks vs depletion trajectory" />
          <div style={{ textAlign:"right" as const }}>
            <div style={{ color:"#8b5cf6", fontSize:18, fontFamily:"monospace", fontWeight:700 }}>345.4 MMbbl</div>
            <div style={{ color:"#555", fontSize:9, fontFamily:"monospace", marginTop:2 }}>Current level · WoW −0.4</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={spr} margin={{ top:4, right:12, left:0, bottom:2 }}>
            <defs>
              <linearGradient id="sprGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={36}
              tickFormatter={v => `${v}`} domain={[344, 350]} />
            <Tooltip content={<SprTip />} />
            <Area type="monotone" dataKey="stocks" name="SPR Stocks"
              stroke="#8b5cf6" strokeWidth={2} fill="url(#sprGrad)"
              dot={false} activeDot={{ r:4 }} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
        <Bullets color="#8b5cf6" items={[
          "SPR at 345.4 MMbbl — down from 349.1 peak in early February",
          "Gradual drawdown continues — no emergency release in progress",
          "Refill pace insufficient to offset current depletion trajectory",
          "Pre-2022 drawdown level was ~594 MMbbl — current ~58% of historical capacity",
        ]} />
      </div>

      {/* ── Section C label ── */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:4 }}>
        <div style={{ width:3, height:24, borderRadius:2, background:"var(--accent)", flexShrink:0 }} />
        <div>
          <div style={{ color:"#fff", fontSize:13, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const }}>
            Demand
          </div>
          <div style={{ color:"#555", fontSize:10, fontFamily:"monospace", marginTop:1 }}>
            Refinery activity and product consumption
          </div>
        </div>
      </div>

      {/* Graph 7 + 8 side by side */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>

        {/* Graph 7 — Refinery Utilization */}
        <div style={CARD_STYLE}>
          <ChartTitle title="Refinery Utilization" sub="% of operable capacity — vs seasonal 5Y average" />
          <div style={{ display:"flex", gap:16, marginBottom:10 }}>
            {[
              { color:"#22c55e", label:"Utilization %" },
              { color:"#444",    label:"Seasonal avg" },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:14, height:2, background:l.color, borderRadius:1 }} />
                <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={refUtil} margin={{ top:4, right:8, left:0, bottom:2 }}>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={30}
                tickFormatter={v => `${v}%`} domain={[85, 94]} />
              <Tooltip content={<UtilTip />} />
              <ReferenceLine y={90} stroke="#222" strokeDasharray="2 4"
                label={{ value:"90%", position:"insideTopRight", fill:"#333", fontSize:8, fontFamily:"monospace" }} />
              <Line type="monotone" dataKey="seasonal" name="Seasonal avg"
                stroke="#444" strokeWidth={1.5} strokeDasharray="4 3" dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="util" name="Utilization"
                stroke="#22c55e" strokeWidth={2.5}
                dot={{ r:2.5, fill:"#22c55e", strokeWidth:0 }}
                activeDot={{ r:4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <Bullets color="#22c55e" items={[
            "Utilization at 89.6% — above seasonal avg of 89.6% (tracking flat)",
            "Peaked at 91.5% in late March — pulled back on maintenance",
            "Apr 5 dip to 87.2% — weather/maintenance-driven, recovering",
            "Rising runs = bullish demand signal for crude draws",
          ]} />
        </div>

        {/* Graph 8 — Refinery Inputs */}
        <div style={CARD_STYLE}>
          <ChartTitle title="Refinery Crude Inputs" sub="MMbbl/d — crude runs into refineries each week" />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={refInputs} margin={{ top:4, right:8, left:0, bottom:2 }}>
              <defs>
                <linearGradient id="runsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#d4922a" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#d4922a" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={46}
                tickFormatter={v => `${v.toFixed(1)}`} domain={[15.2, 16.8]}
                label={{ value:"MMbbl/d", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />
              <Tooltip content={<RunsTip />} />
              <ReferenceLine y={16.0} stroke="#222" strokeDasharray="2 4"
                label={{ value:"16.0 avg", position:"insideTopRight", fill:"#333", fontSize:8, fontFamily:"monospace" }} />
              <Bar dataKey="runs" name="Crude Runs" fill="url(#runsGrad)"
                stroke="#d4922a" strokeWidth={1} maxBarSize={24} radius={[2,2,0,0]}
                isAnimationActive={false} />
              <Line type="monotone" dataKey="runs" name="Crude Runs"
                stroke="#d4922a" strokeWidth={2.5} dot={{ r:2.5, fill:"#d4922a", strokeWidth:0 }}
                activeDot={{ r:4 }} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <Bullets items={[
            "Crude inputs at 16.1 MMbbl/d — recovering after Apr 5 dip to 15.6",
            "Strong runs from Jan–Mar confirm sustained refinery demand",
            "Each +0.1 MMbbl/d run increase removes ~0.7 MMbbl/week from crude stocks",
          ]} />
        </div>
      </div>

      {/* Graph 9 — Product Supplied (full width) */}
      <div style={CARD_STYLE}>
        <ChartTitle title="Product Supplied" sub="MMbbl/d — implied demand by product category (4-week avg basis)" />
        <div style={{ display:"flex", gap:20, marginBottom:10 }}>
          {[
            { color:"#d4922a", label:"Gasoline" },
            { color:"#3b82f6", label:"Distillate" },
            { color:"#22c55e", label:"Jet / Kerosene" },
          ].map(l => (
            <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:16, height:2, background:l.color, borderRadius:1 }} />
              <span style={{ color:"#666", fontSize:9, fontFamily:"monospace" }}>{l.label}</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={products} margin={{ top:4, right:12, left:0, bottom:2 }}>
            <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={tick} axisLine={false} tickLine={false} width={46}
              tickFormatter={v => `${v.toFixed(1)}`} domain={[1.0, 10.0]}
              label={{ value:"MMbbl/d", angle:-90, position:"insideLeft", fill:"#fff", fontSize:10, fontFamily:"monospace", fontWeight:700, dx:18 }} />
            <Tooltip content={<ProdSupTip />} />
            <ReferenceLine y={9.0} stroke="#d4922a22" strokeDasharray="2 4" />
            <Line type="monotone" dataKey="gasoline" name="Gasoline"
              stroke="#d4922a" strokeWidth={2.5} dot={false} activeDot={{ r:4 }} isAnimationActive={false} />
            <Line type="monotone" dataKey="distillate" name="Distillate"
              stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r:3 }} isAnimationActive={false} />
            <Line type="monotone" dataKey="jet" name="Jet / Kerosene"
              stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r:3 }} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
        <Bullets items={[
          "Gasoline supplied up to 9.2 MMbbl/d — strong early-season driving demand",
          "Distillate at 3.8 — slightly below Jan highs but stable",
          "Jet supply rising to 2.0 — aviation recovery continuing steadily",
          "All three products above prior-year levels — demand signal supportive of draws",
        ]} />
      </div>

    </div>
  );
}
