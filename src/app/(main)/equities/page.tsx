import { TrendingUp, TrendingDown, BarChart2, Zap, Shield, Flame, Lightbulb, GitCompareArrows, Star } from "lucide-react";
import {
  SectorHeatmap,
  RelativePerformanceChart,
  OilSensitivityBubble,
  CorrelationSparklines,
  CatalystTimeline,
} from "@/components/EquitiesChartsClient";
import { EquitiesScreener } from "@/components/EquitiesScreenerClient";

/* ─── Static data (replace with live API later) ─────────────────────────── */

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
  evNum: number;
  divYield: string;
  divNum: number;
  buybackYield: string;
  fcfYield: string;
  fcfNum: number;
}

const companies: Company[] = [
  { ticker: "XOM",  name: "ExxonMobil",         price: "$118.43", pe: "13.4", dividend: "3.4%", ytd: "+6.2%",  ytdUp: true,  type: "Integrated", evEbitda: "7.2x",  evNum: 7.2,  divYield: "3.4%", divNum: 3.4, buybackYield: "3.1%", fcfYield: "6.2%",  fcfNum: 6.2  },
  { ticker: "CVX",  name: "Chevron",             price: "$159.21", pe: "12.8", dividend: "4.1%", ytd: "+4.8%",  ytdUp: true,  type: "Integrated", evEbitda: "6.8x",  evNum: 6.8,  divYield: "4.1%", divNum: 4.1, buybackYield: "2.8%", fcfYield: "5.9%",  fcfNum: 5.9  },
  { ticker: "BP",   name: "BP",                  price: "$34.72",  pe: "8.1",  dividend: "5.2%", ytd: "+2.1%",  ytdUp: true,  type: "Integrated", evEbitda: "5.1x",  evNum: 5.1,  divYield: "5.2%", divNum: 5.2, buybackYield: "4.2%", fcfYield: "8.1%",  fcfNum: 8.1  },
  { ticker: "SHEL", name: "Shell",               price: "$67.55",  pe: "9.3",  dividend: "4.0%", ytd: "+3.4%",  ytdUp: true,  type: "Integrated", evEbitda: "5.6x",  evNum: 5.6,  divYield: "4.0%", divNum: 4.0, buybackYield: "3.5%", fcfYield: "7.4%",  fcfNum: 7.4  },
  { ticker: "COP",  name: "ConocoPhillips",      price: "$101.87", pe: "11.2", dividend: "2.1%", ytd: "+9.6%",  ytdUp: true,  type: "Upstream",   evEbitda: "6.3x",  evNum: 6.3,  divYield: "2.1%", divNum: 2.1, buybackYield: "3.4%", fcfYield: "7.8%",  fcfNum: 7.8  },
  { ticker: "OXY",  name: "Occidental",          price: "$52.14",  pe: "10.5", dividend: "1.8%", ytd: "+12.4%", ytdUp: true,  type: "Upstream",   evEbitda: "5.8x",  evNum: 5.8,  divYield: "1.8%", divNum: 1.8, buybackYield: "2.1%", fcfYield: "9.2%",  fcfNum: 9.2  },
  { ticker: "APA",  name: "APA Corp",            price: "$24.38",  pe: "7.6",  dividend: "3.2%", ytd: "+8.1%",  ytdUp: true,  type: "Upstream",   evEbitda: "4.2x",  evNum: 4.2,  divYield: "3.2%", divNum: 3.2, buybackYield: "1.9%", fcfYield: "11.4%", fcfNum: 11.4 },
  { ticker: "VLO",  name: "Valero Energy",       price: "$162.50", pe: "9.8",  dividend: "3.1%", ytd: "+5.3%",  ytdUp: true,  type: "Refining",   evEbitda: "5.9x",  evNum: 5.9,  divYield: "3.1%", divNum: 3.1, buybackYield: "4.8%", fcfYield: "10.2%", fcfNum: 10.2 },
  { ticker: "MPC",  name: "Marathon Petroleum",  price: "$185.34", pe: "8.4",  dividend: "2.3%", ytd: "+7.8%",  ytdUp: true,  type: "Refining",   evEbitda: "5.1x",  evNum: 5.1,  divYield: "2.3%", divNum: 2.3, buybackYield: "5.6%", fcfYield: "11.8%", fcfNum: 11.8 },
  { ticker: "SLB",  name: "SLB (Schlumberger)",  price: "$43.21",  pe: "15.1", dividend: "2.6%", ytd: "-3.2%",  ytdUp: false, type: "Services",   evEbitda: "9.4x",  evNum: 9.4,  divYield: "2.6%", divNum: 2.6, buybackYield: "1.2%", fcfYield: "5.1%",  fcfNum: 5.1  },
  { ticker: "HAL",  name: "Halliburton",         price: "$34.56",  pe: "13.7", dividend: "2.2%", ytd: "-1.8%",  ytdUp: false, type: "Services",   evEbitda: "8.7x",  evNum: 8.7,  divYield: "2.2%", divNum: 2.2, buybackYield: "1.0%", fcfYield: "4.8%",  fcfNum: 4.8  },
];

