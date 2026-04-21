"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { CotDataPoint } from "@/data/briefs";

interface Props {
  data: CotDataPoint[];
  currentNetLength: number;
  oneYearPercentile: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as CotDataPoint;
  return (
    <div style={{ background: "#0f0f0f", border: "1px solid #222", borderRadius: 6, padding: "6px 10px" }}>
      <div style={{ color: "#555", fontSize: 9, fontFamily: "monospace", marginBottom: 2 }}>{d.week}</div>
      <div style={{ color: "#d4922a", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
        {d.netLength > 0 ? "+" : ""}{d.netLength}k
      </div>
      <div style={{ color: "#444", fontSize: 9, fontFamily: "monospace" }}>contracts</div>
    </div>
  );
}

export default function CotNetLengthChart({ data, currentNetLength, oneYearPercentile }: Props) {
  const { p25, p75, yDomain, isDecreasing } = useMemo(() => {
    const values = data.map((d) => d.netLength);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const pad = range * 0.22;
    return {
      p25: +(minVal + range * 0.25).toFixed(1),
      p75: +(minVal + range * 0.75).toFixed(1),
      yDomain: [minVal - pad, maxVal + pad] as [number, number],
      isDecreasing:
        data[data.length - 1].netLength < data[Math.floor(data.length / 2)].netLength,
    };
  }, [data]);

  const lineColor = isDecreasing ? "#ef4444" : "#22c55e";
  const gradId = isDecreasing ? "cotGradRed" : "cotGradGreen";
  const gradColor = isDecreasing ? "#ef4444" : "#22c55e";

  return (
    <div>
      {/* legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 18, height: 2, background: lineColor, borderRadius: 1 }} />
          <span style={{ color: "#3a3a3a", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.05em" }}>
            NET LENGTH
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 12,
            height: 10,
            background: "rgba(148,163,184,0.1)",
            border: "1px solid rgba(148,163,184,0.18)",
            borderRadius: 2,
          }} />
          <span style={{ color: "#3a3a3a", fontSize: 9, fontFamily: "monospace", letterSpacing: "0.05em" }}>
            25–75 PCTL BAND
          </span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: lineColor }} />
          <span style={{ color: "#3a3a3a", fontSize: 9, fontFamily: "monospace" }}>
            NOW: {currentNetLength > 0 ? "+" : ""}{currentNetLength}k · {oneYearPercentile}th pctl
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data} margin={{ top: 6, right: 10, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={gradColor} stopOpacity={0.18} />
              <stop offset="95%" stopColor={gradColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <YAxis hide domain={yDomain} />
          <XAxis
            dataKey="week"
            tick={{ fill: "#2e2e2e", fontSize: 8, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <Tooltip content={<CustomTooltip />} />

          {/* neutral / mid-range band */}
          <ReferenceArea
            y1={p25}
            y2={p75}
            fill="rgba(148,163,184,0.06)"
            stroke="rgba(148,163,184,0.14)"
            strokeDasharray="2 3"
          />

          {/* zero line */}
          <ReferenceLine y={0} stroke="#222" strokeDasharray="3 3" strokeWidth={1} />

          {/* net-length area */}
          <Area
            type="monotone"
            dataKey="netLength"
            stroke={lineColor}
            strokeWidth={1.8}
            fill={`url(#${gradId})`}
            dot={(props) => {
              const { cx, cy, index } = props as { cx: number; cy: number; index: number };
              if (index !== data.length - 1) return <g key={`dot-${index}`} />;
              return (
                <g key="dot-current">
                  <circle cx={cx} cy={cy} r={10} fill={lineColor} fillOpacity={0.12} />
                  <circle cx={cx} cy={cy} r={5}  fill={lineColor} stroke="#111" strokeWidth={1.5} />
                </g>
              );
            }}
            activeDot={{ r: 3, fill: lineColor, stroke: "none" }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Read-through */}
      {(() => {
        const first  = data[0].netLength;
        const last   = data[data.length - 1].netLength;
        const change = last - first;
        const isCrowded    = oneYearPercentile >= 70;
        const isLight      = oneYearPercentile <= 30;
        const isRebuilding = change > 0;
        const isNetShort   = last < 0;

        const text = isNetShort
          ? `Managed money is outright net short at ${last}k contracts (${oneYearPercentile}th pctl). This either marks a capitulation low — historically a contrarian bull setup — or the early phase of a sustained bearish regime. Watch for short-covering as a first signal of a trend reversal.`
          : isCrowded
          ? `Net length at +${last}k is in the top quartile of the 1-year range (${oneYearPercentile}th pctl). Spec longs are extended — any macro shock or fundamental disappointment could trigger rapid de-risking. Crowded positioning compresses the upside from further buying.`
          : isLight && isRebuilding
          ? `Spec longs are rebuilding from a washed-out base, rising ${change > 0 ? "+" : ""}${change}k to +${last}k (${oneYearPercentile}th pctl). Fresh buying from light positioning reduces squeeze risk and signals rising fundamental conviction without crowding risk.`
          : isRebuilding
          ? `Managed money has added ${change > 0 ? "+" : ""}${change}k contracts over the period, lifting net longs to +${last}k (${oneYearPercentile}th pctl). The rebuild supports price momentum, though further gains toward the 75th percentile would begin to introduce crowding risk.`
          : `Net longs declined ${change}k over the period to +${last}k (${oneYearPercentile}th pctl). The pace of liquidation suggests tactical de-risking rather than a structural bearish pivot. A cleaner positioning base improves the risk/reward for new longs on any fresh catalyst.`;

        return (
          <div style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: "1px solid var(--border-subtle)",
            fontSize: 11,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
          }}>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>Read-through: </span>
            {text}
          </div>
        );
      })()}
    </div>
  );
}
