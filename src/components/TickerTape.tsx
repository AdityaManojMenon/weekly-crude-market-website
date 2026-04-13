"use client";

const tickers = [
  { label: "WTI CRUDE", value: "71.42", change: "-0.68", pct: "-0.94%" },
  { label: "BRENT", value: "75.54", change: "-0.72", pct: "-0.94%" },
  { label: "NAT GAS", value: "2.14", change: "+0.03", pct: "+1.42%" },
  { label: "RBOB", value: "2.218", change: "-0.008", pct: "-0.36%" },
  { label: "HEATING OIL", value: "2.341", change: "-0.012", pct: "-0.51%" },
  { label: "CL SPREAD", value: "-0.76", change: "-0.18", pct: "BKWDN" },
  { label: "3-2-1 CRACK", value: "24.8", change: "+1.4", pct: "+5.97%" },
  { label: "DXY", value: "104.22", change: "-0.34", pct: "-0.33%" },
  { label: "S&P 500", value: "5,242", change: "+18.4", pct: "+0.35%" },
  { label: "EIA CUSHING", value: "427.1", change: "+1.6", pct: "MMbbl" },
];

function TickerItem({ label, value, change, pct }: { label: string; value: string; change: string; pct: string }) {
  const isPositive = change.startsWith("+");
  const isNeutral = pct === "BKWDN" || pct === "MMbbl";
  const color = isNeutral ? "var(--accent)" : isPositive ? "var(--bull)" : "var(--bear)";

  return (
    <span className="flex items-center gap-2 px-6 whitespace-nowrap">
      <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-xs font-mono font-medium text-white tabular-nums">{value}</span>
      <span className="text-xs font-mono tabular-nums" style={{ color }}>{change}</span>
      <span className="text-xs font-mono" style={{ color }}>({pct})</span>
    </span>
  );
}

export default function TickerTape() {
  const items = [...tickers, ...tickers];

  return (
    <div
      className="overflow-hidden border-b"
      style={{ borderColor: "var(--border)", background: "var(--card)", height: "32px" }}
    >
      <div className="ticker-tape flex items-center h-full" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <TickerItem key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
