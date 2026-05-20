"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Cell,
  Tooltip,
  LabelList,
  CartesianGrid,
} from "recharts";
import { CotDataPoint } from "@/data/briefs";

interface Props {
  data: CotDataPoint[];
  p25: number;
  p75: number;
  signal: string;
  wowChange: number;
  netLength: number;
  percentile: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as CotDataPoint & { wow: number };
  const isUp = d.wow >= 0;
  return (
    <div style={{
      background: "#000",
      border: "1px solid #222",
      borderRadius: 8,
      padding: "10px 14px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.95)",
    }}>
      <div style={{ fontSize: 10, color: "#4b5563", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 5 }}>
        {d.week.toUpperCase()}
      </div>
      <div style={{ fontSize: 15, color: "#f9fafb", fontFamily: "monospace", fontWeight: 700, marginBottom: 3 }}>
        +{d.netLength}k
      </div>
      {d.wow !== 0 && (
        <div style={{ fontSize: 11, color: isUp ? "#22c55e" : "#ef4444", fontFamily: "monospace", fontWeight: 700 }}>
          {isUp ? "▲ +" : "▼ "}{Math.abs(d.wow)}k WoW
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function XAxisLabel({ viewBox }: any) {
  if (!viewBox) return null;
  const { x, y, width } = viewBox;
  return (
    <text
      x={x + width / 2}
      y={y + 18}
      textAnchor="middle"
      style={{ fontSize: 10, fontFamily: "monospace", fill: "#374151", letterSpacing: "0.12em" }}
    >
      WEEK  (12W)
    </text>
  );
}

export default function PositioningCOTChart({
  data, p25, p75, signal, wowChange, netLength, percentile,
}: Props) {
  const slice = data.slice(-12);

  const enriched = slice.map((d, i) => ({
    ...d,
    wow: i === 0 ? 0 : +(d.netLength - slice[i - 1].netLength).toFixed(1),
  }));

  const current = enriched[enriched.length - 1];
  const isLiq      = wowChange < 0;
  const signalColor = isLiq ? "#ef4444" : "#22c55e";
  const signalBg    = isLiq ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)";
  const signalBd    = isLiq ? "rgba(239,68,68,0.35)" : "rgba(34,197,94,0.35)";

  const minY = Math.floor(Math.min(...enriched.map(d => d.netLength), p25) / 10) * 10 - 10;
  const maxY = Math.ceil(Math.max(...enriched.map(d => d.netLength), p75)  / 10) * 10 + 18;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>

      {/* ── Stat strip ── */}
      <div style={{
        display: "flex",
        alignItems: "stretch",
        marginBottom: 12,
        background: "#000",
        border: "1px solid #1a1a1a",
        borderRadius: 10,
        overflow: "hidden",
      }}>
        {[
          { label: "NET LONG",      value: `+${netLength}k`,                                             color: "#f3f4f6" },
          { label: "WoW",           value: `${wowChange > 0 ? "▲ +" : "▼ "}${Math.abs(wowChange)}k`,   color: signalColor },
          { label: "52W %ILE",      value: `${percentile}th`,                                            color: "#94a3b8" },
        ].map(({ label, value, color }, i, arr) => (
          <div key={label} style={{
            flex: 1,
            padding: "10px 14px",
            borderRight: i < arr.length - 1 ? "1px solid #1a1a1a" : "none",
          }}>
            <div style={{ fontSize: 9, color: "#374151", fontFamily: "monospace", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 15, color, fontFamily: "monospace", fontWeight: 800, letterSpacing: "-0.01em" }}>{value}</div>
          </div>
        ))}
        <div style={{ padding: "10px 14px", borderLeft: "1px solid #1a1a1a", display: "flex", alignItems: "center" }}>
          <div style={{
            fontSize: 9, fontFamily: "monospace", fontWeight: 700,
            letterSpacing: "0.06em", color: signalColor,
            background: signalBg, border: `1px solid ${signalBd}`,
            borderRadius: 4, padding: "4px 10px", whiteSpace: "nowrap",
          }}>
            {signal}
          </div>
        </div>
      </div>

      {/* ── Chart ── */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: "#000",
        border: "1px solid #111",
        borderRadius: 10,
        overflow: "hidden",
        padding: "16px 4px 8px 0",
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={enriched}
            margin={{ top: 20, right: 24, bottom: 28, left: 4 }}
            barCategoryGap="36%"
          >
            <CartesianGrid vertical={false} stroke="#0f0f0f" strokeWidth={1} />

            {/* P25–P75 band */}
            <ReferenceArea y1={p25} y2={p75} fill="rgba(148,163,184,0.04)" ifOverflow="extendDomain" />
            <ReferenceLine
              y={p75}
              stroke="#1f2937"
              strokeDasharray="5 4"
              strokeWidth={1}
              label={{ value: `P75 · ${p75}k`, position: "insideTopRight", fontSize: 10, fontFamily: "monospace", fill: "#2d3748", dy: -4, dx: -6 }}
            />
            <ReferenceLine
              y={p25}
              stroke="#1f2937"
              strokeDasharray="5 4"
              strokeWidth={1}
              label={{ value: `P25 · ${p25}k`, position: "insideTopRight", fontSize: 10, fontFamily: "monospace", fill: "#2d3748", dy: 12, dx: -6 }}
            />

            {/* X axis — no ticks, just the "WEEK (12W)" label */}
            <XAxis
              dataKey="week"
              tick={false}
              axisLine={{ stroke: "#111" }}
              tickLine={false}
              height={36}
              label={<XAxisLabel />}
            />

            {/* Y axis — values only */}
            <YAxis
              domain={[minY, maxY]}
              tick={{ fontSize: 11, fontFamily: "monospace", fill: "#374151", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}k`}
              width={38}
              tickCount={6}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.015)" }} />

            <Bar dataKey="netLength" radius={[4, 4, 0, 0]} maxBarSize={32}>
              {enriched.map((entry, index) => {
                const isLast = index === enriched.length - 1;
                const isUp   = entry.wow >= 0;
                let fill: string;
                if (isLast) {
                  fill = isLiq ? "#ef4444" : "#22c55e";
                } else {
                  fill = isUp ? "rgba(34,197,94,0.32)" : "rgba(239,68,68,0.32)";
                }
                return <Cell key={`c-${index}`} fill={fill} />;
              })}

              {/* WoW delta above current bar only */}
              <LabelList
                dataKey="wow"
                position="top"
                content={(props) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const { x, y, width, index, value } = props as any;
                  if (index !== enriched.length - 1) return null;
                  const v = value as number;
                  if (v === 0) return null;
                  const col = v >= 0 ? "#22c55e" : "#ef4444";
                  return (
                    <text
                      x={(x as number) + (width as number) / 2}
                      y={(y as number) - 8}
                      textAnchor="middle"
                      style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 800, fill: col }}
                    >
                      {v > 0 ? "+" : ""}{v}k
                    </text>
                  );
                }}
              />
            </Bar>

            {/* Glow column behind current bar */}
            <ReferenceLine
              x={current.week}
              stroke={signalColor}
              strokeOpacity={0.07}
              strokeWidth={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
