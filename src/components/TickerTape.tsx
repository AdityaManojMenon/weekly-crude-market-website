"use client";

const tickers = [
  { label: "WTI CRUDE",   value: "97.87",   change: "-2.25",   pct: "-2.25%"  },
  { label: "BRENT",       value: "95.92",   change: "-5.24",   pct: "-5.18%"  },
  { label: "NAT GAS",     value: "2.670",   change: "-0.149",  pct: "-5.29%"  },
  { label: "RBOB",        value: "3.001",   change: "-0.091",  pct: "-2.93%"  },
  { label: "HEATING OIL", value: "3.937",   change: "-0.120",  pct: "-2.95%"  },
  { label: "CL1–CL2",     value: "+7.94",   change: "-1.51",   pct: "BKWDN"   },
  { label: "3-2-1 CRACK", value: "41.27",   change: "+2.88",   pct: "+7.50%"  },
  { label: "DXY",         value: "98.820",  change: "-0.830",  pct: "-0.83%"  },
  { label: "S&P 500",     value: "6,824.7", change: "+249.3",  pct: "+3.79%"  },
  { label: "EIA CUSHING", value: "+3.42",   change: "",        pct: "MMbbl"   },
];

function TickerItem({ label, value, change, pct }: { label: string; value: string; change: string; pct: string }) {
  const isPositive = change.startsWith("+");
  const isNeutral = pct === "BKWDN" || pct === "MMbbl";
  const color = isNeutral ? "var(--accent)" : isPositive ? "var(--bull)" : "var(--bear)";

  return (
    <span className="flex items-center gap-2 px-6 whitespace-nowrap">
      <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-xs font-mono font-medium text-white tabular-nums">{value}</span>
      {change && <span className="text-xs font-mono tabular-nums" style={{ color }}>{change}</span>}
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
