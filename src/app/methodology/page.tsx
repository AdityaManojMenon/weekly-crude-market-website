import {
  Database, TrendingUp, BarChart2, Activity, Globe, FileText,
  GitBranch, ExternalLink, ArrowRight, Download, Zap, Layers,
  Target, ClipboardList, AlertTriangle, ShieldAlert, Users, Eye,
} from "lucide-react";

const inputs = [
  {
    icon: Database,
    title: "EIA Weekly Petroleum Status Report",
    body: "Crude, gasoline, distillates, Cushing inventories, and refinery utilization — processed within minutes of the Wednesday 10:30 AM ET release for same-day analysis.",
  },
  {
    icon: TrendingUp,
    title: "Term Structure — CL1–CL2 Spread",
    body: "Front-to-second-month futures spread as a real-time proxy for prompt tightness. Backwardation depth and trend direction are the single most reliable indicator of physical scarcity or surplus.",
  },
  {
    icon: BarChart2,
    title: "Refining Economics — 3-2-1 Crack Spread",
    body: "Downstream demand indicator. Sustained elevation confirms end-product pull through to crude; compression signals softening demand before it appears in crude inventory data.",
  },
  {
    icon: Activity,
    title: "OVX / Volatility Layer",
    body: "CBOE Oil VIX (OVX), 20-day realized vol, and the Vol Risk Premium (VRP = OVX − RV) measure market fear, tail-risk pricing, and whether options are rich or cheap relative to actual moves.",
  },
  {
    icon: Users,
    title: "CFTC COT — Managed Money Positioning",
    body: "Weekly CFTC Commitment of Traders report tracks managed money net length, WoW change, and 1-year percentile rank. Crowded longs compress upside; washed-out positioning improves risk/reward.",
  },
  {
    icon: Eye,
    title: "Brent–WTI Spread",
    body: "Tracks Brent premium over WTI as a proxy for Cushing delivery-point dynamics, transatlantic supply differentials, and crude-specific geopolitical risk premiums embedded in either leg.",
  },
  {
    icon: Globe,
    title: "Macro & Geopolitical Overlay",
    body: "OPEC+ policy, Middle East supply risk, USD strength (DXY), equity conditions, and macro growth signals are incorporated as scenario stress-tests and conviction modifiers. Event overrides can dominate all quantitative inputs.",
  },
];

const signalWeights = [
  { factor: "Curve Structure (CL1–CL2)",  base: "30%", note: "Elevated in Tightening / Crisis regimes" },
  { factor: "Inventory Surprise",          base: "20%", note: "Elevated in Normal / Seasonal regimes" },
  { factor: "Crack Spread",               base: "20%", note: "Elevated when product demand diverges from crude" },
  { factor: "Product Draws",              base: "15%", note: "High weighting when gasoline/distillates diverge" },
  { factor: "COT Positioning",            base: "10%", note: "Elevated in positioning-driven trend regimes" },
  { factor: "Macro / DXY / OVX",         base: "5%",  note: "Elevated during Event Override regimes" },
];

const predictiveRelationships = [
  {
    cause: "Spread compression (CL1–CL2 ↓)",
    arrow: "→",
    effect: "Weaker near-term prompt premium",
    color: "#ef4444",
    note: "Risk premium exiting the front month. Watch for contango threshold as structural signal.",
  },
  {
    cause: "Large gasoline / distillate draws",
    arrow: "→",
    effect: "Stronger product-driven demand pull",
    color: "#22c55e",
    note: "End-product draws lead crude inventory draws by 1–2 weeks. Bullish lead indicator.",
  },
  {
    cause: "OVX rising + WTI falling",
    arrow: "→",
    effect: "Fear-driven selloff (not fundamental)",
    color: "#f59e0b",
    note: "Macro or geopolitical shock driving price. Physical data likely contradicts the move.",
  },
  {
    cause: "COT long liquidation",
    arrow: "→",
    effect: "Technical selling pressure on prompt",
    color: "#f97316",
    note: "Spec longs exiting compresses price without fundamental change. Improves entry for bulls.",
  },
  {
    cause: "Negative VRP (RV > OVX)",
    arrow: "→",
    effect: "Options cheap; market underpricing realized risk",
    color: "#3b82f6",
    note: "Unusual post-shock condition. Historically precedes vol compression trade as fear fades.",
  },
  {
    cause: "Brent–WTI spread narrowing",
    arrow: "→",
    effect: "Cushing normalization / WTI-specific bid fading",
    color: "#8b5cf6",
    note: "Narrowing below 3M average signals Cushing delivery-point premium evaporating.",
  },
  {
    cause: "Crack spread surge + crude draw miss",
    arrow: "→",
    effect: "Divergence regime — price signal unreliable",
    color: "#d4922a",
    note: "Products bullish, crude bearish. Usually resolved within 1–2 weeks toward product direction.",
  },
];

