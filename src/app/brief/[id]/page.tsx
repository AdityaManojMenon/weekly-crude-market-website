import { briefs, getBiasLabel, getBiasColor, getRegimeLabel } from "@/data/briefs";
import SignalBadge from "@/components/SignalBadge";
import SectionHeader from "@/components/SectionHeader";
import SpreadMiniChart from "@/components/SpreadMiniChart";
import RiskDashboardComponent from "@/components/RiskDashboard";
import CatalystCalendar from "@/components/CatalystCalendar";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FileText, Database, Zap, TrendingUp,
  Target, Globe, Layers, Factory, AlertTriangle, ShieldAlert, CalendarClock,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return briefs.map((b) => ({ id: b.id }));
}

export default async function BriefPage({ params }: Props) {
  const { id } = await params;
  const brief = briefs.find((b) => b.id === id);
  if (!brief) notFound();

  const biasDir = getBiasColor(brief.bias);
  const fmtChange = (v: number) => (v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1));
  const surpriseColor = (v: number) => (v < 0 ? "var(--bull)" : v > 0 ? "var(--bear)" : "var(--neutral)");
  const dirColor = (d: "bull" | "bear" | "neutral") =>
    d === "bull" ? "var(--bull)" : d === "bear" ? "var(--bear)" : "var(--neutral)";
  const weightBg = (w: string) =>
    w === "HIGH" ? "rgba(212,146,42,0.15)" : w === "MEDIUM" ? "rgba(148,163,184,0.08)" : "rgba(60,60,60,0.4)";
  const weightColor = (w: string) =>
    w === "HIGH" ? "var(--accent)" : w === "MEDIUM" ? "var(--neutral)" : "var(--muted)";

  const currentIndex = briefs.findIndex((b) => b.id === id);
  const prevBrief = briefs[currentIndex + 1] || null;
  const nextBrief = briefs[currentIndex - 1] || null;

  const convictionStyle = (c: string) => {
    if (c === "HIGH")   return { bg: "rgba(212,146,42,0.15)", color: "var(--accent)",  border: "rgba(212,146,42,0.3)" };
    if (c === "MEDIUM") return { bg: "rgba(148,163,184,0.08)", color: "var(--neutral)", border: "var(--border)" };
    return               { bg: "rgba(239,68,68,0.08)",  color: "var(--bear)",   border: "rgba(239,68,68,0.2)" };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 fade-in">

      {/* Back nav */}
      <div className="flex items-center justify-between mb-7">
        <Link href="/archive" className="text-xs font-mono tracking-wider transition-colors" style={{ color: "var(--muted)" }}>
          ← ARCHIVE
        </Link>
        <div className="flex items-center gap-4">
          {prevBrief && <Link href={`/brief/${prevBrief.id}`} className="text-xs font-mono" style={{ color: "var(--muted)" }}>← {prevBrief.weekEnding}</Link>}
          {nextBrief && <Link href={`/brief/${nextBrief.id}`} className="text-xs font-mono" style={{ color: "var(--muted)" }}>{nextBrief.weekEnding} →</Link>}
        </div>
      </div>

      {/* Header Band */}
      <div className="rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--muted)" }}>{brief.reportWeek.toUpperCase()}</span>
            <div className="h-3 w-px" style={{ background: "var(--border)" }} />
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--muted)" }}>EIA: {brief.eiaReleaseDate.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl font-bold text-white leading-snug max-w-3xl">{brief.headline}</h1>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>BIAS</span>
            <SignalBadge direction={biasDir} label={getBiasLabel(brief.bias)} />
            {brief.biasNote && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded tracking-wider"
                style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.25)" }}>
                {brief.biasNote}
              </span>
            )}
          </div>
          <div className="h-12 w-px" style={{ background: "var(--border)" }} />
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>REGIME</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded tracking-wider"
              style={{ background: brief.regime === "DIVERGENT" ? "rgba(251,191,36,0.1)" : "rgba(148,163,184,0.08)", color: brief.regime === "DIVERGENT" ? "#fbbf24" : "var(--neutral)", border: `1px solid ${brief.regime === "DIVERGENT" ? "#fbbf2440" : "var(--border)"}` }}>
              {getRegimeLabel(brief.regime)}
            </span>
          </div>
          <div className="h-12 w-px" style={{ background: "var(--border)" }} />
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>WTI SPOT</span>
            <span className="text-xl font-mono font-bold tabular-nums text-white">${brief.wtiPriceAtPublish.toFixed(2)}</span>
            <span className="text-xs font-mono tabular-nums" style={{ color: brief.wtiWeeklyChange >= 0 ? "var(--bull)" : "var(--bear)" }}>
              {brief.wtiWeeklyChange >= 0 ? "+" : ""}{brief.wtiWeeklyChange.toFixed(2)} WoW
            </span>
          </div>
        </div>
      </div>

      {/* Divergence Alert */}
      {brief.divergenceFlag && (
        <div className="rounded-xl p-5 mb-8 flex items-start gap-4"
          style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.22)" }}>
          <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
          <div>
            <div className="text-xs font-mono font-bold tracking-widest mb-2" style={{ color: "#fbbf24" }}>DIVERGENCE REGIME FLAGGED</div>
            <p className="text-sm leading-relaxed" style={{ color: "#c9a44a" }}>{brief.divergenceNote}</p>
          </div>
        </div>
      )}

      {/* Executive Summary */}
      <div className="mb-8">
        <SectionHeader title="Executive Summary" accent icon={FileText} />
        <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <p className="text-sm leading-loose" style={{ color: "#cccccc" }}>{brief.executiveSummary}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-8">
        <SectionHeader title="Key Metrics" icon={Database} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Crude Δ", value: `${fmtChange(brief.inventory.crude.actual)} MMbbl`, sub: `Surprise: ${fmtChange(brief.inventory.crude.surprise)}`, dir: brief.inventory.crude.actual < 0 ? "bull" : "bear", Icon: Database },
            { label: "CL1–CL2", value: `$${brief.curveStructure.spread.toFixed(2)}`, sub: brief.curveStructure.structure === "BACKWARDATION" && brief.curveStructure.spread >= 5 ? "Strong Backwardation" : brief.curveStructure.structure, dir: brief.curveStructure.spreadChange >= 0 ? "bull" : "bear", Icon: TrendingUp },
            { label: "3-2-1 Crack", value: `$${brief.crackSpreads.crackSpread321}/bbl`, sub: `${fmtChange(brief.crackSpreads.crackSpreadChange)} WoW`, dir: brief.crackSpreads.crackSpreadChange > 0 ? "bull" : "bear", Icon: Factory },
            { label: "Ref. Util.", value: `${brief.production.refinerUtilization}%`, sub: `${brief.production.domesticProduction} MMbbl/d prod`, dir: "accent", Icon: Factory },
          ].map(({ label, value, sub, dir, Icon }) => (
            <div key={label} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>{label}</div>
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: dir === "bull" ? "rgba(34,197,94,0.08)" : dir === "bear" ? "rgba(239,68,68,0.08)" : "rgba(212,146,42,0.08)" }}>
                  <Icon size={12} style={{ color: dir === "bull" ? "var(--bull)" : dir === "bear" ? "var(--bear)" : "var(--accent)" }} />
                </div>
              </div>
              <div className="text-xl font-mono font-bold tabular-nums" style={{ color: dir === "bull" ? "var(--bull)" : dir === "bear" ? "var(--bear)" : dir === "accent" ? "var(--accent)" : "#f0f0f0" }}>{value}</div>
              <div className="text-xs font-mono mt-1.5" style={{ color: "var(--muted)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Context Layer: Cross-Asset + Positioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

        {/* Cross-Asset Readthrough */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={13} style={{ color: "var(--accent)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>Cross-Asset Readthrough</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {brief.crossAsset.map((sig) => (
              <div key={sig.label} className="flex items-start gap-3">
                <div className="flex items-center gap-2 w-28 shrink-0 pt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: sig.direction === "bull" ? "var(--bull)" : sig.direction === "bear" ? "var(--bear)" : "var(--neutral)" }}
                  />
                  <span className="text-xs font-mono font-semibold text-white">{sig.label}</span>
                </div>
                <span
                  className="text-xs font-mono font-bold tabular-nums w-14 shrink-0 pt-0.5"
                  style={{ color: sig.direction === "bull" ? "var(--bull)" : sig.direction === "bear" ? "var(--bear)" : "var(--neutral)" }}
                >
                  {sig.value}
                </span>
                <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{sig.readthrough}</span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-4 text-xs leading-relaxed"
            style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            <span className="font-semibold" style={{ color: "var(--accent)" }}>Interpretation: </span>
            {brief.crossAssetNote}
          </div>
        </div>

        {/* Positioning Dashboard */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Target size={13} style={{ color: "var(--accent)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>Positioning Read</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Momentum",    value: brief.positioning.momentum },
              { label: "Fundamentals", value: brief.positioning.fundamentals },
              { label: "Volatility",  value: brief.positioning.volatility },
              { label: "Risk / Reward", value: brief.positioning.riskReward },
            ].map(({ label, value }) => {
              const isBull = value === "BULLISH" || value === "FAVORABLE" || value === "LOW";
              const isBear = value === "BEARISH" || value === "UNFAVORABLE" || value === "HIGH";
              const col = isBull ? "var(--bull)" : isBear ? "var(--bear)" : "var(--neutral)";
              const bg  = isBull ? "rgba(34,197,94,0.08)" : isBear ? "rgba(239,68,68,0.08)" : "rgba(148,163,184,0.06)";
              const bd  = isBull ? "rgba(34,197,94,0.18)" : isBear ? "rgba(239,68,68,0.18)" : "rgba(148,163,184,0.14)";
              return (
                <div
                  key={label}
                  className="rounded-lg p-3 flex flex-col gap-1"
                  style={{ background: bg, border: `1px solid ${bd}` }}
                >
                  <span className="text-xs font-mono tracking-wide" style={{ color: "var(--muted)" }}>{label.toUpperCase()}</span>
                  <span className="text-sm font-bold font-mono" style={{ color: col }}>{value}</span>
                </div>
              );
            })}
          </div>
          <div
            className="mt-3 rounded-lg px-3 py-2.5 flex items-start gap-2"
            style={{ background: "rgba(148,163,184,0.04)", border: "1px solid var(--border)" }}
          >
            <AlertTriangle size={11} className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {brief.positioning.interpretation}
            </p>
          </div>
        </div>

      </div>

      {/* Inventory + Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col gap-6 min-h-0">
          <div>
            <SectionHeader title="EIA Inventory Data" subtitle="MMbbl WoW" icon={Database} />
            <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["PRODUCT", "ACTUAL", "EXPECTED", "SURPRISE", "5YR AVG"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-mono tracking-wider" style={{ color: "var(--muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "CRUDE OIL", data: brief.inventory.crude },
                    { label: "GASOLINE", data: brief.inventory.gasoline },
                    { label: "DISTILLATES", data: brief.inventory.distillates },
                  ].map(({ label, data }, i) => (
                    <tr key={label} style={{ borderBottom: i < 2 ? "1px solid var(--border-subtle)" : "none" }} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3.5 text-xs font-mono tracking-wider text-white">{label}</td>
                      <td className="px-4 py-3.5 text-xs font-mono tabular-nums font-semibold" style={{ color: data.actual < 0 ? "var(--bull)" : "var(--bear)" }}>{fmtChange(data.actual)}</td>
                      <td className="px-4 py-3.5 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{fmtChange(data.expected)}</td>
                      <td className="px-4 py-3.5 text-xs font-mono tabular-nums font-bold" style={{ color: surpriseColor(data.surprise) }}>{fmtChange(data.surprise)}</td>
                      <td className="px-4 py-3.5 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{fmtChange(data.fiveYearAvg)}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid var(--border)" }}>
                    <td className="px-4 py-3.5 text-xs font-mono tracking-wider text-white">CUSHING</td>
                    <td className="px-4 py-3.5 text-xs font-mono tabular-nums font-semibold" style={{ color: brief.inventory.cushing.actual < 0 ? "var(--bull)" : "var(--bear)" }}>{fmtChange(brief.inventory.cushing.actual)}</td>
                    <td className="px-4 py-3.5 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{fmtChange(brief.inventory.cushing.expected)}</td>
                    <td className="px-4 py-3.5 text-xs font-mono tabular-nums font-bold" style={{ color: surpriseColor(brief.inventory.cushing.actual - brief.inventory.cushing.expected) }}>{fmtChange(brief.inventory.cushing.actual - brief.inventory.cushing.expected)}</td>
                    <td className="px-4 py-3.5 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col flex-1 min-h-0">
            <SectionHeader title="Spread + Momentum" subtitle="CL1–CL2 · 10-day" icon={TrendingUp} />
            <div className="flex-1 min-h-0" style={{ minHeight: "200px" }}>
              <SpreadMiniChart data={brief.curveStructure.spreadHistory} currentSpread={brief.curveStructure.spread} structure={brief.curveStructure.structure} compact />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Signal Framework"
            subtitle={`${brief.signals.filter(s => s.direction === "bull").length}▲ · ${brief.signals.filter(s => s.direction === "bear").length}▼ · ${brief.signals.filter(s => s.direction === "neutral").length}◆`}
            icon={Zap} />
          <div className="flex flex-col gap-2.5">
            {brief.signals.map((signal) => (
              <div key={signal.name} className="rounded-xl px-5 py-4 flex items-start justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-wider text-white font-semibold">{signal.name}</span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: weightBg(signal.weight), color: weightColor(signal.weight), fontSize: "10px" }}>{signal.weight}</span>
                  </div>
                  <span className="text-xs font-mono tabular-nums font-bold" style={{ color: dirColor(signal.direction) }}>{signal.value}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{signal.note}</span>
                </div>
                <SignalBadge direction={signal.direction} size="sm" />
              </div>
            ))}

            {/* Distillate + Cushing supplemental metrics */}
            {[
              {
                name: "Distillates Δ",
                actual: brief.inventory.distillates.actual,
                surprise: brief.inventory.distillates.surprise,
                expected: brief.inventory.distillates.expected,
                impact: (a: number) => a < -0.5
                  ? "Draw signals strong heating/diesel demand — supportive for crude pull-through"
                  : a > 0.5
                  ? "Build signals soft industrial/heating demand — bearish for refinery run rates"
                  : "Flat print — neutral signal for downstream demand conditions",
              },
              {
                name: "Cushing Δ",
                actual: brief.inventory.cushing.actual,
                surprise: brief.inventory.cushing.actual - brief.inventory.cushing.expected,
                expected: brief.inventory.cushing.expected,
                impact: (a: number) => a < -0.5
                  ? "Cushing draw tightens WTI delivery point — direct upward pressure on prompt prices"
                  : a > 0.5
                  ? "Cushing build adds delivery-point supply — weighs on CL1 prompt price directly"
                  : "Cushing near flat — no acute delivery-point distortion this week",
              },
            ].map(({ name, actual, surprise, expected, impact }) => {
              const dir: "bull" | "bear" | "neutral" =
                actual < -0.5 ? "bull" : actual > 0.5 ? "bear" : "neutral";
              return (
                <div
                  key={name}
                  className="rounded-xl px-5 py-4 flex items-start justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono tracking-wider text-white font-semibold">{name}</span>
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(148,163,184,0.08)", color: "var(--muted)", fontSize: "10px" }}>
                        MEDIUM
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono tabular-nums font-bold" style={{ color: dirColor(dir) }}>
                        {fmtChange(actual)} MMbbl
                      </span>
                      <span className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                        exp {fmtChange(expected)} · surp{" "}
                        <span style={{ color: surprise < 0 ? "var(--bull)" : surprise > 0 ? "var(--bear)" : "var(--neutral)" }}>
                          {fmtChange(surprise)}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", fontSize: "11px" }}>
                      {impact(actual)}
                    </p>
                  </div>
                  <SignalBadge direction={dir} size="sm" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trade Ideas + Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col h-full">
          <SectionHeader title="Trade Ideas" accent icon={Target} />
          <div className="flex flex-col gap-4 flex-1">
            {brief.tradeIdeas.map((idea, i) => {
              const cs = convictionStyle(idea.conviction);
              return (
                <div key={i} className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-sm font-bold text-white leading-snug">{idea.structure}</span>
                    <span className="text-xs font-mono px-2 py-1 rounded shrink-0" style={{ background: cs.bg, color: cs.color, border: `1px solid ${cs.border}` }}>{idea.conviction} CONVICTION</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#9a9a9a" }}>{idea.rationale}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "ENTRY",  value: idea.entry,  color: "#e0e0e0" },
                      { label: "TARGET", value: idea.target, color: "var(--bull)" },
                      { label: "STOP",   value: idea.stop,   color: "var(--bear)" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="rounded-lg p-2.5" style={{ background: "#090909", border: "1px solid var(--border-subtle)" }}>
                        <div className="text-xs font-mono mb-1" style={{ color: "var(--muted)", fontSize: "9px", letterSpacing: "0.08em" }}>{label}</div>
                        <div className="text-xs font-mono font-semibold leading-tight" style={{ color }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Key Price Levels */}
            <div className="rounded-xl p-5 mt-auto" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-mono uppercase tracking-widest font-bold mb-4" style={{ color: "var(--accent)", letterSpacing: "0.1em" }}>
                Key Price Levels
              </p>
              <div className="space-y-2">
                {brief.keyLevels.map((lvl, i) => {
                  const typeColor = lvl.type === "resistance" ? "#dc2626" : lvl.type === "support" ? "#16a34a" : "#d97706";
                  return (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: typeColor }} />
                        <span className="text-xs truncate" style={{ color: "var(--muted)" }}>{lvl.label}</span>
                      </div>
                      <span className="text-xs font-mono font-bold flex-shrink-0" style={{ color: typeColor }}>{lvl.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Scenario Analysis" icon={Layers} />
          <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            {brief.scenarios.map((scenario, i) => {
              const symMap: Record<string, string> = { bull: "▲", bear: "▼", neutral: "⚖" };
              const labelMap: Record<string, string> = { bull: "Bullish Case", bear: "Bearish Case", neutral: "Base Case" };
              const leftBorder: Record<string, string> = { bull: "rgba(34,197,94,0.4)", bear: "rgba(239,68,68,0.4)", neutral: "rgba(148,163,184,0.25)" };
              const isLast = i === brief.scenarios.length - 1;
              return (
                <div key={i} className="p-5" style={{ borderBottom: isLast ? "none" : "1px solid var(--border)", borderLeft: `3px solid ${leftBorder[scenario.direction]}` }}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="font-mono text-sm" style={{ color: dirColor(scenario.direction) }}>{symMap[scenario.direction]}</span>
                    <span className="text-sm font-bold" style={{ color: dirColor(scenario.direction) }}>{labelMap[scenario.direction]}</span>
                    <span className="text-sm font-semibold text-white">— {scenario.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#9a9a9a" }}>{scenario.description}</p>
                  <div className="flex items-start gap-2 pt-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-xs font-mono font-bold tracking-wider shrink-0 mt-0.5" style={{ color: "var(--muted)" }}>TRIGGER:</span>
                    <span className="text-xs font-mono leading-relaxed" style={{ color: "var(--accent)" }}>{scenario.trigger}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Risk Dashboard */}
      <div className="mb-8">
        <SectionHeader title="Risk Dashboard" icon={ShieldAlert} />
        <RiskDashboardComponent data={brief.riskDashboard} />
      </div>

      {/* Upcoming Market Catalysts */}
      <div className="mb-8">
        <SectionHeader title="Upcoming Market Catalysts" icon={CalendarClock} />
        <CatalystCalendar events={brief.catalysts} />
      </div>

      {/* Geopolitical + Outlook */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <SectionHeader title="Geopolitical Context" icon={Globe} />
          <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-sm leading-loose" style={{ color: "#9a9a9a" }}>{brief.geopoliticalContext}</p>
          </div>
        </div>
        <div>
          <SectionHeader title="Weekly Outlook" accent icon={FileText} />
          <div className="rounded-xl p-6" style={{ background: "var(--card)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <p className="text-sm leading-loose" style={{ color: "#cccccc" }}>{brief.outlook}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid var(--border)" }}>
        <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
          Published {brief.publishedDate} · EIA data {brief.eiaReleaseDate}
        </span>
        <Link href="/archive" className="text-xs font-mono tracking-wider hover:text-white transition-colors" style={{ color: "var(--accent)" }}>
          ← ALL BRIEFS
        </Link>
      </div>
    </div>
  );
}
