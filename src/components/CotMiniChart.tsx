"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { CotDataPoint } from "@/data/briefs";

interface Props {
  data: CotDataPoint[];
  currentNetLength: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as CotDataPoint;
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #1e1e1e",
        borderRadius: "4px",
        padding: "6px 10px",
        fontSize: "11px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ color: "#6b6b6b" }}>{d.week}</div>
      <div style={{ color: "#d4922a", fontWeight: 600 }}>
        {d.netLength > 0 ? "+" : ""}
        {d.netLength}k contracts
      </div>
    </div>
  );
}

export default function CotMiniChart({ data, currentNetLength }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const values = data.map((d) => d.netLength);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.25;
  const yDomain = [Math.max(0, minVal - padding), maxVal + padding];

  const peakIdx = values.indexOf(Math.max(...values));
  const peakWeek = data[peakIdx]?.week ?? "";
  const peakVal = data[peakIdx]?.netLength ?? 0;
  const totalChange = currentNetLength - peakVal;
  const changePct = peakVal !== 0 ? ((totalChange / peakVal) * 100).toFixed(1) : "0";

  return (
    <div
      className="rounded-lg p-3 flex flex-col gap-2"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4922a" }} />
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            Managed Money Net Length · 3-Month
          </span>
        </div>
        <span
          className="text-xs font-mono font-semibold tabular-nums"
          style={{ color: "#d4922a" }}
        >
          {currentNetLength > 0 ? "+" : ""}
          {currentNetLength}k
        </span>
      </div>

      {/* chart — only mounts client-side */}
      {mounted ? (
        <ResponsiveContainer width="100%" height={90}>
          <AreaChart data={data} margin={{ top: 6, right: 4, left: 0, bottom: 2 }}>
            <defs>
              <linearGradient id="cotGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4922a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#d4922a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              tick={{ fill: "#3a3a3a", fontSize: 8, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis hide domain={yDomain} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentNetLength}
              stroke="#d4922a"
              strokeDasharray="3 3"
              strokeWidth={1}
              opacity={0.35}
            />
            <Area
              type="monotone"
              dataKey="netLength"
              stroke="#d4922a"
              strokeWidth={1.5}
              fill="url(#cotGrad)"
              dot={false}
              activeDot={{ r: 3, fill: "#d4922a" }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ height: 90, background: "rgba(255,255,255,0.02)", borderRadius: 4 }} />
      )}

      {/* mini stats */}
      <div
        className="grid grid-cols-3 gap-1 pt-1"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        {[
          { label: "PEAK",    value: `+${peakVal}k`,                                          sub: peakWeek,                       color: "#fbbf24" },
          { label: "CURRENT", value: `${currentNetLength > 0 ? "+" : ""}${currentNetLength}k`, sub: data[data.length - 1]?.week ?? "", color: "#d4922a" },
          { label: "Δ PEAK",  value: `${totalChange > 0 ? "+" : ""}${totalChange}k`,           sub: `${Math.abs(Number(changePct))}% unwind`, color: totalChange < 0 ? "#ef4444" : "#22c55e" },
        ].map(({ label, value, sub, color }) => (
          <div key={label}>
            <div style={{ color: "var(--muted)", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.06em" }}>
              {label}
            </div>
            <div className="font-mono font-semibold tabular-nums" style={{ color, fontSize: "11px" }}>
              {value}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "9px", fontFamily: "monospace" }}>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
