"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import { CallRecord, PerformanceMetrics } from "@/data/briefs";

interface Props {
  metrics: PerformanceMetrics;
  callHistory: CallRecord[];
}

const COLORS = {
  WIN: "#22c55e",
  LOSS: "#ef4444",
  PUSH: "#94a3b8",
  OPEN: "#d4922a",
};

const tooltipStyle = {
  contentStyle: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: "6px",
    fontSize: "11px",
    fontFamily: "monospace",
  },
  labelStyle: { color: "#6b6b6b" },
  itemStyle: { color: "#f0f0f0" },
};

// ─── Equity Curve ──────────────────────────────────────────────────────────────

interface EquityCurveProps {
  callHistory: CallRecord[];
}

export function EquityCurveChart({ callHistory }: EquityCurveProps) {
  const completed = [...callHistory].reverse().filter((c) => c.outcome !== "OPEN");

  const equityData = completed.reduce(
    (acc, c) => {
      const last = acc[acc.length - 1];
      const cumR = parseFloat((last.cumR + c.rValue).toFixed(2));
      const label = c.weekEnding.replace(", 2026", "").replace(", 2025", "");
      acc.push({ label, cumR, outcome: c.outcome });
      return acc;
    },
    [{ label: "Inception", cumR: 0, outcome: "" as string }]
  );

  const maxR = Math.max(...equityData.map((d) => d.cumR), 0.5);
  const minR = Math.min(...equityData.map((d) => d.cumR), -0.5);
  const finalR = equityData[equityData.length - 1]?.cumR ?? 0;
  const isPositive = finalR >= 0;

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>
            Equity Curve
          </div>
          <div className="text-sm font-mono text-white">Cumulative R — Model Portfolio</div>
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-mono font-bold tabular-nums"
            style={{ color: isPositive ? "var(--bull)" : "var(--bear)" }}
          >
            {finalR >= 0 ? "+" : ""}{finalR}R
          </div>
          <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>since inception</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={equityData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.25} />
              <stop offset="95%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b6b6b", fontSize: 9, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minR - 0.2, maxR + 0.2]}
            tick={{ fill: "#6b6b6b", fontSize: 9, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}R`}
          />
          <ReferenceLine y={0} stroke="#2a2a2a" strokeDasharray="4 4" />
          <Tooltip
            {...tooltipStyle}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [`${Number(value) >= 0 ? "+" : ""}${value}R`, "Cumulative R"]}
          />
          <Area
            type="monotone"
            dataKey="cumR"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
            strokeWidth={2}
            fill="url(#equityGradient)"
            dot={(props) => {
              const { cx, cy, payload } = props;
              if (!payload.outcome) return <g key={props.key} />;
              const color =
                payload.outcome === "WIN"
                  ? "#22c55e"
                  : payload.outcome === "LOSS"
                  ? "#ef4444"
                  : "#94a3b8";
              return (
                <circle
                  key={props.key}
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill={color}
                  stroke="#0a0a0a"
                  strokeWidth={1.5}
                />
              );
            }}
            activeDot={{ r: 5, stroke: "#0a0a0a", strokeWidth: 1.5 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3">
        {[
          { label: "WIN", color: "#22c55e" },
          { label: "LOSS", color: "#ef4444" },
          { label: "PUSH", color: "#94a3b8" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{label}</span>
          </div>
        ))}
        <span className="ml-auto text-[10px] font-mono" style={{ color: "var(--muted)" }}>
          1R = 1 unit of risk per trade
        </span>
      </div>
    </div>
  );
}

// ─── Secondary Charts Grid ─────────────────────────────────────────────────────

export default function PerformanceCharts({ metrics, callHistory }: Props) {
  const completedHistory = callHistory.filter((c) => c.outcome !== "OPEN").reverse();

  const wtiReturns = completedHistory.map((c, i) => ({
    week: `W${i + 1}`,
    return: c.outcome === "WIN" ? Math.abs(c.wtiReturn) : c.outcome === "LOSS" ? -Math.abs(c.wtiReturn) : 0,
    outcome: c.outcome,
    label: c.weekEnding,
  }));

  const outcomeData = [
    { name: "WIN", value: metrics.wins, color: COLORS.WIN },
    { name: "LOSS", value: metrics.losses, color: COLORS.LOSS },
    { name: "PUSH", value: metrics.pushes, color: COLORS.PUSH },
  ];

  const convictionData = [
    { name: "High", accuracy: metrics.highConvictionAccuracy },
    { name: "Medium", accuracy: 71 },
    { name: "Low", accuracy: metrics.lowConvictionAccuracy },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* WTI Return per Call */}
      <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          WTI RETURN PER CALL ($/bbl)
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={wtiReturns} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="week" tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <ReferenceLine y={0} stroke="#2a2a2a" />
            <Tooltip
              {...tooltipStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(2)}/bbl`, "Return"]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              labelFormatter={(label: any, payload: any) => payload?.[0]?.payload?.label || label}
            />
            <Bar dataKey="return" radius={[2, 2, 0, 0]}>
              {wtiReturns.map((entry, i) => (
                <Cell key={i} fill={COLORS[entry.outcome as keyof typeof COLORS] || COLORS.PUSH} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Outcome Distribution */}
      <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          OUTCOME DISTRIBUTION
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={outcomeData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={72}
              paddingAngle={2}
              dataKey="value"
            >
              {outcomeData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              {...tooltipStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => [value, name]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: "#6b6b6b", fontFamily: "monospace", fontSize: "11px" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Conviction-based Accuracy */}
      <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          ACCURACY BY CONVICTION
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={convictionData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#f0f0f0", fontSize: 11, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              {...tooltipStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${value}%`, "Accuracy"]}
            />
            <Bar dataKey="accuracy" radius={[0, 2, 2, 0]}>
              {convictionData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.accuracy >= 75 ? "#d4922a" : entry.accuracy >= 60 ? "#94a3b8" : "#6b6b6b"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
