import {
  getPerformanceMetrics,
  callHistory,
  openTrades,
  closedTrades,
  strategyBreakdown,
  convictionStats,
  getBiasLabel,
  getBiasColor,
} from "@/data/briefs";
import SectionHeader from "@/components/SectionHeader";
import SignalBadge from "@/components/SignalBadge";
import { EquityCurveChart } from "@/components/PerformanceCharts";

export default function Performance() {
  const metrics = getPerformanceMetrics();
  const currentExposureR = openTrades.reduce((sum, t) => sum + t.sizeR, 0);

  const kpiCards = [
    {
      label: "Total Trades",
      value: String(metrics.totalTrades),
      sub: `${metrics.totalCalls} completed`,
      color: "#f0f0f0",
    },
    {
      label: "Win Rate",
      value: `${metrics.winRate}%`,
      sub: `${metrics.wins}W · ${metrics.losses}L · ${metrics.pushes}P`,
      color: "var(--bull)",
    },
    {
      label: "Since Inception",
      value: `${metrics.sinceInceptionR >= 0 ? "+" : ""}${metrics.sinceInceptionR}R`,
      sub: "Cumulative R",
      color: metrics.sinceInceptionR >= 0 ? "var(--bull)" : "var(--bear)",
    },
    {
      label: "Avg R / Trade",
      value: `${metrics.avgRPerTrade >= 0 ? "+" : ""}${metrics.avgRPerTrade}R`,
      sub: "Per completed trade",
      color: metrics.avgRPerTrade >= 0 ? "var(--accent)" : "var(--bear)",
    },
    {
      label: "Open Trades",
      value: String(openTrades.length),
      sub: "Currently tracked",
      color: "var(--accent)",
    },
    {
      label: "Best Strategy",
      value: metrics.bestStrategy,
      sub: "100% win rate",
      color: "#818cf8",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 fade-in">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-6 rounded-full" style={{ background: "var(--accent)" }} />
          <h1 className="text-2xl font-semibold tracking-tight text-white">Performance Dashboard</h1>
        </div>
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "var(--muted)", maxWidth: "620px" }}
        >
          Forward-tracked model portfolio performance since April 23, 2026. Trades are logged from
          published weekly briefs and monitored using rules-based target/stop logic.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { label: "Live Tracking", dot: true },
            { label: "Model Portfolio", dot: false },
            { label: "Updated Weekly", dot: false },
          ].map(({ label, dot }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              {dot && (
                <span
                  className="w-1.5 h-1.5 rounded-full pulse-dot"
                  style={{ background: "var(--bull)", flexShrink: 0 }}
                />
              )}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {kpiCards.map(({ label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-xl p-4 flex flex-col gap-1"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              {label}
            </div>
            <div className="text-xl font-mono font-semibold tabular-nums leading-tight" style={{ color }}>
              {value}
            </div>
            <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* ── Equity Curve ───────────────────────────────────────────────────── */}
      <div className="mb-8">
        <EquityCurveChart callHistory={callHistory} />
      </div>

      {/* ── Live Open Trades ───────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-base font-semibold text-white tracking-tight">Live Open Trades</h2>
          <span
            className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e" }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#22c55e", flexShrink: 0 }} />
            LIVE
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            {openTrades.length} position{openTrades.length !== 1 ? "s" : ""} tracked
          </span>
        </div>

        {openTrades.length === 0 ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>No open positions at this time.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openTrades.map((trade) => {
              const convColor =
                trade.conviction === "HIGH" ? "#d4922a" :
                trade.conviction === "MEDIUM" ? "#94a3b8" : "#6b6b6b";
              const hasUnrealized = trade.unrealizedR !== undefined;
              const unrealizedPositive = (trade.unrealizedR ?? 0) >= 0;

              return (
                <div
                  key={trade.id}
                  className="rounded-xl overflow-hidden"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  {/* Card Header */}
                  <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                      >
                        <span className="w-1 h-1 rounded-full pulse-dot" style={{ background: "#22c55e" }} />
                        OPEN
                      </span>
                      <span className="text-[9px] font-mono tracking-wider" style={{ color: "var(--muted)" }}>
                        {trade.openedDate}
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded"
                      style={{ background: `${convColor}18`, color: convColor, border: `1px solid ${convColor}30` }}
                    >
                      {trade.conviction} CONV
                    </span>
                  </div>

                  {/* Title + Hero Metric */}
                  <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white mb-0.5">{trade.title}</div>
                      <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                        {trade.daysOpen} day{trade.daysOpen !== 1 ? "s" : ""} open · Size {trade.sizeR}R
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {hasUnrealized ? (
                        <>
                          <div
                            className="text-2xl font-mono font-bold tabular-nums leading-none"
                            style={{ color: unrealizedPositive ? "var(--bull)" : "var(--bear)" }}
                          >
                            {unrealizedPositive ? "+" : ""}{trade.unrealizedR}R
                          </div>
                          <div className="text-[9px] font-mono mt-0.5" style={{ color: "var(--muted)" }}>unrealized</div>
                        </>
                      ) : trade.premiumDecay !== undefined ? (
                        <>
                          <div
                            className="text-2xl font-mono font-bold tabular-nums leading-none"
                            style={{ color: "var(--bull)" }}
                          >
                            +{trade.premiumDecay}%
                          </div>
                          <div className="text-[9px] font-mono mt-0.5" style={{ color: "var(--muted)" }}>premium decay</div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {/* Entry / Current row */}
                  <div
                    className="grid grid-cols-2 gap-px mx-5 mb-4 overflow-hidden rounded-lg"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    {[
                      { label: "ENTRY", value: trade.entry },
                      { label: "CURRENT", value: trade.current },
                    ].map(({ label, value }) => (
                      <div key={label} className="px-3 py-2.5" style={{ background: "rgba(255,255,255,0.02)" }}>
                        <div className="text-[9px] font-mono tracking-widest mb-1" style={{ color: "var(--muted)" }}>{label}</div>
                        <div className="text-sm font-mono font-semibold text-white tabular-nums">{value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Target / Stop footer */}
                  <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.01)" }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>TARGET</span>
                      <span className="text-xs font-mono font-medium" style={{ color: "var(--bull)" }}>{trade.target}</span>
                    </div>
                    <div className="w-px h-3" style={{ background: "var(--border)" }} />
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>STOP</span>
                      <span className="text-xs font-mono font-medium" style={{ color: "var(--bear)" }}>{trade.stop}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Trade History ───────────────────────────────────────────────────── */}
      <div className="mb-8">
        <SectionHeader title="Trade History" subtitle="Closed positions" />
        {closedTrades.length === 0 ? (
          <div
            className="rounded-xl p-6"
            style={{ background: "var(--card)", border: "1px solid rgba(251,191,36,0.18)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)" }}
              >
                <span className="text-[10px]" style={{ color: "#fbbf24" }}>!</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1.5">No closed trades on record yet</div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--muted)", maxWidth: "520px" }}>
                  Trade history will begin populating from the week of <span className="text-white font-mono">April 28, 2026</span>.
                  The currently open positions were initiated after the previous weekly brief&apos;s tracked time horizon
                  had already elapsed — they will not be included in closed-trade historical statistics.
                </p>
                <div
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded"
                  style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.15)", color: "#fbbf24" }}
                >
                  Tracking begins: Week of Apr 28, 2026
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["#", "TRADE", "CONVICTION", "SIZE", "ENTRY", "EXIT", "R", "OPENED", "CLOSED", "NOTES"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                      style={{ color: "var(--muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {closedTrades.map((trade, i) => {
                  const isWin = trade.outcome === "WIN";
                  const isLoss = trade.outcome === "LOSS";
                  const outcomeColor = isWin ? "var(--bull)" : isLoss ? "var(--bear)" : "var(--muted)";
                  const outcomeBg = isWin ? "rgba(34,197,94,0.1)" : isLoss ? "rgba(239,68,68,0.1)" : "rgba(148,163,184,0.08)";
                  return (
                    <tr
                      key={trade.id}
                      className="hover:bg-white/[0.02] transition-colors"
                      style={{ borderBottom: i < closedTrades.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                    >
                      <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{i + 1}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-white">{trade.title}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--muted)" }}>{trade.conviction}</td>
                      <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{trade.sizeR}R</td>
                      <td className="px-4 py-3 text-xs font-mono tabular-nums text-white">{trade.entry}</td>
                      <td className="px-4 py-3 text-xs font-mono tabular-nums text-white">{trade.exit}</td>
                      <td
                        className="px-4 py-3 text-xs font-mono tabular-nums font-semibold"
                        style={{ color: outcomeColor }}
                      >
                        <span
                          className="px-2 py-0.5 rounded"
                          style={{ background: outcomeBg, border: `1px solid ${outcomeColor}33` }}
                        >
                          {trade.realizedR >= 0 ? "+" : ""}{trade.realizedR}R
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--muted)" }}>{trade.openedDate}</td>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: "var(--muted)" }}>{trade.closedDate}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted)" }}>{trade.notes ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Sections 6 & 7: Strategy + Conviction side-by-side ────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">

        {/* Strategy Breakdown */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Card header */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="text-sm font-semibold text-white">Performance by Strategy</div>
            <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
              {strategyBreakdown.reduce((s, r) => s + r.trades, 0)} trades
            </div>
          </div>
          {/* Column labels */}
          <div className="grid grid-cols-4 px-5 pt-3 pb-1.5">
            {["STRATEGY", "TRADES", "WIN RATE", "AVG R"].map((h) => (
              <div key={h} className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>{h}</div>
            ))}
          </div>
          {/* Rows */}
          {strategyBreakdown.map((row, i) => {
            const barColor = row.winRate >= 70 ? "var(--bull)" : row.winRate >= 55 ? "var(--accent)" : "var(--bear)";
            const rColor = row.avgR >= 0 ? "var(--bull)" : "var(--bear)";
            const isLast = i === strategyBreakdown.length - 1;
            return (
              <div
                key={row.strategy}
                className="grid grid-cols-4 items-center px-5 py-3 hover:bg-white/[0.015] transition-colors"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginBottom: isLast ? "4px" : 0 }}
              >
                <div className="text-xs font-mono text-white">{row.strategy}</div>
                <div className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{row.trades}</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 max-w-[48px] h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${row.winRate}%`, background: barColor }} />
                  </div>
                  <span className="text-xs font-mono tabular-nums font-medium" style={{ color: barColor }}>{row.winRate}%</span>
                </div>
                <div className="text-xs font-mono tabular-nums font-semibold" style={{ color: rColor }}>
                  {row.avgR >= 0 ? "+" : ""}{row.avgR}R
                </div>
              </div>
            );
          })}
        </div>

        {/* Conviction Analysis */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {/* Card header */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="text-sm font-semibold text-white">Signal Quality by Conviction</div>
            <div className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
              {convictionStats.reduce((s, r) => s + r.trades, 0)} trades
            </div>
          </div>
          {/* Column labels */}
          <div className="grid grid-cols-3 px-5 pt-3 pb-1.5">
            {["CONVICTION", "TRADES", "WIN RATE"].map((h) => (
              <div key={h} className="text-[9px] font-mono tracking-widest" style={{ color: "var(--muted)" }}>{h}</div>
            ))}
          </div>
          {/* Rows */}
          {convictionStats.map((row, i) => {
            const convColor =
              row.conviction === "HIGH"   ? "#d4922a" :
              row.conviction === "MEDIUM" ? "#94a3b8" : "#6b6b6b";
            const barColor = row.winRate >= 70 ? "var(--bull)" : row.winRate >= 55 ? "var(--accent)" : "var(--bear)";
            const isLast = i === convictionStats.length - 1;
            return (
              <div
                key={row.conviction}
                className="grid grid-cols-3 items-center px-5 py-3 hover:bg-white/[0.015] transition-colors"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginBottom: isLast ? "4px" : 0 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: convColor }} />
                  <span
                    className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded"
                    style={{ background: `${convColor}15`, color: convColor, border: `1px solid ${convColor}25` }}
                  >
                    {row.conviction}
                  </span>
                </div>
                <div className="text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>{row.trades}</div>
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 max-w-[48px] h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${row.winRate}%`, background: barColor }} />
                  </div>
                  <span className="text-xs font-mono tabular-nums font-medium" style={{ color: barColor }}>{row.winRate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 8: Risk Metrics ─────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-base font-semibold text-white tracking-tight">Risk Metrics</h2>
          <div
            className="text-[9px] font-mono px-2 py-0.5 rounded tracking-wider"
            style={{ background: "rgba(148,163,184,0.08)", border: "1px solid var(--border)", color: "var(--muted)" }}
          >
            MVP
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
          {[
            { label: "Avg Win",        value: `+${metrics.avgWinR}R`,   color: "var(--bull)" },
            { label: "Avg Loss",       value: `${metrics.avgLossR}R`,   color: "var(--bear)" },
            { label: "Largest Win",    value: `+${metrics.largestWinR}R`, color: "var(--bull)" },
            { label: "Largest Loss",   value: `${metrics.largestLossR}R`, color: "var(--bear)" },
            { label: "Current Exposure", value: `${currentExposureR}R`, color: "var(--accent)" },
            { label: "Profit Factor",  value: "—",                       color: "var(--muted)", note: "Coming soon" },
          ].map(({ label, value, color, note }) => (
            <div
              key={label}
              className="rounded-xl p-4 flex flex-col gap-1"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--muted)" }}>
                {label}
              </div>
              <div className="text-xl font-mono font-semibold tabular-nums leading-tight" style={{ color }}>
                {value}
              </div>
              {note && (
                <div className="text-[9px] font-mono" style={{ color: "var(--muted)" }}>{note}</div>
              )}
            </div>
          ))}
        </div>

        {/* R explanation */}
        <div
          className="rounded-xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-5 h-5 rounded flex items-center justify-center shrink-0 font-mono text-[10px] font-bold"
              style={{ background: "rgba(212,146,42,0.15)", color: "var(--accent)", border: "1px solid rgba(212,146,42,0.25)" }}
            >
              R
            </div>
            <span className="text-xs font-mono font-semibold text-white tracking-wider">HOW R-MULTIPLES ARE CALCULATED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                <span className="text-white font-mono font-medium">Risk (1R)</span> is the maximum loss you are willing to take on a trade, determined at entry using the stop-loss level.
              </p>
              <div
                className="px-3 py-2 rounded font-mono text-xs mb-3"
                style={{ background: "rgba(212,146,42,0.07)", border: "1px solid rgba(212,146,42,0.18)", color: "var(--accent)" }}
              >
                Risk (1R) = |Stop Price − Entry Price|
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                <span className="text-white font-mono font-medium">Reward</span> is the realized or target price movement in favor of the trade, measured from entry to exit (or target).
              </p>
              <div
                className="px-3 py-2 rounded font-mono text-xs mb-3"
                style={{ background: "rgba(212,146,42,0.07)", border: "1px solid rgba(212,146,42,0.18)", color: "var(--accent)" }}
              >
                Reward = |Entry Price − Exit Price|
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                The <span className="text-white font-mono font-medium">R-multiple</span> expresses performance as a ratio of reward to risk:
              </p>
              <div
                className="px-3 py-2 rounded font-mono text-xs"
                style={{ background: "rgba(212,146,42,0.07)", border: "1px solid rgba(212,146,42,0.18)", color: "var(--accent)" }}
              >
                R = Reward / Risk
              </div>
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-wider mb-2" style={{ color: "var(--muted)" }}>R-MULTIPLE QUALITY SCALE</p>
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                {[
                  { range: "< 0.5R",    quality: "Poor",      note: "Not worth the risk",               color: "#ef4444", icon: "✕" },
                  { range: "0.5 – 1.0R", quality: "Low",      note: "Acceptable only if high probability", color: "#f97316", icon: "△" },
                  { range: "1.0 – 1.5R", quality: "Decent",   note: "Standard trade",                   color: "#eab308", icon: "○" },
                  { range: "1.5 – 2.5R", quality: "Good",     note: "Strong setup",                     color: "#22c55e", icon: "✓" },
                  { range: "2.5 – 4.0R", quality: "Excellent",note: "High-quality asymmetric trade",    color: "#22c55e", icon: "★" },
                  { range: "4R+",        quality: "Elite",     note: "Rare, exceptional asymmetry",      color: "#818cf8", icon: "⭑" },
                ].map((row, i) => (
                  <div
                    key={row.range}
                    className="grid px-3 py-2 text-xs font-mono"
                    style={{
                      gridTemplateColumns: "80px 72px 1fr",
                      gap: "8px",
                      borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                  >
                    <span style={{ color: row.color }}>{row.range}</span>
                    <span style={{ color: row.color }}>{row.icon} {row.quality}</span>
                    <span style={{ color: "var(--muted)" }}>{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="text-[10px] font-mono pt-3"
            style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
          >
            <span className="text-white font-medium">1R = 1% of portfolio.</span>
            {" "}All position sizes and returns are expressed in R-multiples. 1R represents the fixed risk unit per trade (1% of total portfolio equity).
          </div>
        </div>

        {/* Position Sizing */}
        <div
          className="rounded-xl p-5 mt-4"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-5 h-5 rounded flex items-center justify-center shrink-0 font-mono text-[10px] font-bold"
              style={{ background: "rgba(212,146,42,0.15)", color: "var(--accent)", border: "1px solid rgba(212,146,42,0.25)" }}
            >
              %
            </div>
            <span className="text-xs font-mono font-semibold text-white tracking-wider">POSITION SIZING BY CONVICTION</span>
          </div>
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            {[
              { conviction: "High",             size: "1.0R",   pct: "1.00%",  color: "#d4922a" },
              { conviction: "High–Medium",       size: "0.75R",  pct: "0.75%",  color: "#a78bfa" },
              { conviction: "Medium",            size: "0.5R",   pct: "0.50%",  color: "#94a3b8" },
              { conviction: "Low–Medium",        size: "0.25R",  pct: "0.25%",  color: "#6b7280" },
            ].map((row, i) => (
              <div
                key={row.conviction}
                className="grid items-center px-4 py-3 text-xs font-mono"
                style={{
                  gridTemplateColumns: "1fr 80px 80px",
                  borderTop: i > 0 ? "1px solid var(--border)" : undefined,
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                }}
              >
                <span style={{ color: row.color }}>{row.conviction} Conviction</span>
                <span className="font-bold" style={{ color: row.color }}>{row.size}</span>
                <span style={{ color: "var(--muted)" }}>{row.pct} of portfolio</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Direction Breakdown ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>BULLISH CALLS</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "var(--bull)" }}>
            {metrics.bullishWinRate}%
          </div>
          <div className="text-xs font-mono mb-3" style={{ color: "var(--muted)" }}>{metrics.bullishCalls} calls tracked</div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${metrics.bullishWinRate}%`, background: "var(--bull)" }} />
          </div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>BEARISH CALLS</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "var(--bear)" }}>
            {metrics.bearishWinRate}%
          </div>
          <div className="text-xs font-mono mb-3" style={{ color: "var(--muted)" }}>{metrics.bearishCalls} calls tracked</div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${metrics.bearishWinRate}%`, background: "var(--bear)" }} />
          </div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ background: "var(--card)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <div className="text-xs font-mono tracking-wider mb-3" style={{ color: "var(--muted)" }}>DIVERGENT REGIME</div>
          <div className="text-3xl font-mono font-bold tabular-nums mb-1" style={{ color: "#fbbf24" }}>
            {metrics.divergentRegimeWinRate}%
          </div>
          <div className="text-xs font-mono mb-3" style={{ color: "var(--muted)" }}>Flagged divergence weeks</div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${metrics.divergentRegimeWinRate}%`, background: "#fbbf24" }} />
          </div>
        </div>
      </div>

      {/* ── Trade Log ──────────────────────────────────────────────────────── */}
      <div>
        <SectionHeader title="Trade Log" subtitle="Weekly directional calls" />

        <div
          className="rounded-xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["#", "WEEK", "CALL", "OUTCOME", "R", "WTI Δ", "NOTES"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-mono tracking-wider"
                    style={{ color: "var(--muted)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {callHistory.map((record, i) => {
                const isWin = record.outcome === "WIN";
                const isLoss = record.outcome === "LOSS";
                const isOpen = record.outcome === "OPEN";
                const outcomeColor = isWin ? "var(--bull)" : isLoss ? "var(--bear)" : isOpen ? "var(--accent)" : "var(--neutral)";
                const outcomeBg = isWin ? "rgba(34,197,94,0.1)" : isLoss ? "rgba(239,68,68,0.1)" : isOpen ? "rgba(212,146,42,0.1)" : "rgba(148,163,184,0.08)";
                const rColor = record.rValue > 0 ? "var(--bull)" : record.rValue < 0 ? "var(--bear)" : "var(--muted)";

                return (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors"
                    style={{ borderBottom: i < callHistory.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <td className="px-4 py-3 text-xs font-mono tabular-nums" style={{ color: "var(--muted)" }}>
                      {callHistory.length - i}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-white">{record.weekEnding}</td>
                    <td className="px-4 py-3">
                      <SignalBadge direction={getBiasColor(record.call)} label={getBiasLabel(record.call)} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: outcomeBg, color: outcomeColor, border: `1px solid ${outcomeColor}33` }}
                      >
                        {record.outcome}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono tabular-nums font-semibold" style={{ color: rColor }}>
                      {isOpen ? "—" : `${record.rValue > 0 ? "+" : ""}${record.rValue}R`}
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-mono tabular-nums"
                      style={{ color: isOpen ? "var(--muted)" : record.wtiReturn >= 0 ? "var(--bull)" : "var(--bear)" }}
                    >
                      {isOpen ? "—" : `${record.wtiReturn >= 0 ? "+" : ""}${record.wtiReturn.toFixed(2)}/bbl`}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--muted)" }}>{record.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
