import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  sub?: string;
  direction?: "bull" | "bear" | "neutral" | "accent";
  size?: "sm" | "md";
  icon?: LucideIcon;
}

export default function StatCard({ label, value, sub, direction = "neutral", size = "md", icon: Icon }: Props) {
  const colorMap = {
    bull: "var(--bull)",
    bear: "var(--bear)",
    neutral: "#f0f0f0",
    accent: "var(--accent)",
  };

  const iconBgMap = {
    bull: "rgba(34,197,94,0.08)",
    bear: "rgba(239,68,68,0.08)",
    neutral: "rgba(255,255,255,0.04)",
    accent: "rgba(212,146,42,0.08)",
  };

  return (
    <div
      className="rounded-lg p-5 flex flex-col gap-2"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)", letterSpacing: "0.09em" }}>
          {label}
        </span>
        {Icon && (
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: iconBgMap[direction] }}>
            <Icon size={12} style={{ color: colorMap[direction] }} strokeWidth={2} />
          </div>
        )}
      </div>
      <span
        className={`font-mono font-bold tabular-nums leading-none ${size === "md" ? "text-2xl" : "text-lg"}`}
        style={{ color: colorMap[direction] }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs font-mono leading-relaxed" style={{ color: "var(--muted)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}
