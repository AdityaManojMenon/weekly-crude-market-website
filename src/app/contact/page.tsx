import { Mail, X, BarChart2 } from "lucide-react";

const links = [
  {
    iconType: "lucide" as const,
    icon: Mail,
    iconText: "",
    label: "Email",
    value: "adhumenon2004@email.com",
    href: "mailto:adhumenon2004@email.com",
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
    border: "rgba(217,119,6,0.2)",
  },
  {
    iconType: "text" as const,
    icon: null,
    iconText: "in",
    label: "LinkedIn",
    value: "adityamanojmenon",
    href: "https://www.linkedin.com/in/adityamanojmenon/",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    iconType: "lucide" as const,
    icon: X,
    iconText: "",
    label: "X / Twitter",
    value: "@AMFitt",
    href: "https://x.com/AMFitt",
    color: "#e2e8f0",
    bg: "rgba(226,232,240,0.06)",
    border: "rgba(226,232,240,0.12)",
  },
];

const openTo = [
  "Hiring opportunities",
  "Research collaboration",
  "Consulting",
  "Media / podcast guest",
  "Dashboard builds",
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
          Macro & Flow
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Contact</h1>
        <div className="h-px w-12 mb-5" style={{ background: "var(--accent)" }} />
        <p className="text-sm leading-relaxed" style={{ color: "#9a9a9a" }}>
          Interested in custom commodity dashboards, analytics consulting, or collaboration
          opportunities? Get in touch.
        </p>
      </div>

      {/* Personal Brand Box */}
      <div className="rounded-xl p-5 mb-4 flex items-start gap-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

        {/* Photo */}
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden"
            style={{ border: "2px solid var(--border)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/face.jpeg"
              alt="Aditya Manoj Menon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-white mb-0.5">Aditya Manoj Menon</p>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--accent)" }}>
            Founder, Macro & Flow
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            Data Engineering × Energy Intelligence × Market Analytics
          </p>

          {/* Open to */}
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-2"
              style={{ color: "var(--muted)", letterSpacing: "0.1em" }}>
              Open To
            </p>
            <div className="flex flex-wrap gap-1.5">
              {openTo.map((item) => (
                <span key={item}
                  className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(212,146,42,0.08)",
                    border: "1px solid rgba(212,146,42,0.2)",
                    color: "var(--accent)",
                  }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* General Inquiries card */}
      <div className="rounded-xl p-5 mb-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex gap-3 mb-4 items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: "rgba(212,146,42,0.1)", border: "1px solid rgba(212,146,42,0.2)" }}>
            <BarChart2 size={14} style={{ color: "var(--accent)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">General Inquiries</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Feedback · Partnerships · Collaborations · Custom Analytics
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {links.map(({ iconType, icon: Icon, iconText, label, value, href, color, bg, border }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3 transition-opacity hover:opacity-80"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-md shrink-0"
                style={{ background: "rgba(0,0,0,0.2)" }}>
                {iconType === "lucide" && Icon
                  ? <Icon size={13} style={{ color }} />
                  : <span className="text-xs font-bold" style={{ color }}>{iconText}</span>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}>{label}</p>
                <p className="text-xs font-semibold truncate" style={{ color }}>{value}</p>
              </div>
              <span className="text-xs font-mono shrink-0" style={{ color: "var(--muted)" }}>→</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-center font-mono" style={{ color: "var(--muted)" }}>
        All inquiries typically responded to within 48 hours.
      </p>
    </div>
  );
}
