"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { MacroDataPoint } from "@/data/briefs";

interface MacroDualAxisChartProps {
  data: MacroDataPoint[];
  indicator: "realYield" | "breakeven";
  indicatorColor: string;
  indicatorDashed?: boolean;
  indicatorLabel: string;
  currentWti: number;
  currentIndicator: number;
  indicatorUnit: string;
  interpretation: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function tickDates(data: MacroDataPoint[]): Set<string> {
  const n = data.length;
  const step = Math.max(1, Math.floor(n / 5));
  const set = new Set<string>();
  for (let i = 0; i < n; i += step) set.add(data[i].date);
  set.add(data[n - 1].date);
  return set;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label, indicatorLabel, indicatorUnit }: any) {
  if (!active || !payload?.length) return null;
  const wtiVal = payload.find((p: { dataKey: string }) => p.dataKey === "wti")?.value;
  const indVal = payload.find((p: { dataKey: string }) => p.dataKey === "indicator")?.value;
  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid #2a2a2a",
        borderRadius: 4,
        padding: "6px 10px",
        fontFamily: "monospace",
        fontSize: 11,
      }}
    >
      <div style={{ color: "#888", marginBottom: 4 }}>{formatDate(label)}</div>
      {wtiVal != null && (
        <div style={{ color: "#00ff88" }}>WTI ${wtiVal.toFixed(2)}</div>
      )}
      {indVal != null && (
        <div style={{ color: "#ccc" }}>
          {indicatorLabel}: {indVal.toFixed(2)}{indicatorUnit}
        </div>
      )}
    </div>
  );
}

export default function MacroDualAxisChart({
  data,
  indicator,
  indicatorColor,
  indicatorDashed = false,
  indicatorLabel,
  currentWti,
  currentIndicator,
  indicatorUnit,
  interpretation,
}: MacroDualAxisChartProps) {
  const visibleTicks = tickDates(data);

  const chartData = data.map((d) => ({
    date: d.date,
    wti: d.wti,
    indicator: d[indicator],
  }));

  const wtiMin = Math.floor(Math.min(...data.map((d) => d.wti)) / 5) * 5;
  const wtiMax = Math.ceil(Math.max(...data.map((d) => d.wti)) / 5) * 5;
  const indValues = data.map((d) => d[indicator]);
  const indMin = parseFloat((Math.min(...indValues) - 0.05).toFixed(2));
  const indMax = parseFloat((Math.max(...indValues) + 0.05).toFixed(2));

  const strokeDash = indicatorDashed ? "4 3" : "0";

  return (
    <div
      style={{
        background: "#000",
        border: "1px solid #1a1a1a",
        borderRadius: 6,
        padding: "10px 0 0 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header: current value badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 14,
          paddingRight: 14,
          marginBottom: 8,
        }}
      >
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#555", letterSpacing: "0.08em" }}>
          WTI VS. {indicatorLabel.toUpperCase()}
        </div>
        <div
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: 4,
            padding: "3px 8px",
            fontFamily: "monospace",
            fontSize: 10,
            display: "flex",
            gap: 8,
          }}
        >
          <span style={{ color: "#00ff88" }}>WTI ${currentWti.toFixed(2)}</span>
          <span style={{ color: "#444" }}>·</span>
          <span style={{ color: indicatorColor }}>
            {indicatorLabel} {currentIndicator.toFixed(2)}{indicatorUnit}
          </span>
        </div>
      </div>

      {/* Legend dots */}
      <div
        style={{
          display: "flex",
          gap: 14,
          paddingLeft: 58,
          marginBottom: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width={20} height={8}>
            <line x1={0} y1={4} x2={20} y2={4} stroke="#00ff88" strokeWidth={2} />
          </svg>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}>WTI Price</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width={20} height={8}>
            <line
              x1={0} y1={4} x2={20} y2={4}
              stroke={indicatorColor}
              strokeWidth={1.5}
              strokeDasharray={strokeDash}
            />
          </svg>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "#888" }}>{indicatorLabel}</span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={154}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 46, bottom: 4, left: 8 }}>
          <defs>
            <filter id="wtiGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: "#1e1e1e" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tick={(props: any) => {
              const { x, y, payload } = props as { x: number; y: number; payload: { value: string } };
              if (!visibleTicks.has(payload.value)) return <g />;
              return (
                <text
                  x={x}
                  y={y + 10}
                  textAnchor="middle"
                  fill="#444"
                  fontSize={8}
                  fontFamily="monospace"
                >
                  {formatDate(payload.value)}
                </text>
              );
            }}
          />

          {/* Left Y: WTI */}
          <YAxis
            yAxisId="left"
            domain={[wtiMin, wtiMax]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#555", fontSize: 8, fontFamily: "monospace" }}
            tickFormatter={(v) => `$${v}`}
            width={42}
          />

          {/* Right Y: indicator */}
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[indMin, indMax]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#555", fontSize: 8, fontFamily: "monospace" }}
            tickFormatter={(v) => `${v.toFixed(2)}%`}
            width={40}
          />

          <Tooltip
            content={
              <CustomTooltip
                indicatorLabel={indicatorLabel}
                indicatorUnit={indicatorUnit}
                active={undefined}
                payload={undefined}
                label={undefined}
              />
            }
            cursor={{ stroke: "#333", strokeWidth: 1 }}
          />

          {/* WTI line — glow layer */}
          <Line
            yAxisId="left"
            dataKey="wti"
            stroke="rgba(0,255,136,0.25)"
            strokeWidth={6}
            dot={false}
            isAnimationActive={false}
            style={{ filter: "url(#wtiGlow)" }}
          />
          {/* WTI line — main */}
          <Line
            yAxisId="left"
            dataKey="wti"
            stroke="#00ff88"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />

          {/* Indicator line */}
          <Line
            yAxisId="right"
            dataKey="indicator"
            stroke={indicatorColor}
            strokeWidth={1.5}
            strokeDasharray={strokeDash}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Interpretation strip */}
      <div
        style={{
          borderTop: "1px solid #111",
          padding: "5px 12px",
          fontFamily: "monospace",
          fontSize: 9,
          color: "#666",
          lineHeight: 1.5,
          letterSpacing: "0.02em",
        }}
      >
        {interpretation}
      </div>
    </div>
  );
}
