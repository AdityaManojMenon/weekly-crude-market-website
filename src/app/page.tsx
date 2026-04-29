import Link from "next/link";
import Image from "next/image";
import { briefs, getBiasLabel, getBiasColor } from "@/data/briefs";
import {
  FileText, TrendingUp, LineChart, FlaskConical, BarChart2, ArrowRight,
} from "lucide-react";

const screenshots = [
  {
    src: "/screenshots/brief-overview.png",
    label: "Weekly Brief",
    caption: "EIA signals, regime classification, and directional bias",
  },
  {
    src: "/screenshots/signal-dashboard.png",
    label: "Signal Dashboard",
    caption: "Curve structure, crack spreads & volatility monitor",
  },
  {
    src: "/screenshots/brent-wti-spread.png",
    label: "Brent–WTI Spread",
    caption: "Benchmark differential, grade dislocations, and export dynamics",
  },
  {
    src: "/screenshots/performance-tracker.png",
    label: "Performance Tracker",
    caption: "R-based equity curve and open position cards",
  },
  {
    src: "/screenshots/trade-framework.png",
    label: "Trade Framework",
    caption: "Entry, target, stop and conviction-weighted sizing",
  },
  {
    src: "/screenshots/forecast.png",
    label: "Forecast Beta",
    caption: "Inventory build/draw estimates before EIA release",
  },
  {
    src: "/screenshots/arb.png",
    label: "Arb Beta",
    caption: "Physical route economics and benchmark spread analysis",
  },
];

const modules = [
  { icon: FileText,    title: "Weekly Briefs",   sub: "EIA + market signals + scenarios",   href: "/brief",       status: "LIVE", statusColor: "#22c55e", statusBg: "rgba(34,197,94,0.07)",   statusBorder: "rgba(34,197,94,0.18)"  },
  { icon: TrendingUp,  title: "Relative Value",  sub: "Brent-WTI, curve structure, cracks", href: "/brief",       status: "LIVE", statusColor: "#22c55e", statusBg: "rgba(34,197,94,0.07)",   statusBorder: "rgba(34,197,94,0.18)"  },
  { icon: LineChart,   title: "Performance",     sub: "Rules-based trade tracking",         href: "/performance", status: "LIVE", statusColor: "#22c55e", statusBg: "rgba(34,197,94,0.07)",   statusBorder: "rgba(34,197,94,0.18)"  },
  { icon: FlaskConical,title: "Forecast",        sub: "Inventory build/draw estimates",     href: "/forecast",    status: "BETA", statusColor: "#818cf8", statusBg: "rgba(99,102,241,0.07)",  statusBorder: "rgba(99,102,241,0.18)" },
  { icon: BarChart2,   title: "Arb",             sub: "Physical route economics",           href: "/arb",         status: "BETA", statusColor: "#818cf8", statusBg: "rgba(99,102,241,0.07)",  statusBorder: "rgba(99,102,241,0.18)" },
];

const differentiators = [
  { num: "01", title: "Market Data",           desc: "EIA, futures, COT, OVX, crack spreads — processed weekly from primary sources." },
  { num: "02", title: "Domain Expertise",      desc: "Commodity analyst framework applied systematically to every publication." },
  { num: "03", title: "Systematic Frameworks", desc: "Weighted signal engine with regime classification and conflict detection." },
  { num: "04", title: "Transparent Tracking",  desc: "Every call logged. R-based performance metrics. No retroactive changes." },
  { num: "05", title: "Polished Presentation", desc: "Institutional-quality output structured for clarity, not volume." },
];

