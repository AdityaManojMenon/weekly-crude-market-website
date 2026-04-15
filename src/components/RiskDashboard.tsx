"use client";

import { RiskDashboard as RiskDashboardData } from "@/data/briefs";

interface Props {
  data: RiskDashboardData;
}

const GAUGE_LABELS = ["Bullish", "C. Bullish", "Neutral", "C. Bearish", "Bearish"] as const;

const GAUGE_COLORS = [
  { bg: "bg-[#16a34a]", hex: "#16a34a" },
  { bg: "bg-[#65a30d]", hex: "#65a30d" },
  { bg: "bg-[#d97706]", hex: "#d97706" },
  { bg: "bg-[#dc2626]/70", hex: "#ef4444" },
  { bg: "bg-[#dc2626]", hex: "#dc2626" },
];

function GaugeBar({ score }: { score: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="w-full">
      <div className="flex gap-1 mb-2">
        {GAUGE_COLORS.map((c, i) => (
          <div
            key={i}
            className={`h-2.5 flex-1 rounded-sm transition-all duration-300 ${
              i + 1 === score ? c.bg : "bg-[var(--border)]"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {GAUGE_LABELS.map((label, i) => (
          <span
            key={i}
            className="text-[9px] font-mono uppercase tracking-wide transition-all"
            style={{
              flex: "1",
              textAlign: i === 0 ? "left" : i === 4 ? "right" : "center",
              color: i + 1 === score ? GAUGE_COLORS[i].hex : "var(--muted)",
              fontWeight: i + 1 === score ? 700 : 400,
            }}
          >
            {i + 1 === score ? "● " : ""}{label}
          </span>
        ))}
      </div>
    </div>
  );
}

const metaLevelColor: Record<string, string> = {
  HIGH: "#dc2626",
  MEDIUM: "#d97706",
  LOW: "#16a34a",
};

export default function RiskDashboard({ data }: Props) {
  return (
    <div
      className="grid grid-cols-3 gap-4"
      style={{ borderTop: "1px solid var(--border)", paddingTop: "0" }}
    >
      {/* Card 1 — Upside Risks */}
      <div
        className="rounded-lg p-5"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(22,163,74,0.25)",
          borderLeft: "3px solid #16a34a",
        }}
      >
        <p
          className="text-xs font-mono uppercase tracking-widest font-bold mb-4"
          style={{ color: "#16a34a", letterSpacing: "0.1em" }}
        >
          ▲ Upside Risks
        </p>
        <ul className="space-y-2.5">
          {data.upsideRisks.map((risk, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: "#16a34a" }}
              />
              <span className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
                {risk}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card 2 — Risk Score */}
      <div
        className="rounded-lg p-5 flex flex-col justify-between"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <div>
          <p
            className="text-xs font-mono uppercase tracking-widest font-bold mb-1"
            style={{ color: "var(--accent)", letterSpacing: "0.1em" }}
          >
            Current Risk Score
          </p>
          <p
            className="text-lg font-bold mb-4"
            style={{ color: GAUGE_COLORS[data.riskScore - 1].hex }}
          >
            {data.riskLabel}
          </p>
          <GaugeBar score={data.riskScore} />
        </div>

        <div
          className="mt-5 pt-4 grid grid-cols-1 gap-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {(
            [
              { label: "Volatility", value: data.volatility, isLevel: true },
              { label: "Conviction", value: data.conviction, isLevel: true },
              { label: "Driver", value: data.dominantDriver, isLevel: false },
            ]
          ).map(({ label, value, isLevel }) => (
            <div key={label} className="flex justify-between items-center">
              <span
                className="text-xs font-mono uppercase tracking-wide"
                style={{ color: "var(--muted)", letterSpacing: "0.08em" }}
              >
                {label}
              </span>
              <span
                className="text-xs font-semibold font-mono"
                style={{
                  color: isLevel
                    ? (metaLevelColor[value] ?? "var(--text-secondary)")
                    : "var(--accent)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3 — Downside Risks */}
      <div
        className="rounded-lg p-5"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(220,38,38,0.25)",
          borderLeft: "3px solid #dc2626",
        }}
      >
        <p
          className="text-xs font-mono uppercase tracking-widest font-bold mb-4"
          style={{ color: "#dc2626", letterSpacing: "0.1em" }}
        >
          ▼ Downside Risks
        </p>
        <ul className="space-y-2.5">
          {data.downsideRisks.map((risk, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: "#dc2626" }}
              />
              <span className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
                {risk}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