const typeColors: Record<CompanyType, { bg: string; text: string; border: string }> = {
  Integrated: { bg: "rgba(212,146,42,0.08)",  text: "#d4922a", border: "rgba(212,146,42,0.25)" },
  Upstream:   { bg: "rgba(34,197,94,0.07)",   text: "#22c55e", border: "rgba(34,197,94,0.2)"  },
  Refining:   { bg: "rgba(99,102,241,0.1)",   text: "#818cf8", border: "rgba(99,102,241,0.25)"},
  Services:   { bg: "rgba(148,163,184,0.08)", text: "#94a3b8", border: "rgba(148,163,184,0.2)"},
  Midstream:  { bg: "rgba(251,146,60,0.08)",  text: "#fb923c", border: "rgba(251,146,60,0.2)" },
};

interface SensitivityGroup {
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  description: string;
  tickers: { ticker: string; name: string; note: string }[];
}

const sensitivityGroups: SensitivityGroup[] = [
  {
    label: "High Beta to Oil",
    icon: <Flame size={14} />,
    color: "#f97316",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.18)",
    description: "These names move aggressively with WTI/Brent. Leverage rises when oil rallies — but drawdowns are steep on selloffs.",
    tickers: [
      { ticker: "OXY",  name: "Occidental",     note: "High oil-price leverage, Buffett-backed" },
      { ticker: "COP",  name: "ConocoPhillips", note: "Low-cost upstream, strong FCF torque"    },
      { ticker: "APA",  name: "APA Corp",        note: "Small-cap E&P with high sensitivity"    },
    ],
  },
  {
    label: "Defensive Majors",
    icon: <Shield size={14} />,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.18)",
    description: "Integrated balance sheets, strong dividends, and downstream buffers dampen oil volatility impact.",
    tickers: [
      { ticker: "XOM",  name: "ExxonMobil", note: "Integrated, best-in-class balance sheet" },
      { ticker: "CVX",  name: "Chevron",    note: "Diversified cash flows, low debt"        },
    ],
  },
  {
    label: "Crack Spread Winners",
    icon: <Zap size={14} />,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.2)",
    description: "Refiners profit from the spread between crude input costs and product output prices — not from crude prices directly.",
    tickers: [
      { ticker: "VLO", name: "Valero Energy",      note: "Largest independent refiner in the US"  },
      { ticker: "MPC", name: "Marathon Petroleum", note: "High complexity refineries, MPLX upside" },
    ],
  },
];

interface EquityIdea {
  theme: string;
  tickers: string;
  rationale: string;
  condition: string;
  color: string;
  bg: string;
  border: string;
}

const weeklyIdeas: EquityIdea[] = [
  {
    theme: "Bullish Refiners",
    tickers: "VLO · MPC",
    rationale: "Crack spreads elevated — refining margins remain wide as distillate and gasoline demand outpaces crude supply tightness.",
    condition: "Crack spreads elevated",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    theme: "Defensive Majors",
    tickers: "XOM · CVX",
    rationale: "High macro or geopolitical uncertainty favors integrated names with diversified cash flows, strong dividends, and balance sheet depth.",
    condition: "Uncertainty / risk-off",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.18)",
  },
  {
    theme: "Services Recovery",
    tickers: "SLB · HAL",
    rationale: "Rising upstream capex guidance from majors and E&P companies signals an activity recovery — oilfield services are typically a lagging beneficiary.",
    condition: "Capex cycle rising",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.06)",
    border: "rgba(148,163,184,0.2)",
  },
];

type CatalystCategory = "Earnings" | "OPEC" | "EIA" | "Macro" | "Dividend";

interface Catalyst {
  date: string;
  event: string;
  ticker?: string;
  category: CatalystCategory;
}

