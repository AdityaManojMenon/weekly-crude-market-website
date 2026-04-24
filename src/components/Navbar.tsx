"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "BRIEF", href: "/", beta: false },
  { label: "ARB", href: "/arb", beta: true },
  { label: "FORECAST", href: "/forecast", beta: true },
  { label: "ARCHIVE", href: "/archive", beta: false },
  { label: "PERFORMANCE", href: "/performance", beta: false },
  { label: "METHODOLOGY", href: "/methodology", beta: false },
  { label: "CONTACT", href: "/contact", beta: false },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "rgba(10,10,10,0.96)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full pulse-dot" style={{ background: "var(--accent)" }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent)" }}>LIVE</span>
          </div>
          <div className="h-4 w-px" style={{ background: "var(--border)" }} />
          <span className="text-sm font-semibold tracking-tight text-white">WTI MACRO & FLOW</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-1.5 text-xs font-mono tracking-widest transition-all rounded flex items-center gap-1.5"
                style={{
                  color: active ? "var(--accent)" : "var(--muted)",
                  background: active ? "rgba(212,146,42,0.08)" : "transparent",
                  borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
                }}
              >
                {item.label}
                {item.beta && (
                  <span
                    className="text-[9px] font-mono tracking-wider px-1 py-0.5 rounded"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", lineHeight: 1 }}
                  >
                    BETA
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            EIA WPSR TRACKER
          </span>
        </div>
      </div>
    </header>
  );
}
