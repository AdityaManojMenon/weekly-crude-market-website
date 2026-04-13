interface Props {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export default function SectionHeader({ title, subtitle, accent }: Props) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <div className="flex items-center gap-2">
        {accent && <div className="w-1 h-4 rounded-full" style={{ background: "var(--accent)" }} />}
        <h2 className="text-xs font-mono tracking-widest uppercase font-semibold" style={{ color: accent ? "var(--accent)" : "var(--muted)" }}>
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
