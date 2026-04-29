import { Activity, BarChart2, TrendingDown, Layers, Clock, Lightbulb } from "lucide-react";
import ForecastChartsWrapper from "@/components/ForecastChartsWrapper";
import ForecastSupplyDemandWrapper from "@/components/ForecastSupplyDemandWrapper";
import ForecastStorageWrapper from "@/components/ForecastStorageWrapper";
import ForecastMarketOverlayWrapper from "@/components/ForecastMarketOverlayWrapper";

// ─── Style helpers ────────────────────────────────────────────────────────────

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

// ─── Regime config ────────────────────────────────────────────────────────────

const REGIMES: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  TIGHTENING:    { color: "#22c55e", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.25)",   desc: "Consecutive draws — supply deficit widening" },
  OVERSUPPLY:    { color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)",   desc: "Builds dominating — demand or supply glut" },
  TRANSITIONAL:  { color: "#eab308", bg: "rgba(234,179,8,0.08)",   border: "rgba(234,179,8,0.25)",   desc: "Mixed signals — regime unclear, volatility elevated" },
  "MACRO-LED":   { color: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)",  desc: "Fundamentals overwhelmed by macro / risk factors" },
  "RISK PREMIUM":{ color: "#8b5cf6", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)", desc: "Geopolitical premium dominating price action" },
};

// ─── Current state ────────────────────────────────────────────────────────────