const catalysts: Catalyst[] = [
  { date: "Apr 30",  event: "EIA WPSR Release",           category: "EIA"      },
  { date: "May 1",   event: "Fed FOMC Decision",           category: "Macro"    },
  { date: "May 2",   event: "XOM Q1 Earnings",            ticker: "XOM",  category: "Earnings" },
  { date: "May 2",   event: "CVX Q1 Earnings",            ticker: "CVX",  category: "Earnings" },
  { date: "May 5",   event: "OPEC+ Joint Ministerial",     category: "OPEC"     },
  { date: "May 7",   event: "EIA WPSR Release",            category: "EIA"      },
  { date: "May 8",   event: "VLO Q1 Earnings",            ticker: "VLO",  category: "Earnings" },
  { date: "May 9",   event: "MPC Q1 Earnings",            ticker: "MPC",  category: "Earnings" },
  { date: "May 12",  event: "OXY Dividend Ex-Date",        ticker: "OXY",  category: "Dividend" },
  { date: "May 16",  event: "SLB Q1 Earnings",            ticker: "SLB",  category: "Earnings" },
];

const catalystColors: Record<CatalystCategory, { text: string; bg: string; border: string }> = {
  Earnings: { text: "#d4922a", bg: "rgba(212,146,42,0.08)", border: "rgba(212,146,42,0.2)"  },
  OPEC:     { text: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.2)"  },
  EIA:      { text: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.2)"   },
  Macro:    { text: "#94a3b8", bg: "rgba(148,163,184,0.07)",border: "rgba(148,163,184,0.2)" },
  Dividend: { text: "#818cf8", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)"  },
};

interface Correlation {
  pair: string;
  description: string;
  relationship: string;
  note: string;
  color: string;
  bar: number;
}

const correlations: Correlation[] = [
  {
    pair: "XOM vs Brent",
    description: "Integrated majors have moderate Brent correlation — downstream operations partially hedge crude moves.",
    relationship: "Moderate positive",
    note: "r ≈ 0.55 (36-month rolling)",
    color: "#d4922a",
    bar: 55,
  },
  {
    pair: "VLO vs Crack Spreads",
    description: "Refiners track crack spread margins more closely than crude prices — the input/output differential drives earnings.",
    relationship: "Strong positive",
    note: "r ≈ 0.78 (36-month rolling)",
    color: "#818cf8",
    bar: 78,
  },
  {
    pair: "SLB vs Rig Count",
    description: "Oilfield services revenue is directly tied to drilling activity. Baker Hughes rig count is the leading indicator.",
    relationship: "Strong positive",
    note: "r ≈ 0.71 (36-month rolling)",
    color: "#94a3b8",
    bar: 71,
  },
  {
    pair: "OXY vs WTI",
    description: "High-beta E&P with significant leverage to WTI price — Permian Basin exposure amplifies crude moves.",
    relationship: "Very strong positive",
    note: "r ≈ 0.84 (36-month rolling)",
    color: "#f97316",
    bar: 84,
  },
];

/* ─── Opportunity Score ──────────────────────────────────────────────────── */

interface OppScore {
  rank: number;
  ticker: string;
  name: string;
  type: string;
  valuation: number;
  momentum: number;
  oilSensitivity: number;
  balanceSheet: number;
  macroSetup: number;
  total: number;
  thesis: string;
  badges: string[];
}

const opportunityRanking: OppScore[] = [
  {
    rank: 1, ticker: "OXY", name: "Occidental", type: "Upstream",
    valuation: 17, momentum: 18, oilSensitivity: 19, balanceSheet: 14, macroSetup: 17, total: 85,
    thesis: "Highest oil beta in universe, strong Permian FCF, Buffett stake signals long-term conviction.",
    badges: ["Oil Levered", "Momentum Strong", "Attractive Value"],
  },
  {
    rank: 2, ticker: "COP", name: "ConocoPhillips", type: "Upstream",
    valuation: 16, momentum: 16, oilSensitivity: 17, balanceSheet: 16, macroSetup: 15, total: 80,
    thesis: "Best-in-class low-cost E&P with strong FCF torque, variable dividend, and clean balance sheet.",
    badges: ["Low-Cost E&P", "Strong FCF", "Clean Balance Sheet"],
  },
  {
    rank: 3, ticker: "VLO", name: "Valero Energy", type: "Refining",
    valuation: 18, momentum: 15, oilSensitivity: 10, balanceSheet: 17, macroSetup: 18, total: 78,
    thesis: "Crack spreads elevated, refining margins wide, defensive to crude selloffs yet earnings-rich.",
    badges: ["Crack Spread Winner", "Defensive", "Capital Return"],
  },
  {
    rank: 4, ticker: "APA", name: "APA Corp", type: "Upstream",
    valuation: 19, momentum: 14, oilSensitivity: 18, balanceSheet: 12, macroSetup: 14, total: 77,
    thesis: "Deeply discounted to intrinsic value, high oil leverage, Suriname optionality not priced in.",
    badges: ["Deep Value", "High Beta", "Optionality"],
  },
  {
    rank: 5, ticker: "MPC", name: "Marathon Petroleum", type: "Refining",
    valuation: 17, momentum: 15, oilSensitivity:  9, balanceSheet: 17, macroSetup: 17, total: 75,
    thesis: "High-complexity refinery network, aggressive buyback program, MPLX MLP provides yield support.",
    badges: ["Buyback Machine", "High Complexity", "MLP Yield"],
  },
];