const failureModes = [
  {
    icon: AlertTriangle,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    title: "Sudden Geopolitical Shocks",
    desc: "A Hormuz closure, OPEC emergency cut, or conflict escalation can invalidate all quantitative signals within hours. The model has no forward-looking geopolitical input — it reacts, not predicts.",
  },
  {
    icon: AlertTriangle,
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    title: "Macro Recession Repricing",
    desc: "During demand-destruction cycles, crude decouples from physical fundamentals and trades on macro sentiment. Inventory signals become lagging indicators; spread and crack data lose predictive power.",
  },
  {
    icon: AlertTriangle,
    color: "#eab308",
    bg: "rgba(234,179,8,0.08)",
    border: "rgba(234,179,8,0.2)",
    title: "OPEC+ Surprise Decisions",
    desc: "Unscheduled production cuts or quota changes override all fundamental signals. The framework assigns no probability weight to OPEC policy surprise — this is a known structural gap.",
  },
  {
    icon: AlertTriangle,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    title: "EIA Data Revisions",
    desc: "Initial EIA WPSR releases are frequently revised in subsequent weeks. Signals generated from first-release data may be invalidated by revisions, especially for gasoline and distillate categories.",
  },
  {
    icon: AlertTriangle,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    title: "Liquidity Gaps & Thin Markets",
    desc: "Holiday-shortened weeks, expiry periods, or low-liquidity environments produce misleading spread and vol signals. CL1–CL2 spread can gap sharply on roll dynamics unrelated to physical conditions.",
  },
  {
    icon: AlertTriangle,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
    title: "Refinery Outages & Weather Events",
    desc: "Unplanned refinery shutdowns or hurricane-season disruptions create temporary product supply shocks outside the model's normal parametric range. Crack spreads and utilization signals become distorted.",
  },
];

const outputs = [
  "Directional bias with regime context",
  "Key metrics — inventory, curve structure, cracks, production",
  "COT positioning panel with 12M net length trend",
  "Brent–WTI spread + relative value signal",
  "OVX / Volatility Monitor with 3-chart panel",
  "Trade ideas with entry, target, and stop levels",
  "Scenario analysis — Bullish, Bearish, and Base Case",
  "Upcoming catalyst watchlist",
];

const pipelineSteps = [
  { file: "eia_ingestion.py",           desc: "Pulls EIA WPSR series via API, normalizes, caches locally" },
  { file: "inventory_surprise_model.py", desc: "Calculates surprise delta vs consensus and 5-yr seasonal norms" },
  { file: "curve_analytics.py",          desc: "Classifies CL1–CL2 spread, backwardation/contango regime, z-score" },
  { file: "crack_spreads.py",            desc: "Computes 3-2-1 crack spread from RBOB and heating oil futures" },
  { file: "cot_analytics.py",            desc: "Parses CFTC COT report — managed money net length, WoW, 1Y percentile" },
  { file: "ovx_volatility.py",           desc: "Computes OVX trend, 20D realized vol, and Vol Risk Premium (VRP)" },
  { file: "brent_wti_spread.py",         desc: "Tracks Brent–WTI spread, 3M average, regime classification" },
  { file: "signal_framework.py",         desc: "Integrates all signals, detects divergence regime, scores conviction" },
  { file: "generate_brief.py",           desc: "Assembles structured brief from all pipeline outputs" },
];

const dataSources = [
  {
    category: "Fundamental Data",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
    source: "EIA Open Data API",
    items: ["Crude stocks (PET.WCRSTUS1.W)", "Cushing inventories (PET.WCUOK_3.W)", "Gasoline & distillates", "Refinery utilization (PET.WPULEUS2.W)", "Production & imports/exports"],
  },
  {
    category: "Market Data",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
    source: "NYMEX / Yahoo Finance",
    items: ["WTI & Brent front-month settlements", "CL1–CL2 prompt spread", "RBOB & heating oil futures", "OVX (CBOE Oil VIX)", "Historical curve structure"],
  },
  {
    category: "Positioning Data",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    source: "CFTC / Reuters",
    items: ["Managed money net length (COT)", "Gross longs & shorts", "WoW positioning change", "1-year percentile rank", "Consensus inventory survey estimates"],
  },
  {
    category: "Research Infrastructure",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
    border: "rgba(22,163,74,0.2)",
    source: "Python · GitHub",
    items: ["Pandas, NumPy, Plotly, Jinja / Markdown", "Local eia_cache/ for reproducibility", "GitHub Actions automated execution", "Version-controlled call tracker (CSV)"],
  },
];

