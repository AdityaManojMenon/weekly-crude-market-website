"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SpreadDataPoint } from "@/data/briefs";

interface Props {
  data: SpreadDataPoint[];
  currentSpread: number;
}

interface EnrichedPoint extends SpreadDataPoint {
  wowChange: number;
  regime: "widening" | "narrowing" | "flat";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as EnrichedPoint;
  const changeColor =
    d.regime === "widening" ? "#ef4444" : d.regime === "narrowing" ? "#22c55e" : "#94a3b8";
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #1e1e1e",
        borderRadius: 4,
        padding: "6px 10px",
        fontSize: 11,
        fontFamily: "monospace",
        minWidth: 130,
      }}
    >
      <div style={{ color: "#6b6b6b", marginBottom: 2 }}>{d.day}</div>
      <div style={{ color: "#d4922a", fontWeight: 600 }}>+${d.value.toFixed(2)}/bbl</div>
      {d.wowChange !== 0 && (
        <div style={{ color: changeColor, fontSize: 10, marginTop: 2 }}>
          WoW: {d.wowChange > 0 ? "+" : ""}{d.wowChange.toFixed(2)} · {d.regime}
        </div>
      )}
    </div>
  );
}

export default function BrentWtiChart({ data, currentSpread }: Props) {
  const enriched: EnrichedPoint[] = data.map((d, i) => {
    const prev = data[i - 1];
    const wowChange = prev ? +(d.value - prev.value).toFixed(2) : 0;
    const regime: EnrichedPoint["regime"] =
      wowChange > 0.1 ? "widening" : wowChange < -0.1 ? "narrowing" : "flat";
    return { ...d, wowChange, regime };
  });

  const values = data.map((d) => d.value);
  const avg = +(values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const pad = (maxVal - minVal) * 0.35;
  const yDomain: [number, number] = [Math.max(0, minVal - pad), maxVal + pad];

  const currentVsAvg = +(currentSpread - avg).toFixed(2);
  const isWide = currentSpread > avg;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* regime badge */}
      <div
        style={{
          display: "inline-block",
          fontSize: 10,
          fontFamily: "monospace",
          padding: "3px 10px",
          borderRadius: 4,
          background: isWide ? "rgba(239,68,68,0.07)" : "rgba(34,197,94,0.07)",
          border: `1px solid ${isWide ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
          color: isWide ? "#ef4444" : "#22c55e",
          alignSelf: "flex-start",
        }}
      >
        {isWide ? "▲ WIDENING — above 3M avg" : "▼ NARROWING — compressing toward 3M avg"}
      </div>

      {/* chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={enriched} margin={{ top: 8, right: 8, left: 0, bottom: 2 }}>
          <XAxis
            dataKey="day"
            tick={{ fill: "#3a3a3a", fontSize: 8, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis hide domain={yDomain} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={avg}
            stroke="#2a2a2a"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#d4922a"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: "#d4922a" }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          paddingTop: 8,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        {[
          { label: "3M AVG",  value: `+$${avg.toFixed(2)}`,                                              sub: "rolling avg",              color: "#6b6b6b" },
          { label: "CURRENT", value: `${currentSpread >= 0 ? "+$" : "-$"}${Math.abs(currentSpread).toFixed(2)}`, sub: data[data.length - 1]?.day, color: "#d4922a" },
          { label: "vs AVG",  value: `${currentVsAvg >= 0 ? "+" : ""}$${currentVsAvg.toFixed(2)}`,       sub: isWide ? "wide" : "tight",  color: isWide ? "#ef4444" : "#22c55e" },
        ].map(({ label, value, sub, color }) => (
          <div key={label}>
            <div style={{ color: "var(--muted)", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.06em" }}>{label}</div>
            <div style={{ color, fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{value}</div>
            <div style={{ color: "var(--muted)", fontSize: 9, fontFamily: "monospace" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Insight boxes ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 10, borderTop: "1px solid var(--border-subtle)" }}>

        {/* Relative Value Signal */}
        <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ color: "#3a3a3a", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.08em", marginBottom: 8 }}>
            RELATIVE VALUE SIGNAL
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {([
              { range: "> $6",  label: "Tight seaborne / WTI structurally weak",  color: "#ef4444", active: currentSpread > 6 },
              { range: "$3–6",  label: "Normal Brent premium — no dislocation",    color: "#94a3b8", active: currentSpread >= 3 && currentSpread <= 6 },
              { range: "< $2",  label: "Weak Brent premium — Brent-side softness", color: "#f59e0b", active: currentSpread >= 0 && currentSpread < 2 },
              { range: "< $0",  label: "US tightness / export pull on WTI",        color: "#3b82f6", active: currentSpread < 0 },
            ] as { range: string; label: string; color: string; active: boolean }[]).map(({ range, label, color, active }) => (
              <div key={range} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", borderRadius: 4,
                background: active ? `${color}10` : "transparent",
                border: active ? `1px solid ${color}30` : "1px solid transparent",
              }}>
                <span style={{ color, fontFamily: "monospace", fontSize: 10, fontWeight: 700, minWidth: 36 }}>{range}</span>
                <span style={{ color: active ? "#aaa" : "#3a3a3a", fontSize: 10, fontFamily: "monospace" }}>{label}</span>
                {active && <span style={{ marginLeft: "auto", color, fontSize: 9, fontFamily: "monospace", fontWeight: 700 }}>◀ NOW</span>}
              </div>
            ))}
          </div>
        </div>

        {/* RV Trade Lens — redesigned */}
        {(() => {
          const brentActive  = currentSpread > 6;
          const wtiActive    = currentSpread < 3;
          const neutralActive = !brentActive && !wtiActive;

          // gauge: map spread onto -3 … +15 scale
          const G_MIN = -3, G_MAX = 15, G_RANGE = G_MAX - G_MIN;
          const toPos = (v: number) =>
            `${Math.min(100, Math.max(0, ((v - G_MIN) / G_RANGE) * 100)).toFixed(1)}%`;
          const nowPos  = toPos(currentSpread);
          const t1Pos   = toPos(3);   // WTI threshold
          const t2Pos   = toPos(6);   // Brent threshold

          const toWti    = +(currentSpread - 3).toFixed(2);  // distance above WTI trigger
          const toBrent  = +(6 - currentSpread).toFixed(2);  // distance below Brent trigger

          return (
            <div style={{ background: "#080808", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 12px" }}>

              {/* header */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: "#3a3a3a", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.08em" }}>
                  RV TRADE LENS
                </span>
                <span style={{
                  marginLeft: "auto",
                  fontSize: 9, fontFamily: "monospace", fontWeight: 700, padding: "2px 8px", borderRadius: 3,
                  background: brentActive ? "rgba(239,68,68,0.1)" : wtiActive ? "rgba(34,197,94,0.1)" : "rgba(148,163,184,0.06)",
                  border: `1px solid ${brentActive ? "rgba(239,68,68,0.25)" : wtiActive ? "rgba(34,197,94,0.25)" : "rgba(148,163,184,0.15)"}`,
                  color: brentActive ? "#ef4444" : wtiActive ? "#22c55e" : "#94a3b8",
                }}>
                  {brentActive ? "● BRENT SIGNAL ACTIVE" : wtiActive ? "● WTI SIGNAL ACTIVE" : "○ NEUTRAL — NO SIGNAL"}
                </span>
              </div>

              {/* gauge bar */}
              <div style={{ position: "relative", marginBottom: 6 }}>
                {/* zones */}
                <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", gap: 1 }}>
                  <div style={{ width: t1Pos, background: wtiActive ? "rgba(34,197,94,0.25)" : "rgba(34,197,94,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#22c55e", fontSize: 7, fontFamily: "monospace", whiteSpace: "nowrap" }}>WTI &lt;$3</span>
                  </div>
                  <div style={{ flex: 1, background: neutralActive ? "rgba(212,146,42,0.12)" : "rgba(148,163,184,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: neutralActive ? "#d4922a" : "#333", fontSize: 7, fontFamily: "monospace" }}>NEUTRAL $3–$6</span>
                  </div>
                  <div style={{ width: `${(100 - parseFloat(t2Pos)).toFixed(1)}%`, background: brentActive ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#ef4444", fontSize: 7, fontFamily: "monospace", whiteSpace: "nowrap" }}>BRENT &gt;$6</span>
                  </div>
                </div>
                {/* current position marker */}
                <div style={{ position: "absolute", top: 0, left: nowPos, transform: "translateX(-50%)", pointerEvents: "none" }}>
                  <div style={{ width: 2, height: 18, background: "#d4922a" }} />
                </div>
              </div>

              {/* NOW label under the marker */}
              <div style={{ position: "relative", height: 14, marginBottom: 10 }}>
                <div style={{ position: "absolute", left: nowPos, transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#d4922a", fontSize: 8, fontFamily: "monospace", fontWeight: 700 }}>
                    ▲ ${currentSpread.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Distance callouts */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "5px 8px", borderRadius: 4, background: "#0a0a0a",
                border: "1px solid var(--border-subtle)",
              }}>
                <span style={{ fontSize: 9, fontFamily: "monospace", color: wtiActive ? "#22c55e" : "#3a3a3a" }}>
                  {wtiActive
                    ? `◀ WTI signal — ${Math.abs(toWti).toFixed(2)} below $3.00`
                    : `$${toWti.toFixed(2)} above WTI signal ($3.00)`}
                </span>
                <div style={{ width: 1, height: 12, background: "var(--border-subtle)" }} />
                <span style={{ fontSize: 9, fontFamily: "monospace", color: brentActive ? "#ef4444" : "#3a3a3a" }}>
                  {brentActive
                    ? `Brent signal active — $${Math.abs(toBrent).toFixed(2)} above $6.00 ▶`
                    : `$${toBrent.toFixed(2)} to Brent signal ($6.00)`}
                </span>
              </div>
            </div>
          );
        })()}

      </div>

    </div>
  );
}
