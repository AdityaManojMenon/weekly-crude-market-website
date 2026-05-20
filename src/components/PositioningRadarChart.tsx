"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { RadarScores } from "@/data/briefs";

interface Props {
  scores: RadarScores;
}

// Order: FUNDAMENTALS at top, then clockwise
const AXES = [
  { key: "fundamentals", label: "FUNDAMENTALS", signal: "BULLISH",    color: "#00ff88", dominant: true  },
  { key: "riskReward",   label: "RISK/REWARD",  signal: "MIXED",      color: "#aaaaaa", dominant: false },
  { key: "volatility",   label: "VOLATILITY",   signal: "BEARISH",    color: "#ff4444", dominant: false },
  { key: "momentum",     label: "MOMENTUM",     signal: "BEARISH",    color: "#ff4444", dominant: false },
] as const;

function buildData(scores: RadarScores) {
  return AXES.map(({ key, label, signal, color, dominant }) => ({
    subject:  label,
    score:    scores[key],
    prior:    scores.prior?.[key] ?? scores[key],
    signal,
    color,
    dominant,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AxisTick({ x, y, payload, cx, cy }: any) {
  const label   = payload?.value ?? "";
  const axis    = AXES.find(a => a.label === label);
  if (!axis) return null;

  const color     = axis.color;
  const signal    = axis.signal;
  const dominant  = axis.dominant;

  // nudge label outward from center
  const dx  = (x as number) - (cx as number);
  const dy  = (y as number) - (cy as number);
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const push = dominant ? 20 : 16;
  const nx  = (x as number) + (dx / len) * push;
  const ny  = (y as number) + (dy / len) * push;

  return (
    <g>
      {/* Axis name */}
      <text
        x={nx} y={ny - (dominant ? 14 : 12)}
        textAnchor="middle"
        style={{
          fontSize: dominant ? 10 : 9,
          fontFamily: "monospace",
          fill: dominant ? "#9ca3af" : "#6b7280",
          letterSpacing: "0.08em",
          fontWeight: dominant ? 600 : 400,
        }}
      >
        {label}
      </text>
      {/* Signal word */}
      <text
        x={nx} y={ny + (dominant ? 0 : 0)}
        textAnchor="middle"
        style={{
          fontSize: dominant ? 13 : 10,
          fontFamily: "monospace",
          fontWeight: dominant ? 800 : 600,
          fill: color,
          filter: dominant ? "drop-shadow(0 0 4px rgba(0,255,136,0.5))" : "none",
        }}
      >
        {signal}
      </text>
    </g>
  );
}

export default function PositioningRadarChart({ scores }: Props) {
  const data = buildData(scores);

  // Compute score values to show at each axis tip
  // We render these as a custom overlay via a Customized component trick
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ScoreLabels({ cx, cy, points }: any) {
    if (!points) return null;
    return (
      <g>
        {data.map((d, i) => {
          const pt = points[i];
          if (!pt) return null;
          const dx  = pt.x - cx;
          const dy  = pt.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          // Place score just beyond the vertex
          const offset = d.dominant ? 16 : 13;
          const tx = pt.x + (dx / len) * offset;
          const ty = pt.y + (dy / len) * offset + (d.dominant ? 14 : 12);
          return (
            <text
              key={d.subject}
              x={tx} y={ty}
              textAnchor="middle"
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                fill: d.dominant ? "rgba(0,255,136,0.85)" : "rgba(255,255,255,0.45)",
                letterSpacing: "0.04em",
              }}
            >
              {d.score}.0 / 10
            </text>
          );
        })}
      </g>
    );
  }

  // Divergence: gap between fundamentals and avg of others
  const others  = [scores.momentum, scores.volatility, scores.riskReward];
  const avgOther = others.reduce((a, b) => a + b, 0) / others.length;
  const gap     = +(scores.fundamentals - avgOther).toFixed(1);

  return (
    <div style={{
      height: "100%",
      width: "100%",
      background: "#000",
      border: "1px solid #111",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>

      {/* ── Top bar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px 0",
        flexShrink: 0,
      }}>
        {/* Left: title + legend */}
        <div>
          <div style={{ fontSize: 9, fontFamily: "monospace", color: "#6b7280", letterSpacing: "0.1em", marginBottom: 6 }}>
            SIGNAL DIVERGENCE RADAR
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke="#00ff88" strokeWidth="2"/></svg>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "#9ca3af" }}>THIS WEEK</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="18" height="8"><rect x="0" y="2" width="18" height="4" fill="rgba(255,255,255,0.18)" rx="1"/></svg>
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "#6b7280" }}>PRIOR WEEK</span>
            </div>
          </div>
        </div>

        {/* Right: divergence score badge */}
        <div style={{
          background: "#0a0a0a",
          border: "1px solid #1a1a1a",
          borderRadius: 8,
          padding: "8px 12px",
          textAlign: "right",
        }}>
          <div style={{ fontSize: 8, fontFamily: "monospace", color: "#6b7280", letterSpacing: "0.1em", marginBottom: 4 }}>
            DIVERGENCE SCORE
          </div>
          <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 800, color: "#00ff88", marginBottom: 2 }}>
            +{gap} pts
          </div>
          <div style={{ fontSize: 8, fontFamily: "monospace", color: "#9ca3af" }}>
            Fund. vs Momentum gap
          </div>
          <div style={{ fontSize: 8, fontFamily: "monospace", color: "#6b7280", marginTop: 3 }}>
            Historical freq: ~8% of weeks
          </div>
        </div>
      </div>

      {/* ── Chart ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%" margin={{ top: 36, right: 52, bottom: 36, left: 52 }}>
            <defs>
              <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 4 concentric reference rings at 25/50/75/100% */}
            <PolarGrid
              {...({ gridCount: 4 } as object)}
              stroke="#161616"
              strokeWidth={1}
              gridType="polygon"
            />

            <PolarAngleAxis
              dataKey="subject"
              tick={(props) => <AxisTick {...props} />}
              tickLine={false}
              axisLine={false}
            />

            {/* Prior week — faint white fill polygon (shadow) */}
            {scores.prior && (
              <Radar
                name="Prior"
                dataKey="prior"
                stroke="none"
                fill="rgba(255,255,255,0.07)"
                fillOpacity={1}
                dot={false}
              />
            )}

            {/* Glow halo behind main shape */}
            <Radar
              name="Glow"
              dataKey="score"
              stroke="rgba(0,255,136,0.22)"
              strokeWidth={9}
              fill="transparent"
              dot={false}
              filter="url(#greenGlow)"
            />

            {/* Main shape */}
            <Radar
              name="Current"
              dataKey="score"
              stroke="#00ff88"
              strokeWidth={2}
              fill="#00ff88"
              fillOpacity={0.1}
              dot={false}
              label={<ScoreLabels />}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: "0 16px 12px",
        fontSize: 9,
        fontFamily: "monospace",
        color: "#9ca3af",
        letterSpacing: "0.04em",
        lineHeight: 1.6,
        flexShrink: 0,
        borderTop: "1px solid #0d0d0d",
        paddingTop: 10,
      }}>
        Fundamentals diverge sharply from momentum and volatility — rare split-signal configuration.
        Physical tightness is not being reflected in price.
      </div>
    </div>
  );
}