const flowSteps = [
  { label: "Raw Data",       icon: Download,     color: "#d97706" },
  { label: "Signal Engine",  icon: Zap,          color: "#3b82f6" },
  { label: "Regime Overlay", icon: Layers,       color: "#8b5cf6" },
  { label: "Risk Controls",  icon: ShieldAlert,  color: "#ef4444" },
  { label: "Trade Output",   icon: Target,       color: "#16a34a" },
  { label: "Call Tracking",  icon: ClipboardList, color: "#d4922a" },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          Macro & Flow
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Methodology</h1>
        <div className="h-px w-12 mb-5" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#9a9a9a" }}>
          Macro & Flow combines market data, supply-demand indicators, volatility, positioning,
          and systematic signal frameworks to assess weekly crude market direction — identifying when
          physical conditions confirm or contradict headline narratives. Every output is reproducible
          from structured data workflows, not manual interpretation.
        </p>
      </div>

      {/* Analytical Flow */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          How the Model Works
        </p>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: `${step.color}18`, border: `1.5px solid ${step.color}50`, boxShadow: `0 0 12px ${step.color}20` }}>
                      <Icon size={16} style={{ color: step.color }} />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-wide whitespace-nowrap"
                      style={{ color: step.color }}>
                      {step.label.toUpperCase()}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight size={16} className="mx-2 shrink-0" style={{ color: "#333" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Flow step descriptions */}
          <div className="grid grid-cols-3 divide-x" style={{ borderTop: "1px solid var(--border)", borderColor: "var(--border)" }}>
            {[
              { label: "Inputs", color: "#d97706", desc: "EIA inventory, curve, cracks, COT positioning, OVX/vol, Brent–WTI spread, and macro/geopolitical overlays ingested and normalized." },
              { label: "Signal Engine", color: "#3b82f6", desc: "Weighted composite score across six input factors. Divergence between signals triggers elevated analytical priority and flags regime uncertainty." },
              { label: "Regime Overlay", color: "#8b5cf6", desc: "Active regime classified: Normal Tight, Transitional, Divergent, or Event Override. Regime context dynamically re-weights the composite signal." },
            ].map(s => (
              <div key={s.label} className="p-4">
                <p className="text-[9px] font-mono font-bold mb-1" style={{ color: s.color }}>{s.label.toUpperCase()}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 divide-x" style={{ borderTop: "1px solid var(--border)", borderColor: "var(--border)" }}>
            {[
              { label: "Risk Controls", color: "#ef4444", desc: "Conviction is downgraded to Low when signals conflict. Event override flags (geopolitical, OPEC) suppress quantitative outputs and force qualitative framing." },
              { label: "Trade Output", color: "#16a34a", desc: "Directional bias, trade ideas with entry/target/stop, scenario probabilities, and catalyst watchlist generated from signal outputs and regime context." },
              { label: "Call Tracking", color: "#d4922a", desc: "Every directional call is logged to call_tracker.csv with outcome, WTI price at publish, and 1-week return. Win rate by regime tracked continuously." },
            ].map(s => (
              <div key={s.label} className="p-4">
                <p className="text-[9px] font-mono font-bold mb-1" style={{ color: s.color }}>{s.label.toUpperCase()}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signal Weighting Table */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Signal Weighting
        </p>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>
              Base weights reflect each factor&apos;s contribution to the composite directional score under a normal market regime.
              Weights are dynamic — regime overlays re-allocate conviction toward whichever inputs carry the highest
              signal-to-noise ratio in the active environment.
            </p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["FACTOR", "BASE WEIGHT", "REGIME SENSITIVITY"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-mono tracking-wider"
                    style={{ color: "var(--muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {signalWeights.map((row, i) => (
                <tr key={row.factor}
                  style={{ borderBottom: i < signalWeights.length - 1 ? "1px solid var(--border)" : "none" }}
                  className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-xs font-semibold text-white">{row.factor}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 rounded-full" style={{
                        width: `${parseInt(row.base) * 2.2}px`,
                        background: `var(--accent)`,
                        opacity: 0.7,
                      }} />
                      <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>{row.base}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: "var(--muted)" }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Relationships */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          What Predicts What
        </p>
        <div className="space-y-2">
          {predictiveRelationships.map(rel => (
            <div key={rel.cause} className="rounded-xl p-4 flex gap-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-semibold shrink-0 whitespace-nowrap"
                  style={{ color: rel.color }}>{rel.cause}</span>
                <span className="text-base font-mono shrink-0" style={{ color: "#333" }}>{rel.arrow}</span>
                <span className="text-xs font-semibold shrink-0 text-white whitespace-nowrap">{rel.effect}</span>
              </div>
              <p className="text-[11px] leading-relaxed shrink-0 text-right max-w-xs hidden lg:block"
                style={{ color: "var(--muted)" }}>{rel.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Inputs */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Core Signal Inputs
        </p>
        <div className="space-y-3">
          {inputs.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl p-5 flex gap-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
                <Icon size={14} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white mb-1">{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Outputs */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Weekly Report Outputs
        </p>
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex gap-3 mb-4">
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
              <FileText size={14} style={{ color: "var(--accent)" }} />
            </div>
            <p className="text-sm leading-relaxed self-center" style={{ color: "#9a9a9a" }}>
              Each brief moves from raw data to actionable intelligence across structured analytical sections:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {outputs.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                <span className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Failure Modes */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-2"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Failure Modes
        </p>
        <p className="text-xs leading-relaxed mb-5" style={{ color: "#555" }}>
          Known conditions under which the framework underperforms or produces unreliable signals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {failureModes.map(({ icon: Icon, color, bg, border, title, desc }) => (
            <div key={title} className="rounded-xl p-4 flex gap-3"
              style={{ background: bg, border: `1px solid ${border}` }}>
              <div className="shrink-0 mt-0.5 flex items-center justify-center w-7 h-7 rounded-lg"
                style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                <Icon size={12} style={{ color }} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white mb-1">{title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline + Data Sources */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Research Pipeline
        </p>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="p-5 flex gap-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
              <GitBranch size={14} style={{ color: "var(--accent)" }} />
            </div>
            <p className="text-xs leading-relaxed self-center" style={{ color: "#9a9a9a" }}>
              The data ingestion, signal generation, chart production, and brief drafting process is powered
              by a modular Python research pipeline built for repeatable energy market analysis. Each
              publication is generated from structured data workflows — not manual headline interpretation.
              Executed weekly following the EIA WPSR release at 10:30 AM ET.
            </p>
          </div>

          <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
              Execution Sequence
            </p>
            <div className="space-y-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.file} className="flex items-start gap-3">
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono w-4 text-right" style={{ color: "var(--muted)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--border)" }}>│</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                    <span className="text-xs font-mono font-semibold shrink-0" style={{ color: "var(--accent)" }}>
                      {step.file}
                    </span>
                    <span className="hidden sm:block text-[10px]" style={{ color: "var(--border)" }}>—</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
              Primary Data Sources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataSources.map(({ category, color, bg, border, source, items }) => (
                <div key={category} className="rounded-lg p-4" style={{ background: bg, border: `1px solid ${border}` }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5"
                    style={{ color, letterSpacing: "0.1em" }}>{category}</p>
                  <p className="text-xs font-semibold text-white mb-2">{source}</p>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <a href="https://github.com/AdityaManojMenon/weekly-crude-market-brief"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between p-5 transition-opacity hover:opacity-75 group">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                style={{ background: "rgba(226,232,240,0.06)", border: "1px solid rgba(226,232,240,0.12)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#e2e8f0" }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-white">
                  AdityaManojMenon / weekly-crude-market-brief
                </p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Pipeline source · EIA ingestion · Signal models · COT + Vol layers · Call tracker · Initiated March 2026
                </p>
              </div>
            </div>
            <ExternalLink size={13} className="shrink-0" style={{ color: "var(--muted)" }} />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl p-5"
        style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.15)" }}>
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-2"
          style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>
          Important Note
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>
          This research is informational only and does not constitute investment advice. All analysis
          reflects the author&apos;s independent views based on publicly available data. Past signal
          accuracy is not indicative of future results. Known failure modes are documented above — readers
          should apply independent judgment and risk management.
        </p>
      </div>

    </div>
  );
}
