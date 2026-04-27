import {
  Ship, TrendingUp, BarChart2, MapPin, ArrowRight,
  Globe, Flame, Zap, Target, Lightbulb, Clock, AlertCircle,
} from "lucide-react";
import ArbRouteChartWrapper from "@/components/ArbRouteChartWrapper";
import ArbChartsBWrapper from "@/components/ArbChartsBWrapper";
import ArbChartsCDWrapper from "@/components/ArbChartsCDWrapper";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const routes = [
  { route: "USGC → Europe",    origin: "Houston",    dest: "Rotterdam", netback:  2.40, wow: -0.40, signal: "OPEN",     grade: "WTI Midland" },
  { route: "USGC → Asia",      origin: "Houston",    dest: "Singapore", netback:  0.50, wow: -0.10, signal: "MARGINAL", grade: "WTI Midland" },
  { route: "WAF → Europe",     origin: "Nigeria",    dest: "Rotterdam", netback:  1.70, wow: -0.10, signal: "OPEN",     grade: "Bonny Light" },
  { route: "Midland → Asia",   origin: "Corpus",     dest: "Ningbo",    netback:  1.20, wow: +0.20, signal: "OPEN",     grade: "WTI Midland" },
  { route: "Basra → Europe",   origin: "Basra",      dest: "Lavera",    netback: -0.30, wow: -0.20, signal: "CLOSED",   grade: "Basra Heavy" },
  { route: "North Sea → Asia", origin: "Sullom Voe", dest: "Yeosu",     netback:  0.80, wow: +0.10, signal: "MARGINAL", grade: "Forties" },
];

const heatmapWeeks = ["Mar 8", "Mar 22", "Apr 5", "Apr 12", "Apr 19"];
const heatmapData = [
  { route: "USGC → Europe",    values: [3.8, 5.2, 3.2, 2.8, 2.4] },
  { route: "WAF → Europe",     values: [2.4, 3.1, 2.0, 1.8, 1.7] },
  { route: "Midland → Asia",   values: [1.5, 2.2, 1.4, 1.0, 1.2] },
  { route: "North Sea → Asia", values: [0.6, 1.0, 0.8, 0.7, 0.8] },
  { route: "USGC → Asia",      values: [1.2, 1.8, 0.9, 0.6, 0.5] },
  { route: "Basra → Europe",   values: [-0.5, 0.2, -0.3, -0.5, -0.3] },
];

function signalStyle(s: string) {
  if (s === "OPEN")     return { color: "#22c55e", bg: "rgba(34,197,94,0.1)",   border: "rgba(34,197,94,0.25)" };
  if (s === "MARGINAL") return { color: "#eab308", bg: "rgba(234,179,8,0.1)",   border: "rgba(234,179,8,0.25)" };
  return                       { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)" };
}

function heatColor(v: number) {
  if (v >= 3.0) return { bg: "rgba(34,197,94,0.40)",  text: "#86efac" };
  if (v >= 1.5) return { bg: "rgba(34,197,94,0.18)",  text: "#4ade80" };
  if (v >= 0.5) return { bg: "rgba(234,179,8,0.18)",  text: "#fde047" };
  if (v >= 0)   return { bg: "rgba(249,115,22,0.14)", text: "#fb923c" };
  return               { bg: "rgba(239,68,68,0.18)",  text: "#f87171" };
}

// ─── Style constants ──────────────────────────────────────────────────────────

