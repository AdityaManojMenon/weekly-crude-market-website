"use client";

const tickers = [
  { label: "WTI CRUDE",   value: "89.92",   change: "-7.95",   pct: "-8.12%"  },
  { label: "BRENT",       value: "98.29",   change: "+2.37",   pct: "+2.47%"  },
  { label: "NAT GAS",     value: "2.663",   change: "-0.007",  pct: "-0.26%"  },
  { label: "RBOB",        value: "3.087",   change: "+0.086",  pct: "+2.87%"  },
  { label: "HEATING OIL", value: "3.833",   change: "-0.104",  pct: "-2.64%"  },
  { label: "CL1–CL2",     value: "+3.43",   change: "-4.51",   pct: "BKWDN"   },
  { label: "3-2-1 CRACK", value: "50.16",   change: "+8.89",   pct: "+21.5%"  },
  { label: "DXY",         value: "98.258",  change: "-0.562",  pct: "-0.57%"  },
  { label: "S&P 500",     value: "7,041.3", change: "+216.6",  pct: "+3.17%"  },
  { label: "EIA CUSHING", value: "-1.73",   change: "",        pct: "MMbbl"   },
];

function TickerItem({ label, value, change, pct }: { label: string; value: string; change: string; pct: string }) {
  const changePositive = change.startsWith("+");
  const isSpecial = pct === "BKWDN" || pct === "MMbbl";
  // Change value always uses directional color; pct badge uses accent only when special
  const changeColor = change ? (changePositive ? "var(--bull)" : "var(--bear)") : "var(--muted)";
  const pctColor = isSpecial ? "var(--accent)" : changePositive ? "var(--bull)" : "var(--bear)";

  return (
    <span className="flex items-center gap-2 px-6 whitespace-nowrap">
      <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-xs font-mono font-medium text-white tabular-nums">{value}</span>
      {change && <span className="text-xs font-mono tabular-nums" style={{ color: changeColor }}>{change}</span>}
      <span className="text-xs font-mono" style={{ color: pctColor }}>({pct})</span>
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