export default function LandingPage() {
  const brief = briefs[0];
  const biasDir = getBiasColor(brief.bias);
  const biasLabel = getBiasLabel(brief.bias);
  const biasColor = biasDir === "bull" ? "#22c55e" : biasDir === "bear" ? "#ef4444" : "#94a3b8";

  return (
    <div style={{ background: "#080808", color: "#f0f0f0", minHeight: "100vh" }}>

      {/* ── LANDING HEADER ──────────────────────────────────────────────────── */}
      <header style={{ borderBottom: "1px solid #161616" }}>
        <div className="flex items-center justify-between px-8 py-5 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-white" style={{ letterSpacing: "-0.02em" }}>CrudeQ</span>
            <div className="h-3 w-px" style={{ background: "#222" }} />
            <span className="text-[10px] font-mono tracking-widest" style={{ color: "#444" }}>
              CRUDE MARKET INTELLIGENCE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest"
              style={{ color: "#22c55e" }}
            >
              <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#22c55e" }} />
              LIVE
            </span>
            <Link
              href="/brief"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider transition-colors hover:text-white"
              style={{ color: "#555" }}
            >
              ENTER PLATFORM
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-between px-8 overflow-hidden"
        style={{
          minHeight: "calc(100vh - 57px)",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "100% 64px",
        }}
      >
        {/* Radial vignette — darkens the grid at edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #080808 100%)",
          }}
        />

        {/* Left edge amber glow */}
        <div
          className="pointer-events-none absolute left-0 top-1/4 w-px"
          style={{ height: "50%", background: "linear-gradient(to bottom, transparent, rgba(212,146,42,0.4), transparent)" }}
        />

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-screen-xl mx-auto w-full pt-20 pb-10">

          {/* Overline */}
          <div className="reveal reveal-1 flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: "var(--accent)" }} />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
              Where Raw Oil Data Becomes Actionable Market Insight — Est. March 2026
            </span>
          </div>

          {/* Wordmark */}
          <h1
            className="reveal reveal-2 font-bold text-white leading-none"
            style={{
              fontSize: "clamp(5.5rem, 15vw, 13rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.88,
            }}
          >
            CrudeQ
          </h1>

          {/* Tagline + CTA */}
          <div className="reveal reveal-3 mt-10 flex flex-col sm:flex-row sm:items-end gap-10 max-w-4xl">
            <p
              className="text-base sm:text-lg leading-relaxed max-w-md"
              style={{ color: "#555", fontWeight: 400 }}
            >
              Turning EIA data, futures structure, volatility, and positioning
              into analyst-grade weekly market intelligence.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ background: "var(--accent)", color: "#0a0a0a" }}
              >
                View Current Brief
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm transition-colors hover:text-white"
                style={{ border: "1px solid #1e1e1e", color: "#444" }}
              >
                Methodology
              </Link>
            </div>
          </div>
        </div>

        {/* Bloomberg-style data terminal strip */}
        <div
          className="reveal reveal-4 relative z-10 w-full max-w-screen-xl mx-auto"
          style={{ borderTop: "1px solid #161616" }}
        >
          <div className="flex items-stretch flex-wrap gap-x-8 gap-y-2"  >
            {[
              { label: "WEEK ENDING",    value: brief.weekEnding,                    mono: true  },
              { label: "WTI AT PUBLISH", value: `$${brief.wtiPriceAtPublish}`,       mono: true  },
              { label: "WTI WK CHANGE",  value: `${brief.wtiWeeklyChange >= 0 ? "+" : ""}${brief.wtiWeeklyChange}`, mono: true, color: brief.wtiWeeklyChange >= 0 ? "#22c55e" : "#ef4444" },
              { label: "BIAS",           value: biasLabel,                           mono: true,  color: biasColor },
              { label: "REGIME",         value: brief.regime.replace(/_/g, " "),     mono: true  },
              { label: "PUBLISHED",      value: brief.publishedDate,                 mono: false },
            ].map(({ label, value, mono, color }) => (
              <div key={label} className="flex flex-col gap-1.5 px-5 py-4 first:pl-0">
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase" style={{ color: "#383838" }}>
                  {label}
                </span>
                <span
                  className={`text-[11px] font-semibold tabular-nums ${mono ? "font-mono" : ""}`}
                  style={{ color: color ?? "#888" }}
                >
                  {value}
                </span>
              </div>
            ))}
            {/* Live indicator on right */}
            <div className="ml-auto flex items-center px-5">
              <span className="text-[9px] font-mono tracking-widest" style={{ color: "#333" }}>
                WEEKLY UPDATE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT EXISTS ───────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #121212", borderBottom: "1px solid #121212" }}>
        <div className="max-w-screen-xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left label column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="h-px w-8 mb-1" style={{ background: "var(--accent)" }} />
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
              The Platform
            </p>
          </div>
          {/* Right content column */}
          <div className="lg:col-span-9">
            <p
              className="text-2xl sm:text-3xl font-semibold text-white leading-snug mb-6"
              style={{ letterSpacing: "-0.02em", maxWidth: "680px" }}
            >
              Built to simulate how professional commodity analysts turn raw market data into tradeable insight.
            </p>
            <p className="text-sm leading-relaxed max-w-xl" style={{ color: "#555" }}>
              CrudeQ applies the same data sources, signal frameworks, and risk discipline used by
              institutional energy desks — published weekly, tracked with full transparency.
              Every call is logged. Every assumption is documented.
            </p>
          </div>
        </div>
      </section>

      {/* ── PLATFORM PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-6 h-px" style={{ background: "var(--accent)" }} />
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
              Platform Preview
            </p>
            <div className="flex-1 h-px" style={{ background: "#1a1a1a" }} />
          </div>

          {/* Top block: Weekly Brief (left, 2-row tall) + Signal Dashboard / Future Curve (right, stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Weekly Brief — spans 2 rows */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden border"
              style={{ borderColor: "#1a1a1a", minHeight: "300px" }}>
              <Image
                src={screenshots[0].src}
                alt={screenshots[0].label}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ filter: "brightness(1.15)" }}
                unoptimized
              />
              <div className="absolute bottom-0 inset-x-0 px-5 py-3 border-t"
                style={{ borderColor: "#1a1a1a", background: "rgba(8,8,8,0.88)" }}>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: "var(--accent)" }}>
                  {screenshots[0].label}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "#666" }}>
                  {screenshots[0].caption}
                </p>
              </div>
            </div>

            {/* Signal Dashboard — top-right */}
            <div className="group relative overflow-hidden border"
              style={{ borderColor: "#1a1a1a", aspectRatio: "16/9" }}>
              <Image
                src={screenshots[1].src}
                alt={screenshots[1].label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ filter: "brightness(1.15)" }}
                unoptimized
              />
              <div className="absolute bottom-0 inset-x-0 px-4 py-2.5 border-t"
                style={{ borderColor: "#1a1a1a", background: "rgba(8,8,8,0.88)" }}>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: "var(--accent)" }}>
                  {screenshots[1].label}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#666" }}>
                  {screenshots[1].caption}
                </p>
              </div>
            </div>

            {/* Future Curve — bottom-right, below Signal Dashboard */}
            <div className="group relative overflow-hidden border"
              style={{ borderColor: "#1a1a1a", aspectRatio: "16/9" }}>
              <Image
                src={screenshots[2].src}
                alt={screenshots[2].label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ filter: "brightness(1.15)" }}
                unoptimized
              />
              <div className="absolute bottom-0 inset-x-0 px-4 py-2.5 border-t"
                style={{ borderColor: "#1a1a1a", background: "rgba(8,8,8,0.88)" }}>
                <p className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: "var(--accent)" }}>
                  {screenshots[2].label}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#666" }}>
                  {screenshots[2].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row: 4 equal columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.slice(3).map((shot, i) => (
              <div key={i} className="group relative overflow-hidden border"
                style={{ borderColor: "#1a1a1a", aspectRatio: "16/10" }}>
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ filter: "brightness(1.15)" }}
                  unoptimized
                />
                <div className="absolute bottom-0 inset-x-0 px-3 py-2 border-t"
                  style={{ borderColor: "#1a1a1a", background: "rgba(8,8,8,0.88)" }}>
                  <p className="text-[10px] font-mono tracking-[0.15em] uppercase" style={{ color: "var(--accent)" }}>
                    {shot.label}
                  </p>
                  <p className="text-[9px] mt-0.5 leading-snug" style={{ color: "#666" }}>
                    {shot.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM MODULES ────────────────────────────────────────────────── */}
      <section className="py-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase shrink-0" style={{ color: "var(--accent)" }}>
              Platform Modules
            </p>
            <div className="h-px flex-1" style={{ background: "#141414" }} />
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: "#141414" }}>
            {modules.map(({ icon: Icon, title, sub, href, status, statusColor, statusBg, statusBorder }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col gap-5 p-6 transition-colors hover:bg-[#0d0d0d]"
                style={{ background: "#080808" }}
              >
                <div className="flex items-start justify-between">
                  <Icon size={16} style={{ color: "#2a2a2a" }} />
                  <span
                    className="text-[9px] font-mono tracking-wider px-1.5 py-0.5"
                    style={{ background: statusBg, border: `1px solid ${statusBorder}`, color: statusColor }}
                  >
                    {status}
                  </span>
                </div>
                <div>
                  <div
                    className="text-sm font-semibold mb-1.5 transition-colors"
                    style={{ color: "#888" }}
                  >
                    {title}
                  </div>
                  <div className="text-[11px] leading-relaxed" style={{ color: "#333" }}>{sub}</div>
                </div>
                <div
                  className="h-px w-0 transition-all duration-300 group-hover:w-full"
                  style={{ background: "var(--accent)", opacity: 0.4 }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT'S DIFFERENT ──────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #121212", borderBottom: "1px solid #121212" }}>
        <div className="max-w-screen-xl mx-auto px-8 py-20">
          <div className="flex items-center gap-4 mb-12">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase shrink-0" style={{ color: "var(--accent)" }}>
              Why It&apos;s Different
            </p>
            <div className="h-px flex-1" style={{ background: "#141414" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: "#141414" }}>
            {differentiators.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col gap-4 px-6 py-8" style={{ background: "#080808" }}>
                <span className="text-[10px] font-mono tabular-nums" style={{ color: "var(--accent)", opacity: 0.7 }}>{num}</span>
                <div className="h-px w-5" style={{ background: "var(--accent)", opacity: 0.25 }} />
                <div>
                  <div className="text-sm font-semibold mb-2" style={{ color: "#777" }}>{title}</div>
                  <div className="text-[11px] leading-relaxed" style={{ color: "#333" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="px-8 py-28">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left */}
          <div className="lg:col-span-8">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-5" style={{ color: "var(--accent)" }}>
              Current Publication
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Explore This Week&apos;s<br />Market View
            </h2>
            <p className="text-sm mb-0 leading-relaxed max-w-lg" style={{ color: "#444" }}>
              {brief.weekEnding} — {brief.headline}
            </p>
          </div>
          {/* Right */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-8">
            <Link
              href="/brief"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "var(--accent)", color: "#0a0a0a" }}
            >
              View Current Brief
              <ArrowRight size={14} />
            </Link>
            <div className="flex items-center gap-8">
              {[
                { label: "WEEKS PUBLISHED", value: String(briefs.length) },
                { label: "DATA SOURCES",    value: "8+" },
                { label: "SINCE",           value: "MAR 2026" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-base font-mono font-bold tabular-nums" style={{ color: "#555" }}>{value}</div>
                  <div className="text-[9px] font-mono tracking-widest mt-0.5" style={{ color: "#2a2a2a" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #121212" }}>
        <div className="max-w-screen-xl mx-auto px-8 py-6 flex items-center justify-between flex-wrap gap-4">
          <span className="text-[10px] font-mono" style={{ color: "#555" }}>
            © 2026 CrudeQ — Independent Research. Not investment advice.
          </span>
          <div className="flex items-center gap-6">
            {[
              { label: "BRIEF",       href: "/brief" },
              { label: "PERFORMANCE", href: "/performance" },
              { label: "METHODOLOGY", href: "/methodology" },
              { label: "CONTACT",     href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[10px] font-mono tracking-widest transition-colors hover:text-white"
                style={{ color: "#555" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
