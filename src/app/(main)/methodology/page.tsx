import {
  Database, TrendingUp, BarChart2, Activity, Globe, FileText,
  GitBranch, ExternalLink, ArrowRight,
  Target, AlertTriangle, ShieldAlert, Users, Eye,
  Archive, LineChart, BarChart, FlaskConical,
} from "lucide-react";

const platformModules = [
  {
    title: "Weekly Brief",
    status: "LIVE" as const,
    href: "/",
    icon: FileText,
    desc: "Primary flagship report using fresh weekly EIA data, futures, and systematic signal scoring.",
  },
  {
    title: "Performance",
    status: "LIVE" as const,
    href: "/performance",
    icon: LineChart,
    desc: "Forward-tracked model portfolio with risk-managed trade evaluation and R-based metrics.",
  },
  {
    title: "Forecast",
    status: "BETA" as const,
    href: "/forecast",
    icon: FlaskConical,
    desc: "Experimental inventory forecasting engine using historical seasonal patterns and signal inputs.",
  },
  {
    title: "Arb",
    status: "BETA" as const,
    href: "/arb",
    icon: BarChart,
    desc: "Experimental physical arbitrage and route economics dashboard for spread and basis tracking.",
  },
  {
    title: "Archive",
    status: "ARCHIVE" as const,
    href: "/archive",
    icon: Archive,
    desc: "Historical weekly reports and prior market views — full record from inception.",
  },
];

const briefSteps = [
  {
    num: "01",
    title: "Data Inputs",
    color: "#d97706",
    items: [
      "EIA WPSR (crude, Cushing, gasoline, distillates, refinery utilization)",
      "WTI / Brent front-month futures",
      "CL1–CL2 term structure (prompt spread)",
      "RBOB / HO / 3-2-1 crack spreads",
      "OVX & 20-day realized volatility",
      "CFTC COT managed money positioning",
      "DXY and macro inputs",
      "Geopolitical developments",
    ],
  },
  {
    num: "02",
    title: "Signal Engine",
    color: "#3b82f6",
    items: [
      "Weighted framework scores directional pressure across:",
      "→ Inventories",
      "→ Curve structure",
      "→ Product demand",
      "→ Positioning",
      "→ Volatility",
      "→ Relative value",
      "→ Macro context",
      "Signals can confirm or contradict one another.",
    ],
  },
  {
    num: "03",
    title: "Regime Classification",
    color: "#8b5cf6",
    items: [
      "Market classified into one of:",
      "→ Tightening",
      "→ Transitional",
      "→ Divergence",
      "→ Event Override",
      "→ Risk-Off Macro",
      "Regime determines which signals carry the most weight.",
    ],
  },
  {
    num: "04",
    title: "Risk Controls",
    color: "#ef4444",
    items: [
      "Conviction is reduced when:",
      "→ Signals conflict",
      "→ Volatility is extreme",
      "→ Geopolitical uncertainty dominates",
      "→ Data quality is weak",
    ],
  },
  {
    num: "05",
    title: "Output Generation",
    color: "#22c55e",
    items: [
      "Directional bias",
      "Key metrics dashboard",
      "Scenario analysis",
      "Trade frameworks",
      "Catalysts",
      "Geopolitical context",
      "Risk dashboard",
    ],
  },
];

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


