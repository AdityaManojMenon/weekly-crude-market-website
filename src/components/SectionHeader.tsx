import { type LucideIcon } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  accent?: boolean;
  icon?: LucideIcon;
}

export default function SectionHeader({ title, subtitle, accent, icon: Icon }: Props) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <div className="flex items-center gap-2">
        {accent && <div className="w-1 h-4 rounded-full shrink-0" style={{ background: "var(--accent)" }} />}
        {Icon && (
          <Icon
            size={13}
            style={{ color: accent ? "var(--accent)" : "var(--muted)", marginBottom: "1px" }}
            strokeWidth={2}
          />
        )}
        <h2
          className="text-xs font-mono tracking-widest uppercase font-bold"
          style={{ color: accent ? "var(--accent)" : "var(--muted)", letterSpacing: "0.1em" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono" style={{ color: "var(--muted-2)" }}>{subtitle}</span>
        </>
      )}
      {!subtitle && <div className="flex-1 h-px" style={{ background: "var(--border)" }} />}
    </div>
  );
}
