"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, SlidersHorizontal } from "lucide-react";

type CompanyType = "Integrated" | "Upstream" | "Refining" | "Services" | "Midstream";

interface Company {
  ticker: string;
  name: string;
  price: string;
  pe: string;
  dividend: string;
  ytd: string;
  ytdUp: boolean;
  type: CompanyType;
  evEbitda: string;
  divYield: string;
  buybackYield: string;
  fcfYield: string;
  divYieldNum: number;
  oilBeta: number;
  peNum: number;
}

const companies: Company[] = [
  { ticker: "XOM",  name: "ExxonMobil",         price: "$118.43", pe: "13.4", dividend: "3.4%", ytd: "+6.2%",  ytdUp: true,  type: "Integrated", evEbitda: "7.2x",  divYield: "3.4%", buybackYield: "3.1%", fcfYield: "6.2%",  divYieldNum: 3.4, oilBeta: 0.72, peNum: 13.4 },
  { ticker: "CVX",  name: "Chevron",             price: "$159.21", pe: "12.8", dividend: "4.1%", ytd: "+4.8%",  ytdUp: true,  type: "Integrated", evEbitda: "6.8x",  divYield: "4.1%", buybackYield: "2.8%", fcfYield: "5.9%",  divYieldNum: 4.1, oilBeta: 0.68, peNum: 12.8 },
  { ticker: "BP",   name: "BP",                  price: "$34.72",  pe: "8.1",  dividend: "5.2%", ytd: "+2.1%",  ytdUp: true,  type: "Integrated", evEbitda: "5.1x",  divYield: "5.2%", buybackYield: "4.2%", fcfYield: "8.1%",  divYieldNum: 5.2, oilBeta: 0.81, peNum: 8.1  },
  { ticker: "SHEL", name: "Shell",               price: "$67.55",  pe: "9.3",  dividend: "4.0%", ytd: "+3.4%",  ytdUp: true,  type: "Integrated", evEbitda: "5.6x",  divYield: "4.0%", buybackYield: "3.5%", fcfYield: "7.4%",  divYieldNum: 4.0, oilBeta: 0.81, peNum: 9.3  },
  { ticker: "COP",  name: "ConocoPhillips",      price: "$101.87", pe: "11.2", dividend: "2.1%", ytd: "+9.6%",  ytdUp: true,  type: "Upstream",   evEbitda: "6.3x",  divYield: "2.1%", buybackYield: "3.4%", fcfYield: "7.8%",  divYieldNum: 2.1, oilBeta: 1.38, peNum: 11.2 },
  { ticker: "OXY",  name: "Occidental",          price: "$52.14",  pe: "10.5", dividend: "1.8%", ytd: "+12.4%", ytdUp: true,  type: "Upstream",   evEbitda: "5.8x",  divYield: "1.8%", buybackYield: "2.1%", fcfYield: "9.2%",  divYieldNum: 1.8, oilBeta: 1.62, peNum: 10.5 },
  { ticker: "APA",  name: "APA Corp",            price: "$24.38",  pe: "7.6",  dividend: "3.2%", ytd: "+8.1%",  ytdUp: true,  type: "Upstream",   evEbitda: "4.2x",  divYield: "3.2%", buybackYield: "1.9%", fcfYield: "11.4%", divYieldNum: 3.2, oilBeta: 1.51, peNum: 7.6  },
  { ticker: "VLO",  name: "Valero Energy",       price: "$162.50", pe: "9.8",  dividend: "3.1%", ytd: "+5.3%",  ytdUp: true,  type: "Refining",   evEbitda: "5.9x",  divYield: "3.1%", buybackYield: "4.8%", fcfYield: "10.2%", divYieldNum: 3.1, oilBeta: 0.48, peNum: 9.8  },
  { ticker: "MPC",  name: "Marathon Petroleum",  price: "$185.34", pe: "8.4",  dividend: "2.3%", ytd: "+7.8%",  ytdUp: true,  type: "Refining",   evEbitda: "5.1x",  divYield: "2.3%", buybackYield: "5.6%", fcfYield: "11.8%", divYieldNum: 2.3, oilBeta: 0.44, peNum: 8.4  },
  { ticker: "SLB",  name: "SLB (Schlumberger)",  price: "$43.21",  pe: "15.1", dividend: "2.6%", ytd: "-3.2%",  ytdUp: false, type: "Services",   evEbitda: "9.4x",  divYield: "2.6%", buybackYield: "1.2%", fcfYield: "5.1%",  divYieldNum: 2.6, oilBeta: 0.94, peNum: 15.1 },
  { ticker: "HAL",  name: "Halliburton",         price: "$34.56",  pe: "13.7", dividend: "2.2%", ytd: "-1.8%",  ytdUp: false, type: "Services",   evEbitda: "8.7x",  divYield: "2.2%", buybackYield: "1.0%", fcfYield: "4.8%",  divYieldNum: 2.2, oilBeta: 0.88, peNum: 13.7 },
];