export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          CrudeQ
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Methodology</h1>
        <div className="h-px w-12 mb-5" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#9a9a9a" }}>
          CrudeQ combines market data, supply-demand indicators, volatility, positioning,
          and systematic signal frameworks to assess weekly crude market direction — identifying when
          physical conditions confirm or contradict headline narratives. Every output is reproducible
          from structured data workflows, not manual interpretation.
        </p>
      </div>

      {/* ── Platform Modules Overview ─────────────────────────────────────── */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Platform Modules
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {platformModules.map(({ title, status, icon: Icon, desc }) => {
            const statusConfig = {
              LIVE:    { label: "LIVE",    bg: "rgba(34,197,94,0.1)",    border: "rgba(34,197,94,0.25)",    color: "#22c55e" },
              BETA:    { label: "BETA",    bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.25)",   color: "#818cf8" },
              ARCHIVE: { label: "ARCHIVE", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)",   color: "#94a3b8" },
            }[status];
            return (
              <div
                key={title}
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}
                    >
                      <Icon size={13} style={{ color: "var(--accent)" }} />
                    </div>
                    <span className="text-sm font-semibold text-white">{title}</span>
                  </div>
                  <span
                    className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
                    style={{ background: statusConfig.bg, border: `1px solid ${statusConfig.border}`, color: statusConfig.color }}
                  >
                    {statusConfig.label}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── How the Weekly Brief Is Generated ────────────────────────────── */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-1"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          How the Weekly Brief Is Generated
        </p>
        <p className="text-xs mb-5 leading-relaxed" style={{ color: "#555" }}>
          Weekly Research Pipeline
        </p>

        {/* Pipeline flow strip */}
        <div
          className="rounded-xl px-5 py-4 flex items-center gap-2 flex-wrap mb-6"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {["Raw Data", "Signal Engine", "Regime Overlay", "Trade Output", "Publish"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold" style={{ color: i === arr.length - 1 ? "var(--accent)" : "#f0f0f0" }}>
                {step}
                {i === arr.length - 1 && (
                  <span className="ml-1.5 text-[9px] tracking-wider px-1.5 py-0.5 rounded font-mono align-middle"
                    style={{ background: "rgba(212,146,42,0.12)", border: "1px solid rgba(212,146,42,0.25)", color: "var(--accent)" }}>
                    MANUAL
                  </span>
                )}
              </span>
              {i < arr.length - 1 && <ArrowRight size={12} style={{ color: "#333", flexShrink: 0 }} />}
            </div>
          ))}
        </div>

        {/* Author note */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6"
          style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.15)" }}
        >
          <div
            className="w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold font-mono"
            style={{ background: "rgba(212,146,42,0.15)", color: "var(--accent)", border: "1px solid rgba(212,146,42,0.25)" }}
          >
            i
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Signals are interpreted by the author and the brief is{" "}
            <span className="text-white font-medium">manually constructed</span>. All data is pulled and
            basic signals are automatically computed and displayed to the author, who uses them to update
            metrics and graphs. Trade signals are based on the author&apos;s interpretation of geopolitical
            events and data — fundamentals, futures curve, and crack spreads.
          </p>
        </div>

        {/* Step cards */}
        <div className="space-y-3">
          {briefSteps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className="text-[10px] font-mono font-bold tabular-nums" style={{ color: step.color }}>
                  Step {step.num}
                </span>
                <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="text-sm font-semibold text-white">{step.title}</span>
              </div>
              <div className="px-5 py-3 flex flex-wrap gap-x-6 gap-y-1">
                {step.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 w-full sm:w-auto">
                    {!item.startsWith("→") && !item.endsWith(":") ? (
                      <>
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: step.color, opacity: 0.7 }} />
                        <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{item}</span>
                      </>
                    ) : item.startsWith("→") ? (
                      <span className="text-xs font-mono leading-relaxed" style={{ color: "#555", paddingLeft: "12px" }}>{item}</span>
                    ) : (
                      <span className="text-xs font-medium w-full mb-0.5" style={{ color: "#9a9a9a" }}>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Performance Tracking Methodology ─────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-xs font-mono uppercase tracking-widest font-bold"
            style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
            Performance Tracking Methodology
          </p>
          <span
            className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e" }}
          >
            FORWARD-LIVE
          </span>
        </div>
        <p className="text-xs mb-6 leading-relaxed" style={{ color: "#555" }}>
          Forward-Live Performance System
        </p>

        {/* Inception note */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl mb-6"
          style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}
        >
          <div
            className="w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center"
            style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Official performance statistics begin from the launch of the upgraded tracker.
            Prior reports remain available in the{" "}
            <span className="text-white font-medium">Archive</span> for research reference
            but are <span className="text-white font-medium">not included</span> in live performance metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* What Is Tracked */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="px-5 py-3 text-xs font-mono tracking-widest uppercase"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--muted)" }}
            >
              What Is Tracked
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {[
                "Strategy", "Entry", "Target", "Stop", "Conviction",
                "Size (R)", "Thesis", "Status", "Exit Price",
                "P&L", "Days Open", "Result", "R-Multiple",
              ].map((field) => (
                <span
                  key={field}
                  className="text-[10px] font-mono px-2 py-1 rounded"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#9a9a9a" }}
                >
                  {field}
                </span>
              ))}
            </div>
          </div>

          {/* How Trades Are Closed */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div
              className="px-5 py-3 text-xs font-mono tracking-widest uppercase"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--muted)" }}
            >
              How Trades Are Closed
            </div>
            <div className="px-5 py-4 space-y-2">
              {[
                "Target is reached",
                "Stop is reached",
                "Manual thesis change",
                "Time / event expiry",
                "Options premium objective reached",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(212,146,42,0.6)" }} />
                  <span className="text-xs" style={{ color: "var(--muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Position Sizing Framework */}
        <div
          className="rounded-xl overflow-hidden mb-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              Position Sizing Framework
            </span>
            <span className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
              1.0R = 0.75% model portfolio NAV at stop
            </span>
          </div>
          {/* Column headers */}
          <div className="grid grid-cols-3 px-5 pt-3 pb-1.5">
            {["CONVICTION", "SIZE", "NAV AT RISK"].map((h) => (
              <div key={h} className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>{h}</div>
            ))}
          </div>
          {[
            { label: "Low",         r: "0.25R", nav: "~0.19%", color: "#6b6b6b" },
            { label: "Medium",      r: "0.50R", nav: "~0.38%", color: "#94a3b8" },
            { label: "Medium-High", r: "0.75R", nav: "~0.56%", color: "#d4922a" },
            { label: "High",        r: "1.00R", nav: "~0.75%", color: "#22c55e" },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="grid grid-cols-3 items-center px-5 py-2.5 hover:bg-white/[0.015] transition-colors"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.04)",
                marginBottom: i === arr.length - 1 ? "4px" : 0,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: row.color }} />
                <span
                  className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded"
                  style={{ background: `${row.color}15`, color: row.color, border: `1px solid ${row.color}28` }}
                >
                  {row.label.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono font-semibold tabular-nums" style={{ color: "#f0f0f0" }}>
                {row.r}
              </span>
              <span className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                {row.nav}
              </span>
            </div>
          ))}
        </div>

        {/* Metrics Displayed */}
        <div
          className="rounded-xl overflow-hidden mb-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div
            className="px-5 py-3 text-xs font-mono tracking-widest uppercase"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "var(--muted)" }}
          >
            Metrics Displayed on Performance Tab
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              "Win Rate", "Since Inception Return", "Average R",
              "Equity Curve", "Strategy Breakdown", "Conviction Accuracy",
              "Open Positions", "Trade History",
            ].map((m) => (
              <div key={m} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent)", opacity: 0.7 }} />
                <span className="text-xs" style={{ color: "var(--muted)" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <a
          href="https://github.com/AdityaManojMenon/weekly-crude-market-brief"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-5 py-3.5 rounded-xl transition-opacity hover:opacity-75 group"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
              style={{ background: "rgba(226,232,240,0.06)", border: "1px solid rgba(226,232,240,0.12)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#e2e8f0" }}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AdityaManojMenon / weekly-crude-market-brief</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                Full pipeline source · call tracker · briefs · data cache · requirements
              </p>
            </div>
          </div>
          <ExternalLink size={12} className="shrink-0" style={{ color: "var(--muted)" }} />
        </a>
      </div>

      {/* ── Beta Modules ──────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <p className="text-xs font-mono uppercase tracking-widest font-bold"
            style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
            Experimental Modules
          </p>
          <span
            className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8" }}
          >
            BETA
          </span>
        </div>
        <p className="text-xs mb-6 leading-relaxed" style={{ color: "#555" }}>
          The CrudeQ frontend spans three independent research engines — each with its own data pipeline and GitHub repository.
        </p>

        {/* 3-repo infrastructure note */}
        <div
          className="rounded-xl px-5 py-3.5 mb-6 flex items-start gap-3"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            {["#d97706", "#8b5cf6", "#3b82f6"].map((c) => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            <span className="text-white font-medium">Frontend infrastructure:</span>{" "}
            The CrudeQ platform is backed by three separate Python engines —{" "}
            <span className="font-mono" style={{ color: "var(--accent)" }}>weekly-crude-market-brief</span>{" "}
            (core brief pipeline),{" "}
            <span className="font-mono" style={{ color: "#818cf8" }}>wti-balance-monitor</span>{" "}
            (Forecast module), and{" "}
            <span className="font-mono" style={{ color: "#3b82f6" }}>physical-arb-engine</span>{" "}
            (Arb module). Each runs independently and feeds structured outputs to the frontend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Forecast Beta */}
          <div
            className="rounded-xl overflow-hidden flex flex-col"
            style={{ background: "var(--card)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            {/* Header */}
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(99,102,241,0.04)" }}
            >
              <div className="flex items-center gap-2.5">
                <FlaskConical size={13} style={{ color: "#818cf8" }} />
                <span className="text-sm font-semibold text-white">Forecast</span>
              </div>
              <span
                className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818cf8" }}
              >
                BETA
              </span>
            </div>

            {/* Purpose */}
            <div className="px-5 pt-4 pb-3">
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                Designed to estimate upcoming EIA inventory builds/draws <span className="text-white">before release</span>,
                using supply-demand balance inputs derived from the{" "}
                <span className="font-mono text-[10px]" style={{ color: "#818cf8" }}>wti-balance-monitor</span> engine.
                Balance construction follows:{" "}
                <span className="font-mono text-[10px] text-white">
                  Production + Imports − Exports − Refinery Runs
                </span>
              </p>

              <p className="text-[9px] font-mono tracking-widest mb-2" style={{ color: "var(--muted)" }}>INPUTS MAY INCLUDE</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Production", "Imports", "Exports", "Refinery Runs", "Seasonality", "Prior Balances"].map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", color: "#818cf8" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[9px] font-mono tracking-widest mb-2" style={{ color: "var(--muted)" }}>CURRENT STATUS</p>
              <div className="space-y-1.5 mb-4">
                {[
                  "Beta environment — under active development",
                  "Layouts may use stale or sample data",
                  "Forecasts require continuous validation before full production deployment",
                ].map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: "#818cf8", opacity: 0.6 }} />
                    <span className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub link */}
            <div className="mt-auto">
              <a
                href="https://github.com/AdityaManojMenon/wti-balance-monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 transition-opacity hover:opacity-75"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#818cf8", flexShrink: 0 }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-[11px] font-mono" style={{ color: "#818cf8" }}>wti-balance-monitor</span>
                <ExternalLink size={10} className="ml-auto shrink-0" style={{ color: "var(--muted)" }} />
              </a>
            </div>
          </div>

          {/* Arb Beta */}
          <div
            className="rounded-xl overflow-hidden flex flex-col"
            style={{ background: "var(--card)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            {/* Header */}
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(59,130,246,0.04)" }}
            >
              <div className="flex items-center gap-2.5">
                <BarChart size={13} style={{ color: "#3b82f6" }} />
                <span className="text-sm font-semibold text-white">Arb</span>
              </div>
              <span
                className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", color: "#3b82f6" }}
              >
                BETA
              </span>
            </div>

            {/* Purpose */}
            <div className="px-5 pt-4 pb-3">
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                Designed to analyze relative economics of crude flows, benchmark spreads, and route
                opportunities across regions — powered by the{" "}
                <span className="font-mono text-[10px]" style={{ color: "#3b82f6" }}>physical-arb-engine</span>.
              </p>

              <p className="text-[9px] font-mono tracking-widest mb-2" style={{ color: "var(--muted)" }}>INTENDED USE CASES</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Brent-WTI Dislocations", "Export Route Economics", "Freight-Adjusted Opportunities", "Grade Differentials", "Refinery Pull Signals"].map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", color: "#3b82f6" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-[9px] font-mono tracking-widest mb-2" style={{ color: "var(--muted)" }}>CURRENT STATUS</p>
              <div className="space-y-1.5 mb-4">
                {[
                  "Beta environment — engine scaffolding in progress",
                  "Displayed values may be illustrative or delayed",
                  "Assumptions and external data sources still under active validation",
                ].map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: "#3b82f6", opacity: 0.6 }} />
                    <span className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub link */}
            <div className="mt-auto">
              <a
                href="https://github.com/AdityaManojMenon/physical-arb-engine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 transition-opacity hover:opacity-75"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#3b82f6", flexShrink: 0 }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-[11px] font-mono" style={{ color: "#3b82f6" }}>physical-arb-engine</span>
                <ExternalLink size={10} className="ml-auto shrink-0" style={{ color: "var(--muted)" }} />
              </a>
            </div>
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

      {/* ── Data Freshness Notice ─────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Data Integrity &amp; Freshness
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Header strip */}
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "var(--bull)" }} />
            <span className="text-xs font-semibold text-white">Data Freshness Notice</span>
          </div>
          {/* Two-col status grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
            {[
              {
                label: "LIVE SECTIONS",
                badge: "LIVE",
                badgeBg: "rgba(34,197,94,0.1)",
                badgeBorder: "rgba(34,197,94,0.25)",
                badgeColor: "#22c55e",
                dot: "#22c55e",
                desc: "Updated from current workflows where available. Weekly Brief data, performance metrics, and call logs reflect the most recent available inputs following each EIA release.",
              },
              {
                label: "BETA MODULES",
                badge: "BETA",
                badgeBg: "rgba(99,102,241,0.1)",
                badgeBorder: "rgba(99,102,241,0.25)",
                badgeColor: "#818cf8",
                dot: "#818cf8",
                desc: "Forecast and Arb modules may display placeholder, delayed, or non-production values while pipelines are being validated. Outputs should not be used for live trading decisions.",
              },
            ].map(({ label, badge, badgeBg, badgeBorder, badgeColor, dot, desc }) => (
              <div key={label} className="px-5 py-4" style={{ background: "var(--card)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                  <span className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>{label}</span>
                  <span
                    className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded ml-auto"
                    style={{ background: badgeBg, border: `1px solid ${badgeBorder}`, color: badgeColor }}
                  >
                    {badge}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
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
              Data ingestion, signal generation, and chart production are powered by a modular Python
              research pipeline. The pipeline surfaces structured outputs to the author, who interprets
              signals and manually constructs the final brief. Executed weekly following the EIA WPSR
              release at 10:30 AM ET.
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

      {/* ── Known Limitations ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Known Limitations
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {[
            { text: "Sudden geopolitical shocks can override all quantitative model signals within hours", color: "#ef4444" },
            { text: "EIA data revisions in subsequent weeks can invalidate signals generated from first-release figures", color: "#f97316" },
            { text: "Low-liquidity sessions and roll periods distort spread and volatility readings", color: "#eab308" },
            { text: "Options outputs are simplified for educational and illustrative use — not production-grade pricing", color: "#8b5cf6" },
            { text: "Beta modules (Forecast, Arb) remain under active development and are not production-validated", color: "#818cf8" },
          ].map(({ text, color }, i, arr) => (
            <div
              key={i}
              className="flex items-start gap-3.5 px-5 py-3.5 hover:bg-white/[0.015] transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold font-mono tabular-nums"
                style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
              >
                {i + 1}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl p-5"
        style={{ background: "rgba(212,146,42,0.04)", border: "1px solid rgba(212,146,42,0.15)" }}
      >
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-2"
          style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>
          Disclaimer
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>
          CrudeQ is an independent research platform for{" "}
          <span className="text-white font-medium">informational and educational purposes only</span>.
          It does not constitute investment advice or a solicitation to trade. All analysis reflects the
          author&apos;s independent views based on publicly available data. Past signal accuracy is not
          indicative of future results. Readers should apply independent judgment and appropriate risk management.
        </p>
      </div>

    </div>
  );
}
