type Direction = "bull" | "bear" | "neutral";

interface Props {
  direction: Direction;
  label?: string;
  size?: "sm" | "md";
}

export default function SignalBadge({ direction, label, size = "md" }: Props) {
  const configs = {
    bull: { color: "var(--bull)", bg: "rgba(34,197,94,0.1)", symbol: "▲", text: label || "BULLISH" },
    bear: { color: "var(--bear)", bg: "rgba(239,68,68,0.1)", symbol: "▼", text: label || "BEARISH" },
    neutral: { color: "var(--neutral)", bg: "rgba(148,163,184,0.1)", symbol: "◆", text: label || "NEUTRAL" },
  };
  const c = configs[direction];
  const px = size === "sm" ? "6px 8px" : "4px 10px";
  const fs = size === "sm" ? "10px" : "11px";

  return (
    <span
      className="inline-flex items-center gap-1 rounded font-mono font-medium tracking-wider"
      style={{ color: c.color, background: c.bg, padding: px, fontSize: fs, border: `1px solid ${c.color}22` }}
    >
      <span style={{ fontSize: "8px" }}>{c.symbol}</span>
      {c.text}
    </span>
  );
}
