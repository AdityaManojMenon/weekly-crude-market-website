"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";

const history = [
  { week: "Jan 18", usgcEur: 1.2, usgcAsia: 0.8, wafEur: 1.0 },
  { week: "Jan 25", usgcEur: 1.4, usgcAsia: 0.6, wafEur: 1.2 },
  { week: "Feb 1",  usgcEur: 1.8, usgcAsia: 0.9, wafEur: 1.3 },
  { week: "Feb 8",  usgcEur: 1.5, usgcAsia: 0.7, wafEur: 1.1 },
  { week: "Feb 15", usgcEur: 1.6, usgcAsia: 0.8, wafEur: 1.3 },
  { week: "Feb 22", usgcEur: 1.9, usgcAsia: 1.0, wafEur: 1.5 },
  { week: "Mar 1",  usgcEur: 2.2, usgcAsia: 0.8, wafEur: 1.6 },
  { week: "Mar 8",  usgcEur: 3.8, usgcAsia: 1.2, wafEur: 2.4 },
  { week: "Mar 15", usgcEur: 4.5, usgcAsia: 1.5, wafEur: 2.8 },
  { week: "Mar 22", usgcEur: 5.2, usgcAsia: 1.8, wafEur: 3.1 },
  { week: "Mar 29", usgcEur: 4.8, usgcAsia: 1.4, wafEur: 2.6 },
  { week: "Apr 5",  usgcEur: 3.2, usgcAsia: 0.9, wafEur: 2.0 },
  { week: "Apr 12", usgcEur: 2.8, usgcAsia: 0.6, wafEur: 1.8 },
  { week: "Apr 19", usgcEur: 2.4, usgcAsia: 0.5, wafEur: 1.7 },
];

const ROUTES = [
  { key: "usgcEur",  label: "USGC → Europe", color: "#d4922a" },
  { key: "usgcAsia", label: "USGC → Asia",   color: "#3b82f6" },
  { key: "wafEur",   label: "WAF → Europe",  color: "#22c55e" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArbTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0a0a0a", border: "1px solid #222",
      borderRadius: 8, padding: "8px 12px", fontSize: 11, fontFamily: "monospace",
    }}>
      <div style={{ color: "#555", marginBottom: 5, fontSize: 10 }}>{label}</div>
      {payload.map((p: { name: string; value: number; color: string }) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <span style={{ fontWeight: 700 }}>${p.value?.toFixed(2)}/bbl</span>
          <span style={{ color: p.value > 1.5 ? "#22c55e" : p.value > 0.5 ? "#eab308" : "#ef4444", marginLeft: 6, fontSize: 9 }}>
            {p.value > 1.5 ? "● OPEN" : p.value > 0.5 ? "◐ MARGINAL" : "○ CLOSED"}
          </span>
        </div>
      ))}
    </div>
  );
}

const tick = { fill: "#666", fontSize: 9, fontFamily: "monospace" };

export default function ArbRouteChart() {
  return (
    <div style={{
      background: "#080808", border: "1px solid var(--border)",
      borderRadius: 8, padding: "18px 20px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>
            Historical Route Netback
          </div>
          <div style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
            Higher = better route economics · Above $1.50 = arb open
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {ROUTES.map(r => (
            <div key={r.key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 16, height: 2, background: r.color, borderRadius: 1 }} />
              <span style={{ color: "#666", fontSize: 9, fontFamily: "monospace" }}>{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={history} margin={{ top: 4, right: 10, left: 0, bottom: 2 }}>
          <XAxis dataKey="week" tick={tick} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={tick} axisLine={false} tickLine={false} width={32}
            tickFormatter={v => `$${v}`}
            domain={[-0.5, 6]} />
          <Tooltip content={<ArbTooltip />} />
          <ReferenceLine y={0}   stroke="#222" strokeWidth={1} />
          <ReferenceLine y={0.5} stroke="#333" strokeDasharray="2 4" strokeWidth={1} label={{ value: "CLOSURE", position: "insideTopRight", fill: "#444", fontSize: 8, fontFamily: "monospace" }} />
          <ReferenceLine y={1.5} stroke="#333" strokeDasharray="2 4" strokeWidth={1} label={{ value: "ARB OPEN", position: "insideTopRight", fill: "#444", fontSize: 8, fontFamily: "monospace" }} />
          {ROUTES.map(r => (
            <Line key={r.key} type="monotone" dataKey={r.key} name={r.label}
              stroke={r.color} strokeWidth={2} dot={false}
              activeDot={{ r: 3, fill: r.color }} isAnimationActive={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ color: "var(--accent)", fontSize: 11, fontFamily: "monospace", fontWeight: 700, marginBottom: 6 }}>
          Read-through
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            "USGC→Europe peaked at $5.20 in late March — compressed 54% to $2.40 today",
            "Still the #1 route — remains above open threshold",
            "USGC→Asia at $0.50 approaching closure — freight cost eroding margin",
            "WAF→Europe holds at $1.70 on persistent light crude availability",
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ color: "#d4922a", fontSize: 11, flexShrink: 0, marginTop: 1 }}>·</span>
              <span style={{ color: "#666", fontSize: 11, fontFamily: "monospace", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
