interface Props {
  label: string;
  value: string;
  sub?: string;
  direction?: "bull" | "bear" | "neutral" | "accent";
  size?: "sm" | "md";
}

export default function StatCard({ label, value, sub, direction = "neutral", size = "md" }: Props) {
  const colorMap = {
    bull: "var(--bull)",
    bear: "var(--bear)",
    neutral: "#f0f0f0",
    accent: "var(--accent)",
  };

  return (
    <div
      className="rounded p-4 flex flex-col gap-1"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <span
        className={`font-mono font-semibold tabular-nums ${size === "md" ? "text-2xl" : "text-lg"}`}
        style={{ color: colorMap[direction] }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}