const CARD: React.CSSProperties = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 };

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ArbPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <Globe size={15} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            CrudeQ
          </p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Crude Arb Monitor</h1>
        <div className="h-px w-12 mb-3" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#777" }}>
          Where are the best physical crude arbitrage opportunities right now?
          Route netbacks, grade differentials, and heatmap profitability — updated weekly.
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
        <div className="flex items-center gap-0 max-w-7xl mx-auto overflow-x-auto">
          {[
            { label: "TOP ROUTE",   value: "USGC → EUR",  metric: "+$2.40/bbl", color: "#d4922a" },
            { label: "BRENT–WTI",   value: "$4.70",       metric: "WoW +$6.07", color: "#3b82f6" },
            { label: "BEST CRACK",  value: "$47.55",      metric: "3-2-1 USGC", color: "#8b5cf6" },
            { label: "ASIA ARB",    value: "MARGINAL",    metric: "+$0.50/bbl", color: "#eab308" },
            { label: "UPDATED",     value: "Apr 19 2026", metric: "Post-EIA release", color: "#555" },
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

      {/* ── Tier 1: KPI Hero Row ───────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { icon: Ship,      label: "Top Route",      value: "USGC → Europe", detail: "+$2.40 / bbl", sub: "Best netback — #1 route",    color: "#d4922a", bg: "rgba(212,146,42,0.08)", border: "rgba(212,146,42,0.25)" },
          { icon: MapPin,    label: "Top Grade",      value: "WTI Midland",   detail: "Score 88 / 100",  sub: "Light sweet — broadest demand", color: "#22c55e", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.25)" },
          { icon: TrendingUp,label: "Brent–WTI",      value: "$4.70",         detail: "WoW +$6.07",      sub: "Below 3M avg — spread recovering", color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)" },
          { icon: BarChart2, label: "Best Crack",     value: "$47.55",        detail: "WoW +$6.29",      sub: "3-2-1 USGC — elevated refining margins", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)" },
        ].map(({ icon: Icon, label, value, detail, sub, color, bg, border }) => (
          <div key={label} className="rounded-xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: `${color}20`, border: `1px solid ${color}50` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: "#666" }}>
                {label}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</div>
            <div className="text-sm font-mono font-bold mb-2" style={{ color }}>{detail}</div>
            <div className="text-[11px] leading-snug" style={{ color: "#555" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Section A: Route Scanner ───────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Route Scanner" sub="Higher netback = better economics. Above $1.50 = arb open." />

        {/* Route Netback Table — full width */}
        <div className="mb-4" style={CARD}>
          <div className="px-6 py-4 flex items-baseline gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-bold text-white font-mono">Route Netback Table</span>
            <span className="text-[10px] font-mono" style={{ color: "#555" }}>Netback $/bbl — current week</span>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["ROUTE", "GRADE", "NETBACK $/bbl", "WoW Δ", "SIGNAL"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider font-bold"
                    style={{ color: "#666" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {routes.map((r, i) => {
                const ss = signalStyle(r.signal);
                return (
                  <tr key={r.route}
                    style={{ borderBottom: i < routes.length - 1 ? "1px solid var(--border)" : "none" }}
                    className="hover:bg-white/[0.025] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span style={{ color: "#666", fontSize: 11 }}>{r.origin}</span>
                        <ArrowRight size={11} style={{ color: "#444" }} />
                        <span>{r.dest}</span>
                      </div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: "#555" }}>{r.route}</div>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono font-semibold" style={{ color: "#888" }}>{r.grade}</td>
                    <td className="px-5 py-4">
                      <span className="text-base font-mono font-bold"
                        style={{ color: r.netback > 1.5 ? "#22c55e" : r.netback > 0.5 ? "#eab308" : "#ef4444" }}>
                        {r.netback > 0 ? "+" : ""}{r.netback.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-mono ml-1" style={{ color: "#555" }}>/bbl</span>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono font-bold"
                      style={{ color: r.wow > 0 ? "#22c55e" : r.wow < 0 ? "#ef4444" : "#666" }}>
                      {r.wow > 0 ? "+" : ""}{r.wow.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded"
                        style={{ color: ss.color, background: ss.bg, border: `1px solid ${ss.border}` }}>
                        {r.signal}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-6 py-3 flex items-center gap-6" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="text-[10px] font-mono" style={{ color: "#444" }}>Signal threshold:</span>
            {[
              { label: "> $1.50", color: "#22c55e", text: "OPEN" },
              { label: "$0.50–1.50", color: "#eab308", text: "MARGINAL" },
              { label: "< $0.50", color: "#ef4444", text: "CLOSED" },
            ].map(leg => (
              <div key={leg.label} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: leg.color }} />
                <span className="text-[10px] font-mono" style={{ color: "#555" }}>
                  <span style={{ color: leg.color, fontWeight: 700 }}>{leg.text}</span>{" "}{leg.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Route Netback Chart */}
        <div className="mb-4">
          <ArbRouteChartWrapper />
        </div>

        {/* Route Heatmap — full width, larger */}
        <div style={CARD}>
          <div className="px-6 py-4 flex items-baseline gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-bold text-white font-mono">Route Heatmap</span>
            <span className="text-[10px] font-mono" style={{ color: "#555" }}>
              Netback $/bbl per route — last 5 weeks. Green = open, yellow = marginal, red = closed.
            </span>
          </div>
          <div className="p-6">
            {/* Column headers */}
            <div className="grid mb-3" style={{ gridTemplateColumns: "180px repeat(5, 1fr)", gap: 6 }}>
              <div />
              {heatmapWeeks.map(w => (
                <div key={w} className="text-center text-xs font-mono font-bold text-white">{w}</div>
              ))}
            </div>
            {/* Rows */}
            <div className="flex flex-col gap-2.5">
              {heatmapData.map(row => (
                <div key={row.route} className="grid items-center" style={{ gridTemplateColumns: "180px repeat(5, 1fr)", gap: 6 }}>
                  <div className="text-xs font-mono font-semibold text-white pr-3">{row.route}</div>
                  {row.values.map((v, i) => {
                    const hc = heatColor(v);
                    return (
                      <div key={i} className="flex items-center justify-center rounded font-mono font-bold"
                        style={{ height: 40, background: hc.bg, color: hc.text, fontSize: 12 }}>
                        {v > 0 ? "+" : ""}{v.toFixed(1)}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* Color scale */}
            <div className="mt-5 flex items-center gap-2">
              <span className="text-[10px] font-mono mr-2" style={{ color: "#555" }}>$/bbl scale:</span>
              {[
                { bg: "rgba(239,68,68,0.2)",   text: "#f87171", label: "< 0  Closed" },
                { bg: "rgba(249,115,22,0.15)",  text: "#fb923c", label: "0 – 0.5  Borderline" },
                { bg: "rgba(234,179,8,0.2)",    text: "#fde047", label: "0.5 – 1.5  Marginal" },
                { bg: "rgba(34,197,94,0.18)",   text: "#4ade80", label: "1.5 – 3  Open" },
                { bg: "rgba(34,197,94,0.42)",   text: "#86efac", label: "> 3  Wide open" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 rounded px-2.5 py-1"
                  style={{ background: s.bg }}>
                  <span className="text-[10px] font-mono font-bold" style={{ color: s.text }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section B: Relative Value ──────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Relative Value" sub="Spread analysis and grade differentials vs benchmark crudes." />
        <ArbChartsBWrapper />
      </div>

      {/* ── Section C: Crude Screener ──────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Crude Screener" sub="API gravity, sulfur content, and opportunity scores by grade." />

        <div className="mb-4" style={CARD}>
          <div className="px-6 py-4 flex items-baseline gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <span className="text-sm font-bold text-white font-mono">Grade Database</span>
            <span className="text-[10px] font-mono" style={{ color: "#555" }}>
              Higher API + lower sulfur = better arb optionality
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["GRADE", "API°", "SULFUR %", "DIFF vs BM", "BEST REGION", "REFINERY TYPE"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider font-bold"
                    style={{ color: "#666" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { grade: "WTI Midland",  api: 40.5, sulfur: 0.22, diff: -0.20, region: "Europe / Asia",  refinery: "Simple / Complex", apiColor: "#22c55e", sColor: "#22c55e" },
                { grade: "Bakken",       api: 42.0, sulfur: 0.18, diff: -1.00, region: "Europe",          refinery: "Simple / Complex", apiColor: "#22c55e", sColor: "#22c55e" },
                { grade: "Bonny Light",  api: 35.4, sulfur: 0.12, diff: -1.20, region: "Europe",          refinery: "Simple / Complex", apiColor: "#22c55e", sColor: "#22c55e" },
                { grade: "Forties",      api: 38.0, sulfur: 0.35, diff: -1.80, region: "Europe / USGC",   refinery: "Simple / Complex", apiColor: "#22c55e", sColor: "#eab308" },
                { grade: "Mars",         api: 27.9, sulfur: 1.82, diff: -3.50, region: "USGC",            refinery: "Complex / Coking", apiColor: "#eab308", sColor: "#ef4444" },
                { grade: "Dubai",        api: 31.0, sulfur: 2.00, diff: -2.80, region: "Asia",            refinery: "Complex",          apiColor: "#eab308", sColor: "#ef4444" },
                { grade: "Urals",        api: 31.5, sulfur: 1.50, diff: -8.50, region: "Asia / India",    refinery: "Complex",          apiColor: "#eab308", sColor: "#f97316" },
                { grade: "WCS",          api: 21.0, sulfur: 3.50, diff:-12.00, region: "USGC",            refinery: "Coking",           apiColor: "#ef4444", sColor: "#ef4444" },
              ].map((r, i, arr) => (
                <tr key={r.grade}
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                  className="hover:bg-white/[0.025] transition-colors">
                  <td className="px-5 py-3.5 text-sm font-bold text-white">{r.grade}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-bold" style={{ color: r.apiColor }}>{r.api}°</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-bold" style={{ color: r.sColor }}>{r.sulfur}%</td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-mono font-bold"
                      style={{ color: r.diff > -2 ? "#22c55e" : r.diff > -5 ? "#eab308" : "#ef4444" }}>
                      {r.diff.toFixed(2)}
                    </span>
                    <span className="text-[10px] font-mono ml-1" style={{ color: "#444" }}>/bbl</span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono font-semibold" style={{ color: "#888" }}>{r.region}</td>
                  <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "#666" }}>{r.refinery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ArbChartsCDWrapper />
      </div>

      {/* ── Section D: Refining Economics ─────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Refining Economics" sub="Crack spreads by product. Positive = profitable product slate." />

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "3-2-1 Crack",   icon: Flame,    value:  47.55, wow: +6.29, color: "#d4922a", desc: "USGC benchmark" },
            { label: "Diesel Crack",  icon: Zap,      value:  28.50, wow: +3.20, color: "#22c55e", desc: "Heating oil vs WTI" },
            { label: "Jet Crack",     icon: Zap,      value:  25.30, wow: +2.80, color: "#3b82f6", desc: "Jet fuel vs WTI" },
            { label: "Fuel Oil Crack",icon: BarChart2, value: -10.20, wow: -1.10, color: "#ef4444", desc: "HSFO vs Brent" },
          ].map(({ label, icon: Icon, value, wow, color, desc }) => (
            <div key={label} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <span className="text-xs font-mono font-bold tracking-wide" style={{ color: "#666" }}>{label}</span>
              </div>
              <div className="text-3xl font-mono font-bold mb-1"
                style={{ color: value < 0 ? "#ef4444" : "white" }}>
                {value < 0 ? "-$" : "$"}{Math.abs(value).toFixed(2)}
              </div>
              <div className="text-xs font-mono mb-1" style={{ color: "#444" }}>/bbl</div>
              <div className="text-sm font-mono font-bold" style={{ color: wow >= 0 ? "#22c55e" : "#ef4444" }}>
                {wow >= 0 ? "+" : ""}{wow.toFixed(2)} WoW
              </div>
              <div className="text-[10px] font-mono mt-2" style={{ color: "#555" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section E: Trade Idea Feed ─────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-0.5 h-6 rounded-full" style={{ background: "var(--accent)" }} />
          <h2 className="text-sm font-bold text-white font-mono tracking-widest uppercase">Trade Idea Feed</h2>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded"
            style={{ background: "rgba(212,146,42,0.08)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <Clock size={9} style={{ color: "var(--accent)" }} />
            <span className="text-[9px] font-mono font-bold" style={{ color: "var(--accent)" }}>Apr 19, 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              id: "IDEA-01", signal: "LONG", conviction: "HIGH", convScore: 82,
              title: "Long Midland → Europe",
              timeHorizon: "1–3 WEEKS",
              route: "USGC → Rotterdam",
              netback: "+$2.40/bbl", netbackColor: "#22c55e",
              convColor: "#22c55e", convBg: "rgba(34,197,94,0.08)",
              factors: [
                { icon: BarChart2,   label: "Diesel crack",  value: "$28.50/bbl",   color: "#22c55e" },
                { icon: Ship,        label: "VLCC freight",  value: "$4.20/t eased", color: "#22c55e" },
                { icon: TrendingUp,  label: "Brent premium", value: "$4.70 — recovering", color: "#eab308" },
              ],
              bullets: [
                "Netback down 54% from March peak — still #1 route",
                "European restocking post-run-cut supports refiner bid",
                "VLCC freight eased 8% WoW — window improving",
                "Asia arb near closure — European demand captive",
              ],
              entry: "$92–94 WTI",
              target: "Netback > $3.00",
              stop: "Brent–WTI < $3.00",
              invalidation: "Spread collapses or VLCC freight spikes above $6/t",
            },
            {
              id: "IDEA-02", signal: "LONG", conviction: "MEDIUM", convScore: 58,
              title: "Long Mars → USGC Cokers",
              timeHorizon: "PROMPT",
              route: "Mars LOOP → USGC",
              netback: "+$3.50 vs sour peers", netbackColor: "#22c55e",
              convColor: "#eab308", convBg: "rgba(234,179,8,0.08)",
              factors: [
                { icon: BarChart2,    label: "Sour discount",  value: "−$3.50 vs WTI",  color: "#22c55e" },
                { icon: Flame,        label: "Coker margin",   value: "$18.20/bbl",      color: "#22c55e" },
                { icon: AlertCircle,  label: "VGO spread",     value: "−$1.80 — watch",  color: "#eab308" },
              ],
              bullets: [
                "Mars discount at −$3.50 — above 6M avg of −$2.80",
                "USGC coking utilization near 90% — incentivizes sour",
                "Light sweet oversupply risk from domestic production",
                "VGO spread compressing — monitor for reversal",
              ],
              entry: "Mars diff −$3.25/−$3.75",
              target: "Diff narrows −$2.50",
              stop: "Diff widens −$4.50",
              invalidation: "Light sweet supply disruption raises Midland vs Mars arb",
            },
            {
              id: "IDEA-03", signal: "MONITOR", conviction: "LOW", convScore: 32,
              title: "WAF → Europe Arb Watch",
              timeHorizon: "2–4 WEEKS",
              route: "Nigeria → Rotterdam",
              netback: "+$1.70/bbl", netbackColor: "#eab308",
              convColor: "#3b82f6", convBg: "rgba(59,130,246,0.08)",
              factors: [
                { icon: Ship,       label: "Aframax freight", value: "$3.80/t stable",    color: "#22c55e" },
                { icon: TrendingUp, label: "WAF supply",      value: "Loadings +4% WoW",  color: "#eab308" },
                { icon: BarChart2,  label: "NWE crack",       value: "$38.20/bbl",         color: "#eab308" },
              ],
              bullets: [
                "Arb open but thin — margin of safety limited",
                "Bonny Light loadings up 4% — ample cargo supply",
                "Competing with US Midland for same European slots",
                "Any Aframax tightening closes window quickly",
              ],
              entry: "Spot cargo basis",
              target: "Netback > $2.20",
              stop: "Freight rise or Brent collapse",
              invalidation: "Aframax rates exceed $5/t or WAF loadings surge further",
            },
            {
              id: "IDEA-04", signal: "AVOID", conviction: "LOW", convScore: 15,
              title: "USGC → Asia — Closing",
              timeHorizon: "IMMEDIATE",
              route: "Houston → Singapore",
              netback: "+$0.50/bbl", netbackColor: "#ef4444",
              convColor: "#ef4444", convBg: "rgba(239,68,68,0.08)",
              factors: [
                { icon: Ship,       label: "VLCC freight",    value: "$6.80/t rising",    color: "#ef4444" },
                { icon: TrendingUp, label: "Dubai discount",  value: "−$2.80 vs Brent",   color: "#ef4444" },
                { icon: BarChart2,  label: "Singapore crack", value: "$32.40 — lagging",  color: "#eab308" },
              ],
              bullets: [
                "Netback at $0.50 — no execution buffer",
                "VLCC rates up 12% over 4 weeks — eating margin",
                "Singapore margin $15 below USGC — weak Asia demand",
                "ME sour supply competing directly for Asian slots",
              ],
              entry: "Not recommended",
              target: "Needs $1.50+ netback",
              stop: "N/A — avoid",
              invalidation: "VLCC freight drops below $5/t or Singapore crack recovers to $40+",
            },
          ].map((idea) => {
            const signalColor = idea.signal === "LONG" ? "#22c55e" : idea.signal === "MONITOR" ? "#3b82f6" : "#ef4444";
            const signalBg    = idea.signal === "LONG" ? "rgba(34,197,94,0.1)" : idea.signal === "MONITOR" ? "rgba(59,130,246,0.1)" : "rgba(239,68,68,0.1)";
            return (
              <div key={idea.id} className="rounded-xl overflow-hidden flex flex-col"
                style={{ background: "var(--card)", border: `1px solid var(--border)` }}>

                {/* Header */}
                <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)", background: idea.convBg }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                        style={{ background: signalBg, border: `1px solid ${signalColor}40` }}>
                        <Target size={12} style={{ color: signalColor }} />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest"
                        style={{ color: signalColor }}>{idea.signal}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded"
                        style={{ color: "#3b82f6", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                        {idea.timeHorizon}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono" style={{ color: "#444" }}>{idea.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{idea.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: "#666" }}>{idea.route}</span>
                    <span className="text-xs font-mono font-bold" style={{ color: idea.netbackColor }}>
                      {idea.netback}
                    </span>
                  </div>
                </div>

                {/* Confidence meter */}
                <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: "#444" }}>
                      Conviction
                    </span>
                    <span className="text-[10px] font-mono font-bold" style={{ color: idea.convColor }}>
                      {idea.conviction} — {idea.convScore}/100
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "#1a1a1a" }}>
                    <div style={{
                      height: 4, borderRadius: 2,
                      width: `${idea.convScore}%`,
                      background: `linear-gradient(90deg, ${idea.convColor}60, ${idea.convColor})`,
                      transition: "width 0.3s",
                    }} />
                  </div>
                </div>

                {/* Supporting factors */}
                <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2.5" style={{ color: "#444" }}>
                    Key Factors
                  </p>
                  <div className="flex flex-col gap-2">
                    {idea.factors.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <div key={f.label} className="flex items-center gap-2.5">
                          <div className="flex items-center justify-center w-5 h-5 rounded shrink-0"
                            style={{ background: `${f.color}12`, border: `1px solid ${f.color}30` }}>
                            <FIcon size={10} style={{ color: f.color }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold" style={{ color: "#888" }}>{f.label}</span>
                          <span className="text-[10px] font-mono ml-auto" style={{ color: f.color }}>{f.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bullet rationale */}
                <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: "#444" }}>
                    Rationale
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {idea.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                          style={{ background: idea.convColor }} />
                        <span className="text-[11px] leading-snug" style={{ color: "#999" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entry / Target / Stop */}
                <div className="grid grid-cols-3 divide-x" style={{ borderBottom: "1px solid var(--border)", borderColor: "var(--border)" }}>
                  {[
                    { label: "Entry",  value: idea.entry,  color: "#888" },
                    { label: "Target", value: idea.target, color: "#22c55e" },
                    { label: "Stop",   value: idea.stop,   color: "#ef4444" },
                  ].map(lv => (
                    <div key={lv.label} className="px-4 py-3">
                      <p className="text-[8px] font-mono uppercase tracking-wider mb-0.5" style={{ color: "#444" }}>{lv.label}</p>
                      <p className="text-[11px] font-mono font-bold leading-snug" style={{ color: lv.color }}>{lv.value}</p>
                    </div>
                  ))}
                </div>

                {/* Invalidation */}
                <div className="px-5 py-3 flex items-start gap-2">
                  <AlertCircle size={11} style={{ color: "#ef4444", marginTop: 1, flexShrink: 0 }} />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: "#ef4444" }}>Invalidated if: </span>
                    <span className="text-[10px] font-mono" style={{ color: "#666" }}>{idea.invalidation}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section F: Insight Feed ────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Insight Feed" sub="Auto-generated market signals based on current data." />

        <div className="grid grid-cols-2 gap-4">
          {/* Signals */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <Lightbulb size={13} style={{ color: "var(--accent)" }} />
              <span className="text-sm font-bold text-white font-mono">Market Signals</span>
            </div>
            <div className="flex flex-col">
              {[
                { headline: "Brent premium stretched vs history", bullets: ["$4.70 — below 3M avg of $5.37", "Recovering from negative Apr 5 swing", "Spread compression not yet complete"], tag: "SPREAD",  tagColor: "#3b82f6", dir: "BEAR" },
                { headline: "Diesel cracks favor Atlantic Basin", bullets: ["USGC diesel $28.50 — $4.20 above Singapore", "European diesel arb window wide open", "Distillate flow from USGC favored"], tag: "CRACKS",  tagColor: "#22c55e", dir: "BULL" },
                { headline: "Freight rise compressing Asia arb", bullets: ["VLCC up 12% over 4 weeks", "USGC→Asia netback at $0.50 — near closure", "Monitor each week for threshold breach"], tag: "FREIGHT", tagColor: "#ef4444", dir: "BEAR" },
                { headline: "Heavy sour discount widening", bullets: ["Mars diff −$3.50 vs WTI (avg −$2.80)", "USGC coker margin capturing widening", "Light sweet oversupply is primary risk"], tag: "GRADES",  tagColor: "#eab308", dir: "BULL" },
                { headline: "Singapore margins lagging", bullets: ["$32.40 vs USGC $47.55 — widest gap 3M", "Asia demand signal structurally weak", "Compresses US light crude bid into Asia"], tag: "MARGINS", tagColor: "#8b5cf6", dir: "BEAR" },
              ].map((item, i, arr) => {
                const dirColor = item.dir === "BULL" ? "#22c55e" : item.dir === "BEAR" ? "#ef4444" : "#eab308";
                return (
                  <div key={item.headline}
                    className="px-5 py-4 hover:bg-white/[0.015] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: dirColor }} />
                      <span className="text-sm font-semibold text-white">{item.headline}</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0"
                        style={{ color: item.tagColor, background: `${item.tagColor}12`, border: `1px solid ${item.tagColor}25` }}>
                        {item.tag}
                      </span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-auto"
                        style={{ color: dirColor, background: `${dirColor}10`, border: `1px solid ${dirColor}25` }}>
                        {item.dir}
                      </span>
                    </div>
                    <div className="pl-4 flex flex-col gap-1">
                      {item.bullets.map((b, bi) => (
                        <div key={bi} className="flex items-start gap-2">
                          <span style={{ color: dirColor, fontSize: 10, flexShrink: 0, marginTop: 2 }}>·</span>
                          <span className="text-[11px] font-mono" style={{ color: "#666" }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Metrics Snapshot */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-bold text-white font-mono">Key Metrics Snapshot</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "Brent–WTI",          value: "$4.70/bbl",      sub: "Below 3M avg $5.37",    color: "#eab308" },
                  { label: "Top Netback",         value: "+$2.40/bbl",     sub: "USGC → Europe",         color: "#22c55e" },
                  { label: "VLCC Freight",        value: "$6.80/t",        sub: "TD3C — rising",         color: "#ef4444" },
                  { label: "Aframax WAF–Eur",     value: "$3.80/t",        sub: "Stable WoW",            color: "#22c55e" },
                  { label: "3-2-1 USGC Crack",   value: "$47.55/bbl",     sub: "WoW +$6.29",            color: "#d4922a" },
                  { label: "Singapore Crack",     value: "$32.40/bbl",     sub: "$15 below USGC",        color: "#8b5cf6" },
                  { label: "Midland API/S",       value: "40.5° / 0.22%", sub: "Light sweet premium",   color: "#22c55e" },
                  { label: "Mars API/S",          value: "27.9° / 1.82%", sub: "Medium sour discount",  color: "#3b82f6" },
                  { label: "Midland Diff",        value: "−$0.20/bbl",     sub: "Near flat to WTI",      color: "#22c55e" },
                  { label: "Mars Diff",           value: "−$3.50/bbl",     sub: "Wide vs 6M avg",        color: "#eab308" },
                  { label: "Opp Score — Midland", value: "88 / 100",       sub: "Best in screener",      color: "#d4922a" },
                  { label: "USGC Margin Lead",    value: "+$9.35/bbl",     sub: "vs Europe",             color: "#22c55e" },
                  { label: "Asia Arb Netback",    value: "+$0.50/bbl",     sub: "Near closure threshold",color: "#ef4444" },
                  { label: "WAF → Europe",        value: "+$1.70/bbl",     sub: "#2 route — open",       color: "#22c55e" },
                ].map(m => (
                  <div key={m.label} className="flex flex-col gap-0.5 pb-3"
                    style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <span className="text-[10px] font-mono" style={{ color: "#555" }}>{m.label}</span>
                    <span className="text-sm font-mono font-bold" style={{ color: m.color }}>{m.value}</span>
                    <span className="text-[9px] font-mono" style={{ color: "#444" }}>{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl p-4"
        style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.12)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "#555" }}>
          <span className="font-mono font-bold" style={{ color: "var(--accent)" }}>NOTE — </span>
          Netback estimates are indicative, derived from observable spread and published freight rate data.
          Actual tradeable netbacks depend on cargo terms, freight negotiation, quality adjustments,
          pipeline nominations, and credit terms. Not a trading recommendation.
        </p>
      </div>

    </div>
  );
}