const CURRENT_REGIME = "TRANSITIONAL";
const BALANCE_SCORE   = 61;
const NEXT_FORECAST   = -1.01;
const CONF_LOW        = -2.10;
const CONF_HIGH       = 0.08;
const LAST_ACTUAL     = -0.913;
const LAST_WEEK       = "Apr 12, 2026";
const NEXT_EIA_DATE   = "Apr 23, 2026";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ForecastPage() {
  const regime = REGIMES[CURRENT_REGIME];
  const isBull = NEXT_FORECAST < 0;
  const scoreColor = BALANCE_SCORE >= 65 ? "#22c55e" : BALANCE_SCORE >= 45 ? "#eab308" : "#ef4444";
  const scoreLabel = BALANCE_SCORE >= 65 ? "TIGHT" : BALANCE_SCORE >= 45 ? "BALANCED" : "LOOSE";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <Activity size={15} style={{ color: "var(--accent)" }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            CrudeQ
          </p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">EIA Inventory Forecast</h1>
        <div className="h-px w-12 mb-3" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#777" }}>
          What is the next EIA inventory move, what drives it, and how tight or loose is WTI right now?
          Weekly forecast with confidence intervals, probability distribution, and driver attribution.
        </p>
      </div>

      {/* Sticky summary bar */}
      <div style={{
        position: "sticky", top: 56, zIndex: 40,
        background: "rgba(8,8,8,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)",
        marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24,
        marginBottom: 28,
      }}>
        <div className="flex items-center max-w-7xl mx-auto overflow-x-auto">
          {[
            { label: "NEXT FORECAST",  value: `${NEXT_FORECAST.toFixed(2)} MMbbl`, metric: isBull ? "DRAW — Bullish" : "BUILD — Bearish", color: isBull ? "#22c55e" : "#ef4444" },
            { label: "BALANCE SCORE",  value: `${BALANCE_SCORE} / 100`, metric: scoreLabel,  color: scoreColor },
            { label: "REGIME",         value: CURRENT_REGIME, metric: "Current market state", color: regime.color },
            { label: "LAST ACTUAL",    value: `${LAST_ACTUAL.toFixed(2)} MMbbl`, metric: LAST_WEEK, color: LAST_ACTUAL < 0 ? "#22c55e" : "#ef4444" },
            { label: "NEXT EIA",       value: NEXT_EIA_DATE, metric: "10:30 AM ET release", color: "#555" },
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

        {/* 1. Next EIA Forecast */}
        <div className="rounded-xl p-5" style={{
          background: isBull ? "rgba(34,197,94,0.07)" : "rgba(239,68,68,0.07)",
          border: `1px solid ${isBull ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
        }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: isBull ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", border: `1px solid ${isBull ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}` }}>
              <TrendingDown size={15} style={{ color: isBull ? "#22c55e" : "#ef4444" }} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: "#666" }}>
              Next EIA Forecast
            </span>
          </div>
          <div className="text-3xl font-mono font-bold text-white mb-1">
            {NEXT_FORECAST > 0 ? "+" : ""}{NEXT_FORECAST.toFixed(2)}
          </div>
          <div className="text-xs font-mono mb-1" style={{ color: "#555" }}>MMbbl</div>
          <div className="text-sm font-mono font-bold mb-2" style={{ color: isBull ? "#22c55e" : "#ef4444" }}>
            {isBull ? "DRAW — Bullish" : "BUILD — Bearish"}
          </div>
          <div className="text-[10px] font-mono" style={{ color: "#555" }}>
            90% CI: [{CONF_LOW.toFixed(2)}, {CONF_HIGH >= 0 ? "+" : ""}{CONF_HIGH.toFixed(2)}]
          </div>
        </div>

        {/* 2. Balance Score */}
        <div className="rounded-xl p-5" style={{
          background: `${scoreColor}0d`,
          border: `1px solid ${scoreColor}40`,
        }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: `${scoreColor}18`, border: `1px solid ${scoreColor}50` }}>
              <BarChart2 size={15} style={{ color: scoreColor }} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: "#666" }}>
              Balance Score
            </span>
          </div>
          <div className="text-3xl font-mono font-bold mb-1" style={{ color: scoreColor }}>
            {BALANCE_SCORE}
          </div>
          <div className="text-xs font-mono mb-3" style={{ color: "#555" }}>out of 100</div>
          {/* Score bar */}
          <div style={{ height: 4, borderRadius: 2, background: "#1a1a1a", marginBottom: 6 }}>
            <div style={{ height: 4, borderRadius: 2, width: `${BALANCE_SCORE}%`, background: `linear-gradient(90deg, ${scoreColor}60, ${scoreColor})` }} />
          </div>
          <div className="text-sm font-mono font-bold" style={{ color: scoreColor }}>
            {scoreLabel}
          </div>
          <div className="text-[10px] font-mono mt-1" style={{ color: "#555" }}>
            {BALANCE_SCORE >= 65 ? "Supply deficit — modestly supportive" : BALANCE_SCORE >= 45 ? "Near equilibrium" : "Oversupply pressure"}
          </div>
        </div>

        {/* 3. Regime */}
        <div className="rounded-xl p-5" style={{ background: regime.bg, border: `1px solid ${regime.border}` }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: `${regime.color}18`, border: `1px solid ${regime.color}50` }}>
              <Layers size={15} style={{ color: regime.color }} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: "#666" }}>
              Regime
            </span>
          </div>
          <div className="text-2xl font-mono font-bold mb-2" style={{ color: regime.color }}>
            {CURRENT_REGIME}
          </div>
          <div className="text-[11px] font-mono leading-snug" style={{ color: "#666" }}>
            {regime.desc}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {Object.keys(REGIMES).map(r => (
              <span key={r} className="text-[8px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  color: r === CURRENT_REGIME ? REGIMES[r].color : "#333",
                  background: r === CURRENT_REGIME ? `${REGIMES[r].color}18` : "transparent",
                  border: `1px solid ${r === CURRENT_REGIME ? REGIMES[r].border : "#222"}`,
                }}>
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Last Print */}
        <div className="rounded-xl p-5" style={CARD}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "rgba(212,146,42,0.12)", border: "1px solid rgba(212,146,42,0.35)" }}>
              <Clock size={15} style={{ color: "var(--accent)" }} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: "#666" }}>
              Last EIA Print
            </span>
          </div>
          <div className="text-3xl font-mono font-bold text-white mb-1">
            {LAST_ACTUAL > 0 ? "+" : ""}{LAST_ACTUAL.toFixed(2)}
          </div>
          <div className="text-xs font-mono mb-2" style={{ color: "#555" }}>MMbbl — {LAST_WEEK}</div>
          <div className="text-sm font-mono font-bold mb-3" style={{ color: LAST_ACTUAL < 0 ? "#22c55e" : "#ef4444" }}>
            {LAST_ACTUAL < 0 ? "DRAW — Bullish" : "BUILD — Bearish"}
          </div>
          <div className="text-[10px] font-mono" style={{ color: "#555" }}>
            Forecast was −0.60 · Error: +0.31 (beat draw)
          </div>
          <div className="mt-3 pt-3 text-[10px] font-mono" style={{ borderTop: "1px solid var(--border)", color: "#444" }}>
            Next release: <span style={{ color: "var(--accent)", fontWeight: 700 }}>{NEXT_EIA_DATE}</span>
          </div>
        </div>

      </div>

      {/* ── Section A: Forecast Engine ─────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead
          label="Forecast Engine"
          sub="Inventory forecast model with confidence intervals, outcome distribution, and supply-demand driver breakdown."
        />
        <ForecastChartsWrapper />
      </div>

      {/* ── Section B + C: Supply & Demand ────────────────────────────────── */}
      <div className="mb-10">
        <ForecastSupplyDemandWrapper />
      </div>

      {/* ── Section D: Storage ─────────────────────────────────────────────── */}
      <div className="mb-10">
        <ForecastStorageWrapper />
      </div>

      {/* ── Balance Metrics Grid ───────────────────────────────────────────── */}
      <div className="mb-10">
        <SectionHead label="Supply / Demand Balance" sub="Current week fundamentals driving the forecast." />

        <div className="grid grid-cols-3 gap-4">
          {/* Supply side */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-bold text-white font-mono">Supply Side</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {[
                { label: "US Production",   value: "13.6 MMbbl/d", wow: "Flat WoW",       color: "#eab308", bear: false },
                { label: "Imports",         value: "6.8 MMbbl/d",  wow: "+0.3 WoW",       color: "#ef4444", bear: true },
                { label: "SPR Release",     value: "None",         wow: "No additions",   color: "#555",    bear: false },
                { label: "OPEC Compliance", value: "97%",          wow: "+2% WoW",        color: "#22c55e", bear: false },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono" style={{ color: "#555" }}>{m.label}</div>
                    <div className="text-sm font-mono font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ color: m.color, background: `${m.color}12`, border: `1px solid ${m.color}25` }}>
                    {m.wow}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Demand side */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-bold text-white font-mono">Demand Side</span>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {[
                { label: "Refinery Utilization", value: "89.6%",        wow: "+2.4% WoW",  color: "#22c55e" },
                { label: "Refinery Crude Input",  value: "16.1 MMbbl/d", wow: "+0.4 WoW",  color: "#22c55e" },
                { label: "Exports",               value: "4.2 MMbbl/d",  wow: "+0.8 WoW",  color: "#22c55e" },
                { label: "Product Demand",        value: "20.2 MMbbl/d", wow: "+0.3 WoW",  color: "#22c55e" },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono" style={{ color: "#555" }}>{m.label}</div>
                    <div className="text-sm font-mono font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ color: m.color, background: `${m.color}12`, border: `1px solid ${m.color}25` }}>
                    {m.wow}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Signal summary */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-bold text-white font-mono">Signal Summary</span>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {[
                { label: "Curve Structure",    signal: "BACKWARDATION", color: "#22c55e", note: "CL1–CL2 $4.19" },
                { label: "Crack Spread",       signal: "ELEVATED",      color: "#22c55e", note: "$47.55 3-2-1" },
                { label: "COT Positioning",    signal: "ADDING LONGS",  color: "#22c55e", note: "+98k net long" },
                { label: "OVX Volatility",     signal: "ELEVATED",      color: "#eab308", note: "73.0 vs 52 avg" },
                { label: "Inventory Level",    signal: "BELOW AVG",     color: "#22c55e", note: "463.8 MMbbl" },
                { label: "Seasonal Trend",     signal: "DRAW SEASON",   color: "#22c55e", note: "Apr–Jun typical draw" },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-[10px] font-mono" style={{ color: "#666" }}>{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
                      style={{ color: m.color, background: `${m.color}10`, border: `1px solid ${m.color}25` }}>
                      {m.signal}
                    </span>
                    <span className="text-[9px] font-mono" style={{ color: "#444" }}>{m.note}</span>
                  </div>
                </div>
              ))}

              <div className="mt-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: "#444" }}>
                  Composite Read
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#22c55e" }} />
                  <span className="text-[11px] font-mono leading-snug" style={{ color: "#777" }}>
                    Refinery recovery + export surge dominating. Mild draw most likely outcome.
                    Volatility elevated — execution risk present.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section E: Market Overlay ──────────────────────────────────────── */}
      <div className="mb-10">
        <ForecastMarketOverlayWrapper />
      </div>

      {/* ── Section F: Insight Feed ────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-0.5 h-6 rounded-full" style={{ background: "var(--accent)" }} />
          <h2 className="text-sm font-bold text-white font-mono tracking-widest uppercase">Insight Feed</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {/* Auto bullets */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <Lightbulb size={13} style={{ color: "var(--accent)" }} />
              <span className="text-sm font-bold text-white font-mono">Automated Signals</span>
              <span className="ml-auto text-[9px] font-mono" style={{ color: "#444" }}>Apr 19, 2026</span>
            </div>
            <div className="flex flex-col">
              {[
                {
                  headline: "Runs above seasonal — bullish crude draws",
                  bullets: ["Utilization 89.6% vs 89.6% seasonal — slight beat", "Runs at 16.1 MMbbl/d — each +0.1 removes ~0.7 MMbbl/week", "Seasonal ramp into summer driving demand supportive"],
                  dir: "BULL", dirColor: "#22c55e", tag: "RUNS",
                },
                {
                  headline: "Imports partially offsetting tightening",
                  bullets: ["Imports at 6.8 MMbbl/d — flat WoW, above Jan lows", "Gulf Coast WAF arrivals rising — limit near-term draw pace", "Net imports 2.6 MMbbl/d — still below 3.5 historical avg"],
                  dir: "NEUTRAL", dirColor: "#eab308", tag: "IMPORTS",
                },
                {
                  headline: "Cushing draws support prompt WTI strength",
                  bullets: ["Cushing at 23.8 MMbbl — Z-score −1.4 (below 1σ)", "Tight delivery point = backwardation amplifier", "Each −0.5 MMbbl Cushing draw compresses CL1-CL2 0.3–0.5"],
                  dir: "BULL", dirColor: "#22c55e", tag: "CUSHING",
                },
                {
                  headline: "Backwardation easing from March peak",
                  bullets: ["CL1–CL2 from $7.94 peak → $4.19 today (−$3.75)", "Compression reflects geopolitical risk unwind", "Still in healthy backwardation — not yet signaling loosening"],
                  dir: "NEUTRAL", dirColor: "#eab308", tag: "CURVE",
                },
                {
                  headline: "Export surge absorbing domestic oversupply",
                  bullets: ["Exports at 4.2 MMbbl/d — highest since Feb", "USGC→Europe arb open at +$2.40/bbl — incentive intact", "Export-driven draws likely to continue for 2–3 weeks"],
                  dir: "BULL", dirColor: "#22c55e", tag: "EXPORTS",
                },
                {
                  headline: "SPR drawdown adds latent supply risk",
                  bullets: ["SPR declining steadily at −0.4 MMbbl/week", "No emergency release — but not being refilled either", "Long-term supply buffer thinner than prior cycles"],
                  dir: "BEAR", dirColor: "#ef4444", tag: "SPR",
                },
              ].map((item, i, arr) => (
                <div key={item.headline}
                  className="px-5 py-4 hover:bg-white/[0.015] transition-colors"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.dirColor }} />
                    <span className="text-sm font-semibold text-white">{item.headline}</span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0"
                      style={{ color: "#d4922a", background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
                      {item.tag}
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded shrink-0 ml-auto"
                      style={{ color: item.dirColor, background: `${item.dirColor}10`, border: `1px solid ${item.dirColor}25` }}>
                      {item.dir}
                    </span>
                  </div>
                  <div className="pl-4 flex flex-col gap-1">
                    {item.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-2">
                        <span style={{ color: item.dirColor, fontSize: 10, flexShrink: 0, marginTop: 2 }}>·</span>
                        <span className="text-[11px] font-mono" style={{ color: "#666" }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics Snapshot */}
          <div className="rounded-xl overflow-hidden" style={CARD}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-sm font-bold text-white font-mono">Balance Key Metrics</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "Forecast MMbbl",     value: "−1.01",        sub: "Draw — bullish",           color: "#22c55e" },
                  { label: "Conf. Band",          value: "−2.10 / +0.08", sub: "90% interval",            color: "#d4922a" },
                  { label: "Model Hit Rate",      value: "69%",          sub: "13-week trailing",         color: "#22c55e" },
                  { label: "MAE",                 value: "0.71 MMbbl",   sub: "Mean absolute error",      color: "#eab308" },
                  { label: "US Production",       value: "13.6 MMbbl/d", sub: "Flat WoW — near record",  color: "#eab308" },
                  { label: "Imports",             value: "6.8 MMbbl/d",  sub: "Stable — slight pressure", color: "#ef4444" },
                  { label: "Exports",             value: "4.2 MMbbl/d",  sub: "Rising — arb open",        color: "#22c55e" },
                  { label: "Refinery Runs",       value: "16.1 MMbbl/d", sub: "Strong crude demand",      color: "#22c55e" },
                  { label: "Utilization",         value: "89.6%",        sub: "At seasonal avg",          color: "#22c55e" },
                  { label: "Cushing Stocks",      value: "23.8 MMbbl",   sub: "Z-score −1.4 (tight)",     color: "#22c55e" },
                  { label: "5Y Deviation",        value: "+34.4 MMbbl",  sub: "Above avg — bearish bias", color: "#ef4444" },
                  { label: "CL1–CL2 Spread",      value: "$4.19/bbl",    sub: "Healthy backwardation",    color: "#d4922a" },
                  { label: "Brent–WTI Spread",    value: "$4.70/bbl",    sub: "Below $5.37 avg",          color: "#3b82f6" },
                  { label: "Regime Score",        value: "61 / 100",     sub: "BALANCED — transitional",  color: "#eab308" },
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
          Forecasts are generated from a weighted composite of curve structure, EIA historical seasonality,
          refinery utilization trends, export data, and CFTC positioning signals. They are not investment advice.
          Model error (MAE 0.71 MMbbl) means significant surprise risk remains — particularly during
          geopolitical shocks or OPEC policy changes.
        </p>
      </div>

    </div>
  );
}
