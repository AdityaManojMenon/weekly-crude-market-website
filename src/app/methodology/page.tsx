import { Database, TrendingUp, BarChart2, Activity, Globe, FileText, GitBranch, ExternalLink, ArrowRight, Download, Zap, Layers, Target, ClipboardList } from "lucide-react";

const inputs = [
  {
    icon: Database,
    title: "EIA Weekly Petroleum Status Report",
    body: "Crude, gasoline, distillates, Cushing inventories, and refinery utilization — processed within minutes of Wednesday release for same-day analysis.",
  },
  {
    icon: TrendingUp,
    title: "Term Structure",
    body: "CL1–CL2 futures spread used as a real-time proxy for prompt tightness, backwardation strength, or contango depth — the most direct measure of physical scarcity.",
  },
  {
    icon: BarChart2,
    title: "Refining Economics",
    body: "3-2-1 crack spread as a downstream demand indicator. Sustained elevation confirms end-product pull; compression signals demand softening before it appears in crude inventories.",
  },
  {
    icon: Activity,
    title: "Regime Analysis",
    body: "Spread momentum and inventory surprise patterns classify the active market regime: tightening, transitional, divergent, or loosening. Regime context determines signal weight.",
  },
  {
    icon: Globe,
    title: "Macro & Geopolitical Overlay",
    body: "OPEC+ policy decisions, Middle East supply risk, USD strength, equity market conditions, and macro growth signals incorporated as scenario stress-tests and conviction modifiers.",
  },
];

const outputs = [
  "Directional bias with regime context",
  "Key metrics — inventory, curve structure, cracks, production",
  "Trade ideas with entry, target, and stop levels",
  "Scenario analysis — Bullish, Bearish, and Base Case",
  "Upcoming catalyst watchlist",
  "Call tracking and performance attribution",
];

const pipelineSteps = [
  { file: "eia_ingestion.py",          desc: "Pulls EIA WPSR series via API, normalizes, caches locally" },
  { file: "inventory_surprise_model.py", desc: "Calculates surprise delta vs consensus and 5-yr seasonal norms" },
  { file: "curve_analytics.py",         desc: "Classifies CL1–CL2 spread, backwardation/contango regime" },
  { file: "crack_spreads.py",           desc: "Computes 3-2-1 crack spread from product futures" },
  { file: "signal_framework.py",        desc: "Integrates signals, detects divergence regime, scores conviction" },
  { file: "chart_engine.py",            desc: "Generates inventory, spread, and crack charts (Plotly)" },
  { file: "generate_brief.py",          desc: "Assembles structured markdown brief from all pipeline outputs" },
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
    items: ["WTI front-month settlements", "CL1–CL2 prompt spread", "RBOB & heating oil futures", "Historical curve structure"],
  },
  {
    category: "Consensus Expectations",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    source: "Reuters Poll / Market Consensus",
    items: ["Weekly inventory survey estimates", "Inventory surprise calculation baseline"],
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
  {
    label: "Raw Data",
    icon: Download,
    color: "#d97706",
    detail: "EIA WPSR inventory series, NYMEX WTI futures settlements, and analyst consensus estimates are ingested and normalized within minutes of the Wednesday 10:30 AM ET release.",
  },
  {
    label: "Signal Engine",
    icon: Zap,
    color: "#3b82f6",
    detail: "Inventory surprise (vs 5-yr seasonal norms), CL1–CL2 spread structure, and 3-2-1 crack spreads are scored and combined into a composite physical tightness signal.",
  },
  {
    label: "Regime Classify",
    icon: Layers,
    color: "#8b5cf6",
    detail: "The active market regime is classified — Tightening, Loosening, Divergent, or Transitional — based on signal alignment. Divergence regimes receive elevated analytical priority.",
  },
  {
    label: "Trade Ideas",
    icon: Target,
    color: "#16a34a",
    detail: "Directional bias, conviction level, entry/target/stop levels, and scenario stress-tests are generated from signal outputs and regime context.",
  },
  {
    label: "Call Tracking",
    icon: ClipboardList,
    color: "#d4922a",
    detail: "Every directional call is logged to call_tracker.csv with outcome, WTI price at publish, and 1-week return. Win rate and regime-based accuracy are tracked continuously.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          WTI Macro & Flow
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Methodology</h1>
        <div className="h-px w-12 mb-5" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#9a9a9a" }}>
          WTI Macro & Flow combines market data, supply-demand indicators, and systematic signal
          frameworks to assess weekly crude market direction — identifying when physical
          conditions confirm or diverge from headline narratives.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Analytical Flow
        </p>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          {/* Node row */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{
                        background: `${step.color}18`,
                        border: `1.5px solid ${step.color}50`,
                        boxShadow: `0 0 12px ${step.color}20`,
                      }}
                    >
                      <Icon size={16} style={{ color: step.color }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wide whitespace-nowrap"
                      style={{ color: step.color }}>
                      {step.label.toUpperCase()}
                    </span>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight size={20} className="mx-3 shrink-0" style={{ color: "#ffffff" }} />
                  )}
                </div>
              );
            })}
          </div>


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
              Each brief moves from raw data to actionable intelligence across six structured sections:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {outputs.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--accent)" }} />
                <span className="text-xs leading-relaxed" style={{ color: "#9a9a9a" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline + Data Sources */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
          style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
          Open Architecture Research Pipeline
        </p>

        <div className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

          {/* Description */}
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

          {/* Pipeline steps */}
          <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
              Execution Sequence
            </p>
            <div className="space-y-2">
              {pipelineSteps.map((step, i) => (
                <div key={step.file} className="flex items-start gap-3">
                  <div className="flex items-center gap-1 shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono w-4 text-right"
                      style={{ color: "var(--muted)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--border)" }}>│</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                    <span className="text-xs font-mono font-semibold shrink-0"
                      style={{ color: "var(--accent)" }}>
                      {step.file}
                    </span>
                    <span className="hidden sm:block text-[10px]" style={{ color: "var(--border)" }}>—</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data sources grid */}
          <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-4"
              style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
              Primary Data Sources
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dataSources.map(({ category, color, bg, border, source, items }) => (
                <div key={category} className="rounded-lg p-4"
                  style={{ background: bg, border: `1px solid ${border}` }}>
                  <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5"
                    style={{ color, letterSpacing: "0.1em" }}>
                    {category}
                  </p>
                  <p className="text-xs font-semibold text-white mb-2">{source}</p>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                          style={{ background: color }} />
                        <span className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/AdityaManojMenon/weekly-crude-market-brief"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 transition-opacity hover:opacity-75 group"
          >
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
                  Pipeline source · EIA ingestion · Signal models · Call tracker · Initiated March 2026
                </p>
              </div>
            </div>
            <ExternalLink size={13} className="shrink-0 transition-colors" style={{ color: "var(--muted)" }} />
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
          accuracy is not indicative of future results.
        </p>
      </div>

    </div>
  );
}