const scoreComponents = [
  { key: "valuation",      label: "Valuation",   color: "#d4922a" },
  { key: "momentum",       label: "Momentum",    color: "#22c55e" },
  { key: "oilSensitivity", label: "Oil Sensitivity", color: "#f97316" },
  { key: "balanceSheet",   label: "Balance Sheet",   color: "#818cf8" },
  { key: "macroSetup",     label: "Macro Setup", color: "#94a3b8" },
] as const;

/* ─── Featured Idea ──────────────────────────────────────────────────────── */

const featuredIdea = {
  week: "Apr 28, 2026",
  theme: "Bullish Refiners",
  tickers: "VLO / MPC",
  tagline: "Crack spreads elevated — refining margins remain wide.",
  rationale: "Distillate demand continues to outpace refinery throughput recovery while crude input costs have softened. The 321 crack spread remains above 5-year seasonal averages, creating a favorable margin environment for complex refiners. Both VLO and MPC trade at single-digit P/E with aggressive capital return programs.",
  condition: "Crack spreads elevated · Distillate demand firm · Crude prices stable-to-soft",
  color: "#818cf8",
  bg: "rgba(99,102,241,0.06)",
  border: "rgba(99,102,241,0.2)",
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const CARD: React.CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
};

function SectionHead({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-0.5 h-6 rounded-full" style={{ background: "var(--accent)" }} />
      <div>
        <h2 className="text-sm font-bold text-white font-mono tracking-widest uppercase">{label}</h2>
        {sub && <p className="text-[11px] font-mono mt-0.5" style={{ color: "#555" }}>{sub}</p>}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function EquitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <TrendingUp size={15} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            CrudeQ
          </p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Energy Equities</h1>
        <div className="h-px w-12 mb-3" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#777" }}>
          Oil majors, E&amp;P companies, refiners, oilfield services, and midstream — screened through a
          commodity-first lens. Understand how energy equities move with the underlying market.
        </p>
      </div>

      {/* ── Sticky summary bar ─────────────────────────────────────────────── */}
      <div style={{
        position: "sticky", top: 56, zIndex: 40,
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)",
        marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24,
        marginBottom: 28,
      }}>
        <div className="flex items-center max-w-7xl mx-auto overflow-x-auto">
          {[
            { label: "XLE ETF",         value: "$91.42",  metric: "+1.24% today",    color: "#d4922a" },
            { label: "BRENT CRUDE",     value: "$89.60",  metric: "+0.83% today",    color: "#22c55e" },
            { label: "WTI CRUDE",       value: "$86.41",  metric: "+0.91% today",    color: "#22c55e" },
            { label: "NAT GAS (HH)",    value: "$2.14",   metric: "−1.38% today",    color: "#ef4444" },
            { label: "ENERGY vs S&P",   value: "+3.2%",   metric: "YTD outperform",  color: "#22c55e" },
            { label: "TOP OPPORTUNITY", value: "OXY",     metric: "Score 85/100",    color: "#eab308" },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center shrink-0"
              style={{ borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div className="px-5 py-3">
                <div className="text-[9px] font-mono tracking-widest mb-0.5" style={{ color: "#444" }}>{item.label}</div>
                <div className="text-sm font-mono font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-[9px] font-mono" style={{ color: "#444" }}>{item.metric}</div>
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2 pr-2 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
            <span className="text-[9px] font-mono" style={{ color: "#555" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* ── Featured Idea Card ─────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="rounded-xl p-6 overflow-hidden" style={{ background: featuredIdea.bg, border: `1px solid ${featuredIdea.border}` }}>
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${featuredIdea.border}` }}>
                <Star size={14} style={{ color: featuredIdea.color }} />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: featuredIdea.color }}>
                  This Week&apos;s Equity Lens
                </p>
                <p className="text-xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {featuredIdea.theme} — <span style={{ color: featuredIdea.color }}>{featuredIdea.tickers}</span>
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono shrink-0" style={{ color: "#555" }}>{featuredIdea.week}</span>
          </div>
          <p className="text-sm font-semibold text-white mb-3">{featuredIdea.tagline}</p>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#888" }}>{featuredIdea.rationale}</p>
          <div className="flex items-center gap-2 flex-wrap pt-3" style={{ borderTop: `1px solid ${featuredIdea.border}` }}>
            <span className="text-[10px] font-mono" style={{ color: "#555" }}>CONDITIONS:</span>
            {featuredIdea.condition.split(" · ").map((c) => (
              <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{ background: "rgba(255,255,255,0.04)", color: "#666", border: "1px solid rgba(255,255,255,0.07)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 1. Sector Dashboard ────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Sector Dashboard" sub="Key energy sector benchmarks and constituent performance." />

        {/* KPI hero row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {[
            { label: "XLE ETF",          value: "$91.42",  detail: "+1.24%",  sub: "Energy sector ETF",           color: "#d4922a", bg: "rgba(212,146,42,0.08)", border: "rgba(212,146,42,0.25)", icon: BarChart2,   up: true  },
            { label: "Brent Crude",       value: "$89.60",  detail: "+0.83%",  sub: "ICE front-month",             color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.2)",  icon: TrendingUp,  up: true  },
            { label: "WTI Crude",         value: "$86.41",  detail: "+0.91%",  sub: "NYMEX CL1",                   color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.2)",  icon: TrendingUp,  up: true  },
            { label: "Nat Gas (HH)",      value: "$2.14",   detail: "−1.38%",  sub: "Henry Hub front-month",       color: "#ef4444", bg: "rgba(239,68,68,0.07)",  border: "rgba(239,68,68,0.2)",  icon: TrendingDown, up: false },
            { label: "Energy vs S&P",     value: "+3.2%",   detail: "YTD rel.", sub: "XLE outperforming SPX YTD",  color: "#22c55e", bg: "rgba(34,197,94,0.07)",  border: "rgba(34,197,94,0.2)",  icon: TrendingUp,  up: true  },
          ].map(({ label, value, detail, sub, color, bg, border, icon: Icon, up }) => (
            <div key={label} className="rounded-xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                  style={{ background: `${color}20`, border: `1px solid ${color}50` }}>
                  <Icon size={13} style={{ color }} />
                </div>
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold" style={{ color: "#666" }}>
                  {label}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</div>
              <div className="text-sm font-mono font-bold mb-1" style={{ color }}>{detail}</div>
              <div className="text-[10px] leading-snug" style={{ color: "#555" }}>{sub}</div>
            </div>
          ))}
        </div>

        <SectorHeatmap />
        <p className="mt-3 text-[10px] font-mono" style={{ color: "#333" }}>
          * Prices are static illustrative values. Live data feed coming in future release.
        </p>
      </div>

      {/* ── Relative Performance Chart ─────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Relative Performance" sub="XLE vs S&P 500 vs WTI indexed to 100 — select time range." />
        <RelativePerformanceChart />
      </div>

      {/* ── 2. Company Screener ────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Company Screener" sub="Filter by sub-sector, dividend, beta, valuation, or momentum." />
        <EquitiesScreener />
      </div>

      {/* ── 3. Oil Sensitivity ─────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Oil Price Sensitivity" sub="Who benefits most from rising oil? Understand beta by sub-sector." />
        <div className="mb-5 px-5 py-4 rounded-xl" style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.15)" }}>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={13} style={{ color: "var(--accent)" }} />
            <p className="text-[11px] font-mono tracking-wider uppercase" style={{ color: "var(--accent)" }}>
              Who Benefits Most From Rising Oil?
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Energy equities do not all move the same way with crude. Understanding sensitivity by sub-sector
            is critical for positioning — especially around EIA releases, OPEC decisions, and macro risk-off events.
          </p>
        </div>

        <OilSensitivityBubble />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {sensitivityGroups.map((group) => (
            <div key={group.label} className="rounded-xl border p-5 flex flex-col gap-4"
              style={{ background: group.bg, borderColor: group.border }}>
              <div className="flex items-center gap-2">
                <span style={{ color: group.color }}>{group.icon}</span>
                <p className="text-[11px] font-mono tracking-wider uppercase font-semibold" style={{ color: group.color }}>
                  {group.label}
                </p>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {group.description}
              </p>
              <div className="flex flex-col gap-2 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {group.tickers.map((t) => (
                  <div key={t.ticker} className="flex items-start gap-3">
                    <span className="text-[11px] font-mono font-semibold shrink-0 mt-0.5" style={{ color: group.color }}>
                      {t.ticker}
                    </span>
                    <span className="text-[11px] leading-snug" style={{ color: "#666" }}>
                      {t.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. Weekly Equity Ideas ─────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Weekly Equity Ideas" sub="Thematic setups aligned to current commodity conditions." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyIdeas.map((idea) => (
            <div key={idea.theme} className="rounded-xl border p-5 flex flex-col gap-3"
              style={{ background: idea.bg, borderColor: idea.border }}>
              <div className="flex items-center gap-2">
                <Lightbulb size={13} style={{ color: idea.color }} />
                <p className="text-[11px] font-mono tracking-wider uppercase font-semibold" style={{ color: idea.color }}>
                  {idea.theme}
                </p>
              </div>
              <p className="text-base font-semibold text-white font-mono">{idea.tickers}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {idea.rationale}
              </p>
              <div className="mt-auto pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-[10px] font-mono tracking-wider" style={{ color: "#555" }}>
                  CONDITION: {idea.condition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. Valuation Snapshot ──────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Valuation Snapshot" sub="Heatmap: green = cheapest EV/EBITDA, red = richest. Yields: green = highest." />
        {(() => {
          const evMin = Math.min(...companies.map((c) => c.evNum));
          const evMax = Math.max(...companies.map((c) => c.evNum));
          const fcfMax = Math.max(...companies.map((c) => c.fcfNum));
          const divMax = Math.max(...companies.map((c) => c.divNum));

          // Green = cheap (low EV/EBITDA or high yield), Red = expensive
          const evColor = (v: number) => {
            const t = (v - evMin) / (evMax - evMin); // 0=cheap(green) 1=rich(red)
            if (t < 0.25) return { bg: "rgba(34,197,94,0.18)", text: "#22c55e" };
            if (t < 0.5)  return { bg: "rgba(34,197,94,0.08)", text: "#4ade80" };
            if (t < 0.75) return { bg: "rgba(249,115,22,0.08)", text: "#f97316" };
            return { bg: "rgba(239,68,68,0.12)", text: "#ef4444" };
          };
          const yieldColor = (v: number, max: number) => {
            const t = v / max; // higher = better
            if (t > 0.75) return { bg: "rgba(34,197,94,0.18)", text: "#22c55e" };
            if (t > 0.5)  return { bg: "rgba(34,197,94,0.08)", text: "#4ade80" };
            if (t > 0.25) return { bg: "rgba(148,163,184,0.08)", text: "#94a3b8" };
            return { bg: "rgba(255,255,255,0.03)", text: "#555" };
          };

          return (
            <div className="rounded-xl overflow-hidden" style={CARD}>
              {/* Heatmap legend */}
              <div className="flex items-center gap-5 px-5 py-2.5 border-b" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.015)" }}>
                <span className="text-[9px] font-mono" style={{ color: "#444" }}>EV/EBITDA:</span>
                {[{ l: "Cheapest", c: "#22c55e" }, { l: "Cheap", c: "#4ade80" }, { l: "Rich", c: "#f97316" }, { l: "Richest", c: "#ef4444" }].map((x) => (
                  <div key={x.l} className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: x.c, opacity: 0.5 }} />
                    <span className="text-[9px] font-mono" style={{ color: x.c }}>{x.l}</span>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      {["Ticker", "Type", "EV / EBITDA", "Div Yield", "Buyback Yield", "FCF Yield"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] font-mono tracking-widest uppercase font-bold"
                          style={{ color: "#666" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map((co, i) => {
                      const ev = evColor(co.evNum);
                      const div = yieldColor(co.divNum, divMax);
                      const fcf = yieldColor(co.fcfNum, fcfMax);
                      return (
                        <tr key={co.ticker}
                          className="hover:bg-white/[0.025] transition-colors"
                          style={{ borderBottom: i < companies.length - 1 ? "1px solid var(--border)" : "none" }}>
                          <td className="px-5 py-4">
                            <span className="text-sm font-bold font-mono" style={{ color: "var(--accent)" }}>{co.ticker}</span>
                            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#555" }}>{co.name}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                              style={{ background: typeColors[co.type].bg, color: typeColors[co.type].text, border: `1px solid ${typeColors[co.type].border}` }}>
                              {co.type}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-sm font-mono font-bold px-2 py-1 rounded" style={{ background: ev.bg, color: ev.text }}>
                              {co.evEbitda}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-sm font-mono font-bold px-2 py-1 rounded" style={{ background: div.bg, color: div.text }}>
                              {co.divYield}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm font-mono font-bold" style={{ color: "#818cf8" }}>{co.buybackYield}</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-sm font-mono font-bold px-2 py-1 rounded" style={{ background: fcf.bg, color: fcf.text }}>
                              {co.fcfYield}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}
        <p className="mt-3 text-[10px] font-mono" style={{ color: "#333" }}>
          * Color intensity = relative cheapness/richness within this universe. All figures illustrative.
        </p>
      </div>

      {/* ── Opportunity Ranking ────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="CrudeQ Opportunity Ranking" sub="Composite score /100 across Valuation, Momentum, Oil Sensitivity, Balance Sheet, Macro Setup." />
        <p className="text-xs leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--muted)" }}>
          Each name scored /20 across five factors: Valuation, Momentum, Oil Sensitivity, Balance Sheet, Macro Setup.
          Total out of 100.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunityRanking.map((opp) => {
            const scoreColor = opp.total >= 82 ? "#22c55e" : opp.total >= 77 ? "#d4922a" : "#94a3b8";
            const pct = opp.total;
            return (
              <div key={opp.ticker} className="rounded-lg p-5 flex flex-col gap-4"
                style={{ background: "#000", border: `1px solid ${scoreColor}30` }}>
                {/* Top: rank + score */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                        style={{ background: opp.rank === 1 ? "rgba(212,146,42,0.18)" : "rgba(255,255,255,0.06)",
                                 color: opp.rank === 1 ? "#d4922a" : "#888",
                                 border: opp.rank === 1 ? "1px solid rgba(212,146,42,0.35)" : "1px solid rgba(255,255,255,0.1)" }}>
                        #{opp.rank}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm"
                        style={{ background: typeColors[opp.type as CompanyType]?.bg ?? "rgba(255,255,255,0.05)",
                                 color: typeColors[opp.type as CompanyType]?.text ?? "#888",
                                 border: `1px solid ${typeColors[opp.type as CompanyType]?.border ?? "rgba(255,255,255,0.1)"}` }}>
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-2xl font-bold font-mono" style={{ color: scoreColor }}>{opp.ticker}</p>
                    <p className="text-[12px]" style={{ color: "#aaa" }}>{opp.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold font-mono" style={{ color: scoreColor }}>{opp.total}</p>
                    <p className="text-[10px] font-mono" style={{ color: "#555" }}>/100</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[9px] font-mono" style={{ color: "#444" }}>0</span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: scoreColor }}>{pct} / 100</span>
                    <span className="text-[9px] font-mono" style={{ color: "#444" }}>100</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${scoreColor}55, ${scoreColor})` }} />
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {opp.badges.map((b) => (
                    <span key={b} className="text-[9px] font-mono px-2 py-0.5 rounded"
                      style={{ background: `${scoreColor}12`, color: scoreColor, border: `1px solid ${scoreColor}35` }}>
                      {b}
                    </span>
                  ))}
                </div>

                {/* Mini note */}
                <p className="text-[11px] leading-relaxed pt-2" style={{ color: "#bbb", borderTop: `1px solid ${scoreColor}18` }}>
                  {opp.thesis}
                </p>

                {/* Factor KPI mini cards */}
                <div className="grid grid-cols-5 gap-1.5">
                  {scoreComponents.map((sc) => (
                    <div key={sc.key} className="rounded px-1.5 py-2 flex flex-col items-center gap-1"
                      style={{ background: "#0a0a0a", border: `1px solid ${sc.color}25` }}>
                      <span className="text-base font-bold font-mono" style={{ color: sc.color }}>
                        {opp[sc.key]}
                      </span>
                      <span className="text-[7px] font-mono text-center leading-tight" style={{ color: "#ccc" }}>
                        {sc.label.split(" ")[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] font-mono" style={{ color: "#333" }}>
          * Scores are illustrative and reflect a subjective composite framework. Not investment advice.
        </p>
      </div>

      {/* ── Catalyst Timeline ──────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Catalyst Timeline" sub="Upcoming events, earnings, and macro releases that could move energy equities." />
        <CatalystTimeline />
      </div>

      {/* ── 7. Stock vs Oil Correlation ────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Stock vs Oil Correlation" sub="12-month rolling Pearson r — how tightly each name tracks its primary commodity driver." />
        <div className="mb-5 px-5 py-4 rounded-xl" style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.15)" }}>
          <div className="flex items-center gap-2 mb-1">
            <GitCompareArrows size={13} style={{ color: "var(--accent)" }} />
            <p className="text-[11px] font-mono tracking-wider uppercase" style={{ color: "var(--accent)" }}>
              How Equities Move Relative to Underlying Commodity Drivers
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            12-month rolling Pearson correlation between equity price and primary commodity driver.
            Higher values indicate tighter co-movement. Correlations shift with macro regimes.
          </p>
        </div>
        <CorrelationSparklines />
        <p className="mt-3 text-[10px] font-mono" style={{ color: "#333" }}>
          * Correlation values are illustrative estimates. Live charting with historical overlays planned for future release.
        </p>
      </div>

      {/* ── Scenario Matrix ────────────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Scenario Matrix" sub="Which names perform best under each macro / commodity scenario." />
        <p className="text-xs leading-relaxed mb-5 max-w-2xl" style={{ color: "var(--muted)" }}>
          Use as a quick rotation guide alongside the weekly brief.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              scenario: "Oil ↑",
              label: "Rising Crude",
              desc: "WTI/Brent breakout, supply tightness, geopolitical risk premium building.",
              tickers: ["OXY", "COP", "APA"],
              colors: ["#22c55e","#22c55e","#22c55e"],
              bg: "rgba(34,197,94,0.05)",
              border: "rgba(34,197,94,0.18)",
              accent: "#22c55e",
            },
            {
              scenario: "Oil Flat",
              label: "Range-Bound Crude",
              desc: "Sideways WTI, no directional momentum — income and balance sheet quality wins.",
              tickers: ["XOM", "CVX"],
              colors: ["#d4922a","#d4922a"],
              bg: "rgba(212,146,42,0.05)",
              border: "rgba(212,146,42,0.18)",
              accent: "#d4922a",
            },
            {
              scenario: "Cracks ↑",
              label: "Elevated Crack Spreads",
              desc: "Refining margins wide — distillate or gasoline demand surge, crude input costs soft.",
              tickers: ["VLO", "MPC"],
              colors: ["#818cf8","#818cf8"],
              bg: "rgba(99,102,241,0.05)",
              border: "rgba(99,102,241,0.2)",
              accent: "#818cf8",
            },
            {
              scenario: "Capex ↑",
              label: "Rising Upstream Spend",
              desc: "Operators increasing drilling budgets — services volumes, pricing power, backlog rebuilding.",
              tickers: ["SLB", "HAL"],
              colors: ["#94a3b8","#94a3b8"],
              bg: "rgba(148,163,184,0.05)",
              border: "rgba(148,163,184,0.2)",
              accent: "#94a3b8",
            },
          ].map((s) => (
            <div key={s.scenario} className="rounded-xl border p-5 flex flex-col gap-4"
              style={{ background: s.bg, borderColor: s.border }}>
              <div>
                <p className="text-xl font-bold font-mono mb-0.5" style={{ color: s.accent }}>{s.scenario}</p>
                <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: s.accent, opacity: 0.7 }}>{s.label}</p>
              </div>
              <p className="text-[11px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{s.desc}</p>
              <div className="flex flex-col gap-1.5 pt-3" style={{ borderTop: `1px solid ${s.border}` }}>
                <p className="text-[9px] font-mono tracking-widest uppercase mb-1" style={{ color: "#444" }}>Best Names</p>
                {s.tickers.map((t, i) => (
                  <div key={t} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.colors[i] }} />
                    <span className="text-sm font-bold font-mono" style={{ color: s.colors[i] }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
      <div className="rounded-xl p-4"
        style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.12)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "#555" }}>
          <span className="font-mono font-bold" style={{ color: "var(--accent)" }}>NOTE — </span>
          All data displayed is illustrative and for educational purposes only. Prices, fundamentals, and scores
          reflect static sample values. Live data feeds, interactive correlation overlays, and sector rotation
          signals are planned for a future release. Not investment advice.
        </p>
      </div>

    </div>
  );
}
