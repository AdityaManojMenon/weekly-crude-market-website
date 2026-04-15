"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Dot,
} from "recharts";
import { SpreadDataPoint } from "@/data/briefs";

interface Props {
  data: SpreadDataPoint[];
  currentSpread: number;
  structure: "CONTANGO" | "BACKWARDATION";
  compact?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomDot(props: any) {
  const { cx, cy, payload, peakIndex, currentIndex } = props;
  if (payload.isPeak) {
    return (
      <g>
        {/* drop line from label box to dot */}
        <line x1={cx} y1={cy - 32} x2={cx} y2={cy - 6} stroke="#fbbf24" strokeWidth={1} strokeDasharray="2 2" opacity={0.6} />
        {/* label box */}
        <rect x={cx - 44} y={cy - 48} width={88} height={16} rx={2} fill="#1a1200" stroke="#fbbf24" strokeWidth={1} opacity={0.9} />
        <text x={cx} y={cy - 37} textAnchor="middle" fill="#fbbf24" fontSize={8} fontFamily="monospace" fontWeight="bold">
          SUPPLY CRUNCH PEAK
        </text>
        <circle cx={cx} cy={cy} r={5} fill="#fbbf24" stroke="#0a0a0a" strokeWidth={2} />
        <text x={cx + 8} y={cy + 4} textAnchor="start" fill="#fbbf24" fontSize={9} fontFamily="monospace" fontWeight="bold">
          {payload.value.toFixed(2)}
        </text>
      </g>
    );
  }
  if (payload.isCurrent) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#d4922a" stroke="#0a0a0a" strokeWidth={2} />
        <text x={cx - 6} y={cy - 10} textAnchor="middle" fill="#d4922a" fontSize={8} fontFamily="monospace" fontWeight="bold">
          NOW
        </text>
        <text x={cx - 6} y={cy + 18} textAnchor="middle" fill="#d4922a" fontSize={9} fontFamily="monospace">
          {payload.value.toFixed(2)}
        </text>
      </g>
    );
  }
  if (peakIndex !== undefined || currentIndex !== undefined) {
    return <circle cx={cx} cy={cy} r={2} fill="#2a2a2a" />;
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
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
      <div style={{ color: "#6b6b6b" }}>{d.day}</div>
      <div style={{ color: d.value < 0 ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
        {d.value >= 0 ? "+" : ""}{d.value.toFixed(2)}
      </div>
    </div>
  );
}

export default function SpreadMiniChart({ data, currentSpread, structure, compact = false }: Props) {
  const isBackwardation = structure === "BACKWARDATION";

  // Peak = most extreme value by absolute magnitude
  const peakIdx = data.reduce(
    (extreme, d, i, arr) => (Math.abs(d.value) > Math.abs(arr[extreme].value) ? i : extreme),
    0
  );

  const peakValue = data[peakIdx].value;
  // "Drop from peak" in terms of absolute compression: positive = we've pulled back from extreme
  const compressedFromPeak = Math.abs(peakValue) - Math.abs(currentSpread);
  const compressedPct = peakValue !== 0 ? ((compressedFromPeak / Math.abs(peakValue)) * 100).toFixed(1) : "0";
  const isCompressing = compressedFromPeak > 0.01;
  const deltaDisplay = (currentSpread - peakValue).toFixed(2);
  const deltaSigned = currentSpread - peakValue >= 0 ? `+${deltaDisplay}` : deltaDisplay;

  const annotated = data.map((d, i) => ({
    ...d,
    isPeak: i === peakIdx,
    isCurrent: i === data.length - 1,
  }));

  const allValues = data.map((d) => d.value);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const padding = Math.abs(maxVal - minVal) * 0.35;
  const yDomain = [minVal - padding, maxVal + padding];

  const lineColor = isBackwardation ? "#22c55e" : "#ef4444";

  let narrative = "";
  if (isBackwardation && isCompressing) {
    narrative = `Came off blow-off top — backwardation compressing ${Math.abs(Number(compressedPct))}% from peak. Physical tightness easing but structure intact.`;
  } else if (isBackwardation && !isCompressing) {
    narrative = `Backwardation deepening — spread at +${currentSpread.toFixed(2)}, front-month scarcity premium expanding.`;
  } else if (!isBackwardation && !isCompressing) {
    narrative = `Contango widening — curve structure deteriorating, market pricing near-term supply surplus.`;
  } else {
    narrative = `Contango compressing — spread at ${currentSpread.toFixed(2)}, market transitioning toward balance.`;
  }

  if (compact) {
    return (
      <div
        className="rounded-lg p-3 flex flex-col gap-2 h-full"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {/* Compact header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: lineColor }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              CL1–CL2 · 10-Day
            </span>
          </div>
          <span
            className="text-xs font-mono font-semibold tabular-nums"
            style={{ color: isBackwardation ? "#22c55e" : "#ef4444" }}
          >
            {currentSpread >= 0 ? "+" : ""}{currentSpread.toFixed(2)}
          </span>
        </div>

        {/* Sparkline */}
        <div style={{ height: "190px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annotated} margin={{ top: 58, right: 8, left: 0, bottom: 2 }}>
              <XAxis
                dataKey="day"
                tick={{ fill: "#3a3a3a", fontSize: 8, fontFamily: "monospace" }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis hide domain={yDomain} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#2a2a2a" strokeDasharray="3 3" strokeWidth={1} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={1.5}
                dot={<CustomDot />}
                activeDot={{ r: 3, fill: lineColor }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-3 gap-1 pt-1" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {[
            { label: "PEAK", value: `${peakValue >= 0 ? "+" : ""}${peakValue.toFixed(2)}`, sub: data[peakIdx].day, color: "#fbbf24" },
            { label: "NOW", value: `${currentSpread >= 0 ? "+" : ""}${currentSpread.toFixed(2)}`, sub: data[data.length - 1].day, color: lineColor },
            { label: "Δ PEAK", value: deltaSigned, sub: `${Math.abs(Number(compressedPct))}% mv`, color: isCompressing ? "#ef4444" : "#22c55e" },
          ].map(({ label, value, sub, color }) => (
            <div key={label}>
              <div style={{ color: "var(--muted)", fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.06em" }}>{label}</div>
              <div className="font-mono font-semibold tabular-nums" style={{ color, fontSize: "11px" }}>{value}</div>
              <div style={{ color: "var(--muted)", fontSize: "9px", fontFamily: "monospace" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Narrative */}
        <p style={{ color: "#6b6b6b", fontSize: "10px", lineHeight: "1.4" }}>{narrative}</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg p-4 flex flex-col sm:flex-row gap-4"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* Left: stats + insight */}
      <div className="flex flex-col justify-between gap-3 sm:w-56 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: lineColor }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              CL1–CL2 · 10-Day
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "#8a8a8a" }}>
            {narrative}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <div className="text-xs font-mono mb-0.5" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.08em" }}>PEAK</div>
            <div className="text-sm font-mono font-semibold tabular-nums" style={{ color: "#fbbf24" }}>
              {peakValue >= 0 ? "+" : ""}{peakValue.toFixed(2)}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--muted)", fontSize: "9px" }}>{data[peakIdx].day}</div>
          </div>
          <div>
            <div className="text-xs font-mono mb-0.5" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.08em" }}>NOW</div>
            <div
              className="text-sm font-mono font-semibold tabular-nums"
              style={{ color: isBackwardation ? "#22c55e" : "#ef4444" }}
            >
              {currentSpread >= 0 ? "+" : ""}{currentSpread.toFixed(2)}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--muted)", fontSize: "9px" }}>{data[data.length - 1].day}</div>
          </div>
          <div>
            <div className="text-xs font-mono mb-0.5" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.08em" }}>
              Δ PEAK
            </div>
            <div
              className="text-sm font-mono font-semibold tabular-nums"
              style={{ color: isCompressing ? "#ef4444" : "#22c55e" }}
            >
              {deltaSigned}
            </div>
            <div className="text-xs font-mono" style={{ color: "var(--muted)", fontSize: "9px" }}>
              {Math.abs(Number(compressedPct))}% move
            </div>
          </div>
        </div>
      </div>

      {/* Right: sparkline */}
      <div className="flex-1 min-w-0" style={{ height: "110px" }}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={annotated} margin={{ top: 58, right: 12, left: 0, bottom: 4 }}>
            <XAxis
              dataKey="day"
              tick={{ fill: "#3a3a3a", fontSize: 9, fontFamily: "monospace" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis hide domain={yDomain} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#2a2a2a" strokeDasharray="3 3" strokeWidth={1} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={<CustomDot />}
              activeDot={{ r: 3, fill: lineColor }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