const typeColors: Record<CompanyType, { bg: string; text: string; border: string }> = {
  Integrated: { bg: "rgba(212,146,42,0.08)",  text: "#d4922a", border: "rgba(212,146,42,0.25)" },
  Upstream:   { bg: "rgba(34,197,94,0.07)",   text: "#22c55e", border: "rgba(34,197,94,0.2)"  },
  Refining:   { bg: "rgba(99,102,241,0.1)",   text: "#818cf8", border: "rgba(99,102,241,0.25)"},
  Services:   { bg: "rgba(148,163,184,0.08)", text: "#94a3b8", border: "rgba(148,163,184,0.2)"},
  Midstream:  { bg: "rgba(251,146,60,0.08)",  text: "#fb923c", border: "rgba(251,146,60,0.2)" },
};

type FilterKey = "all" | "Integrated" | "Upstream" | "Refining" | "Services" | "highDiv" | "highBeta" | "cheapVal" | "momentum";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",        label: "All"              },
  { key: "Integrated", label: "Integrated"       },
  { key: "Upstream",   label: "Upstream"         },
  { key: "Refining",   label: "Refining"         },
  { key: "Services",   label: "Services"         },
  { key: "highDiv",    label: "Div > 3%"         },
  { key: "highBeta",   label: "High Beta"        },
  { key: "cheapVal",   label: "Cheap Val (P/E<10)"},
  { key: "momentum",   label: "Momentum +"       },
];

function applyFilter(cos: Company[], f: FilterKey): Company[] {
  switch (f) {
    case "Integrated": return cos.filter((c) => c.type === "Integrated");
    case "Upstream":   return cos.filter((c) => c.type === "Upstream");
    case "Refining":   return cos.filter((c) => c.type === "Refining");
    case "Services":   return cos.filter((c) => c.type === "Services");
    case "highDiv":    return cos.filter((c) => c.divYieldNum > 3);
    case "highBeta":   return cos.filter((c) => c.oilBeta > 1.1);
    case "cheapVal":   return cos.filter((c) => c.peNum < 10);
    case "momentum":   return cos.filter((c) => c.ytdUp);
    default:           return cos;
  }
}

export function EquitiesScreener() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const filtered = useMemo(() => applyFilter(companies, activeFilter), [activeFilter]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <SlidersHorizontal size={12} style={{ color: "var(--muted)" }} />
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className="px-3 py-1 text-[10px] font-mono rounded-sm transition-colors"
            style={{
              background: activeFilter === f.key ? "rgba(212,146,42,0.15)" : "rgba(255,255,255,0.03)",
              color: activeFilter === f.key ? "var(--accent)" : "#555",
              border: `1px solid ${activeFilter === f.key ? "rgba(212,146,42,0.3)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-mono" style={{ color: "#444" }}>
          {filtered.length} name{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid var(--border)" }}>
                {["Ticker", "Company", "Price", "P/E", "Dividend", "YTD", "Type"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-widest uppercase"
                    style={{ color: "var(--muted)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-xs font-mono" style={{ color: "#444", background: "var(--card)" }}>
                    No companies match this filter.
                  </td>
                </tr>
              ) : filtered.map((co, i) => (
                <tr key={co.ticker}
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                    background: "var(--card)",
                  }}>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold font-mono" style={{ color: "var(--accent)" }}>{co.ticker}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white">{co.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-white">{co.price}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono" style={{ color: "var(--muted)" }}>{co.pe}x</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono" style={{ color: "#22c55e" }}>{co.dividend}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {co.ytdUp
                        ? <TrendingUp size={11} style={{ color: "#22c55e" }} />
                        : <TrendingDown size={11} style={{ color: "#ef4444" }} />}
                      <span className="text-sm font-mono" style={{ color: co.ytdUp ? "#22c55e" : "#ef4444" }}>
                        {co.ytd}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                      style={{
                        background: typeColors[co.type].bg,
                        color: typeColors[co.type].text,
                        border: `1px solid ${typeColors[co.type].border}`,
                      }}>
                      {co.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-3 text-[10px] font-mono" style={{ color: "#333" }}>
        * All figures are illustrative. Live market data integration planned for future release.
      </p>
    </div>
  );
}
