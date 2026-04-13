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

export default function PerformanceCharts({ metrics, callHistory }: Props) {
  const completedHistory = callHistory.filter((c) => c.outcome !== "OPEN").reverse();

  const wtiReturns = completedHistory.map((c, i) => ({
    week: `W${i + 1}`,
    return: c.outcome === "WIN" ? Math.abs(c.wtiReturn) : c.outcome === "LOSS" ? -Math.abs(c.wtiReturn) : 0,
    outcome: c.outcome,
    label: c.weekEnding,
  }));

  const cumulativeData = completedHistory.reduce(
    (acc, c) => {
      const last = acc[acc.length - 1];
      const delta = c.outcome === "WIN" ? Math.abs(c.wtiReturn) : c.outcome === "LOSS" ? -Math.abs(c.wtiReturn) : 0;
      acc.push({ ...last, value: parseFloat((last.value + delta).toFixed(2)), week: c.weekEnding.replace(", 2026", "").replace(", 2025", "") });
      return acc;
    },
    [{ week: "Start", value: 0 }] as { week: string; value: number }[]
  );

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

  const tooltipStyle = {
    contentStyle: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "6px", fontSize: "11px", fontFamily: "monospace" },
    labelStyle: { color: "#6b6b6b" },
    itemStyle: { color: "#f0f0f0" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* WTI Return per Call */}
      <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          WTI RETURN PER CALL ($/bbl)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={wtiReturns} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="week" tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
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

      {/* Cumulative P&L */}
      <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          CUMULATIVE DIRECTIONAL P&L ($/bbl)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={cumulativeData.slice(1)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="week" tick={{ fill: "#6b6b6b", fontSize: 9, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
            <Tooltip
              {...tooltipStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`${Number(value) >= 0 ? "+" : ""}${Number(value).toFixed(2)}/bbl`, "Cumulative"]}
            />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {cumulativeData.slice(1).map((entry, i) => (
                <Cell key={i} fill={entry.value >= 0 ? "#22c55e" : "#ef4444"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Outcome Distribution */}
      <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          OUTCOME DISTRIBUTION
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={outcomeData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
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
              formatter={(value) => <span style={{ color: "#6b6b6b", fontFamily: "monospace", fontSize: "11px" }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Conviction-based Accuracy */}
      <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-xs font-mono tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          ACCURACY BY CONVICTION LEVEL
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={convictionData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#f0f0f0", fontSize: 11, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
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
                    entry.accuracy >= 75
                      ? "#d4922a"
                      : entry.accuracy >= 60
                      ? "#94a3b8"
                      : "#6b6b6b"
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
