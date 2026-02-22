import {
  SITE_CONFIG,
  BUSINESS_INFO,
  SOCIAL_LINKS,
  NAV_ITEMS,
} from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-black-950 overflow-hidden">
      {/* ─── Decorative top border: double gold rules ─── */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-gold/40 to-transparent" />
        <div className="h-px mt-1 bg-gradient-to-r from-transparent via-primary-gold/15 to-transparent" />
      </div>

      {/* ─── Ambient warm glow from top ─── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "50%",
          height: "1px",
          boxShadow: "0 0 120px 60px rgba(212,175,55,0.06)",
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════
          INFO GRID — Editorial three-column layout
          ═══════════════════════════════════════════════════ */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8">
          {/* ── Visit Us ── */}
          <div className="text-center md:text-left">
            <p
              className="font-heading text-xs font-bold text-primary-gold uppercase mb-6"
              style={{ letterSpacing: "0.25em" }}
            >
              Visit Us
            </p>

            <p className="font-body text-primary-black-200 text-lg leading-relaxed mb-2">
              {BUSINESS_INFO.address.street}
            </p>
            <p className="font-body text-primary-black-400 text-base mb-6">
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
              {BUSINESS_INFO.address.zip}
            </p>

            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-block font-body text-primary-black-200 text-lg hover:text-primary-gold transition-colors duration-300"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>

          {/* ── Hours ── */}
          <div className="text-center">
            <p
              className="font-heading text-xs font-bold text-primary-gold uppercase mb-6"
              style={{ letterSpacing: "0.25em" }}
            >
              Hours
            </p>

            <div className="inline-block text-left">
              {BUSINESS_INFO.hours.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between gap-8 py-1.5 font-body text-sm"
                >
                  <span className="text-primary-black-400">{h.day}</span>
                  <span className="text-primary-black-200 text-right">
                    {h.open === "Closed"
                      ? "Closed"
                      : "reopen" in h
                      ? `${h.open}\u2013${h.close}, ${h.reopen}\u2013${h.reclose}`
                      : `${h.open}\u2013${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Connect ── */}
          <div className="text-center md:text-right">
            <p
              className="font-heading text-xs font-bold text-primary-gold uppercase mb-6"
              style={{ letterSpacing: "0.25em" }}
            >
              Connect
            </p>

            <nav className="space-y-3 mb-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block font-body text-primary-black-300 text-base hover:text-primary-gold transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-body text-primary-black-300 text-sm hover:text-primary-gold transition-colors duration-300"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span style={{ letterSpacing: "0.15em" }}>@oldfashionbarbershop</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar ─── */}
      <div className="border-t border-primary-black-800/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-primary-black-600 text-xs">
              &copy; {year} {SITE_CONFIG.name}
            </p>
            <p
              className="font-body text-primary-black-700 uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.25em" }}
            >
              Naples, Florida &middot; Est. MMXX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
