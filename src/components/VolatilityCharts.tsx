"use client";

import {
  LineChart, Line, AreaChart, Area,
  ComposedChart, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceArea, ReferenceLine,
} from "recharts";
import { OvxDataPoint } from "@/data/briefs";

interface Props {
  data: OvxDataPoint[];
  ovxLevel: number;
  realizedVol: number;
  vrp: number;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(s: string) {
  const [, m, d] = s.split("-");
  return `${MONTHS[parseInt(m) - 1]} ${parseInt(d)}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OvxTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0f0f0f", border: "1px solid #222", borderRadius: 6, padding: "6px 10px", fontSize: 10, fontFamily: "monospace" }}>
      <div style={{ color: "#555", marginBottom: 3 }}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value?.toFixed(1)}
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DivTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0f0f0f", border: "1px solid #222", borderRadius: 6, padding: "6px 10px", fontSize: 10, fontFamily: "monospace" }}>
      <div style={{ color: "#555", marginBottom: 3 }}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {p.name === "WTI" ? `$${p.value?.toFixed(2)}` : p.value?.toFixed(1)}
        </div>
      ))}
    </div>
  );
}

const tick = { fill: "#333", fontSize: 9, fontFamily: "monospace" };

const CARD: React.CSSProperties = {
  background: "#080808",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "14px 16px",
};

const CHART_TITLE: React.CSSProperties = {
  color: "var(--muted)",
  fontSize: 11,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const READ_LABEL: React.CSSProperties = {
  color: "var(--accent)",
  fontWeight: 600,
};

const READ_BODY: React.CSSProperties = {
  color: "var(--text-secondary)",
};

const READ_WRAP: React.CSSProperties = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: "1px solid var(--border-subtle)",
  fontSize: 12,
  lineHeight: 1.65,
};

export default function VolatilityCharts({ data, vrp }: Props) {
  const labeled = data.map(d => ({ ...d, label: fmtDate(d.date) }));
  const interval = Math.floor(labeled.length / 6);
  const maxOvx   = Math.max(...data.map(d => d.ovx), ...data.map(d => d.rv));
  const maxWti   = Math.max(...data.map(d => d.wti));
  const minWti   = Math.min(...data.map(d => d.wti));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Row 1 — OVX Trend | Implied vs Realized */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12 }}>

        {/* Chart A: OVX Trend */}
        <div style={CARD}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={CHART_TITLE}>OVX Trend</span>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "CALM", color: "rgba(34,197,94,0.6)" },
                { label: "ELEVATED", color: "rgba(234,179,8,0.6)" },
                { label: "STRESSED", color: "rgba(249,115,22,0.6)" },
                { label: "PANIC", color: "rgba(239,68,68,0.6)" },
              ].map(z => (
                <div key={z.label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: z.color }} />
                  <span style={{ color: "#555", fontSize: 8, fontFamily: "monospace" }}>{z.label}</span>
                </div>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={labeled} margin={{ top: 4, right: 8, left: 0, bottom: 2 }}>
              <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} interval={interval} />
              <YAxis tick={tick} axisLine={false} tickLine={false} domain={[0, Math.ceil(maxOvx / 10) * 10 + 10]} width={28} tickFormatter={v => `${v}`} />
              <Tooltip content={<OvxTooltip />} />
              <ReferenceArea y1={0}   y2={35}  fill="rgba(34,197,94,0.05)"  stroke="none" />
              <ReferenceArea y1={35}  y2={50}  fill="rgba(234,179,8,0.05)"  stroke="none" />
              <ReferenceArea y1={50}  y2={70}  fill="rgba(249,115,22,0.05)" stroke="none" />
              <ReferenceArea y1={70}  y2={135} fill="rgba(239,68,68,0.05)"  stroke="none" />
              <ReferenceLine y={35} stroke="#333" strokeDasharray="2 4" strokeWidth={1} />
              <ReferenceLine y={50} stroke="#333" strokeDasharray="2 4" strokeWidth={1} />
              <ReferenceLine y={70} stroke="#333" strokeDasharray="2 4" strokeWidth={1} />
              <Line type="monotone" dataKey="ovx" name="OVX" stroke="#ef4444" strokeWidth={2}
                dot={false} activeDot={{ r: 3, fill: "#ef4444" }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Explanation below OVX Trend */}
          <div style={READ_WRAP}>
            <span style={READ_LABEL}>Read-through: </span>
            <span style={READ_BODY}>
              OVX spiked to 120.9 on 11 Mar amid the geopolitical shock, then faded as the acute panic unwound. At 73.0 the market remains in the <em>panic</em> zone (&gt;70) but the downtrend in implied vol signals fear is being repriced lower. A sustained break below 70 would confirm the stress regime is normalizing. Zone boundaries: Calm &lt;35 · Elevated 35–50 · Stressed 50–70 · Panic &gt;70.
            </span>
          </div>
        </div>

        {/* Chart B: Implied vs Realized */}
        <div style={CARD}>
          <div style={{ marginBottom: 12 }}>
            <span style={CHART_TITLE}>Implied vs Realized Vol</span>
          </div>
          <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
            {[
              { label: "OVX — Implied", color: "#ef4444" },
              { label: "20D RV — Realized", color: "#3b82f6" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
                <span style={{ color: "#555", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={labeled} margin={{ top: 4, right: 8, left: 0, bottom: 2 }}>
              <defs>
                <linearGradient id="ovxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="rvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} interval={interval} />
              <YAxis tick={tick} axisLine={false} tickLine={false} width={28} tickFormatter={v => `${v}`} />
              <Tooltip content={<OvxTooltip />} />
              <Area type="monotone" dataKey="rv"  name="20D RV" stroke="#3b82f6" strokeWidth={1.8}
                fill="url(#rvGrad)"  dot={false} activeDot={{ r: 2 }} isAnimationActive={false} />
              <Area type="monotone" dataKey="ovx" name="OVX" stroke="#ef4444" strokeWidth={1.8}
                fill="url(#ovxGrad)" dot={false} activeDot={{ r: 2 }} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>

          <div style={READ_WRAP}>
            <span style={READ_LABEL}>VRP: </span>
            <span style={{ color: vrp < 0 ? "#3b82f6" : "#ef4444", fontWeight: 700 }}>
              {vrp > 0 ? "+" : ""}{vrp.toFixed(1)} pts —{" "}
            </span>
            <span style={READ_BODY}>
              {vrp < -10
                ? "Realized vol is running well above implied. Options are cheap relative to actual price risk — unusual and typically signals the market is underpricing tail risk or options sellers are in control post-spike."
                : vrp > 10
                ? "Implied vol trades significantly above realized. Options are expensive; hedging demand is elevated relative to actual moves. A positive VRP favors options sellers."
                : "Implied and realized vol near parity. No significant risk premium in either direction."}
            </span>
          </div>
        </div>
      </div>

      {/* Row 2 — WTI vs OVX Divergence */}
      <div style={CARD}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={CHART_TITLE}>WTI Price vs OVX Divergence</span>
          <div style={{ display: "flex", gap: 14, marginLeft: "auto" }}>
            {[
              { label: "WTI Price", color: "#d4922a" },
              { label: "OVX", color: "#ef4444" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
                <span style={{ color: "#555", fontSize: 9, fontFamily: "monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart data={labeled} margin={{ top: 4, right: 34, left: 0, bottom: 2 }}>
            <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} interval={interval} />
            <YAxis yAxisId="wti" tick={tick} axisLine={false} tickLine={false} width={32}
              domain={[Math.floor(minWti / 10) * 10 - 5, Math.ceil(maxWti / 10) * 10 + 5]}
              tickFormatter={v => `$${v}`} />
            <YAxis yAxisId="ovx" orientation="right" tick={tick} axisLine={false} tickLine={false}
              width={28} domain={[0, Math.ceil(maxOvx / 10) * 10 + 10]} />
            <Tooltip content={<DivTooltip />} />
            <Line yAxisId="wti" type="monotone" dataKey="wti" name="WTI"
              stroke="#d4922a" strokeWidth={2} dot={false}
              activeDot={{ r: 3, fill: "#d4922a" }} isAnimationActive={false} />
            <Line yAxisId="ovx" type="monotone" dataKey="ovx" name="OVX"
              stroke="#ef4444" strokeWidth={1.8} strokeDasharray="4 2" dot={false}
              activeDot={{ r: 3, fill: "#ef4444" }} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>

        <div style={READ_WRAP}>
          <span style={READ_LABEL}>Read-through: </span>
          <span style={READ_BODY}>
            Through January and February WTI and OVX moved broadly together as the market repriced a tightening supply outlook — rising price, rising fear, a classic stress build. The correlation then broke sharply in early March: WTI surged to a peak above <span style={{ color: "#d4922a" }}>$113</span> while OVX simultaneously spiked to <span style={{ color: "#ef4444" }}>120.9</span>, a supply-shock panic regime where extreme uncertainty was priced into both legs. Since the April peak, the two series have diverged in opposite directions — WTI has pulled back to the mid-$90s while OVX has fallen faster, now at <span style={{ color: "#ef4444" }}>73.0</span>. OVX declining ahead of price stabilization is a risk-on normalization signal: the fear premium is deflating before a fundamental price floor is confirmed, which historically precedes a vol compression trade as the acute shock fades.
          </span>
        </div>
      </div>

    </div>
  );
}
