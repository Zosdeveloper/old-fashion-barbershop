import Image from "next/image";
import { SITE_CONFIG, BUSINESS_INFO, SOCIAL_LINKS, NAV_ITEMS, BOOKSY_URL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-black-950 overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-gold/30 to-transparent" />

      {/* Ambient warm glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] opacity-40"
        style={{
          boxShadow: "0 0 80px 40px rgba(212,175,55,0.08)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column — larger presence */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                width={48}
                height={46}
                className="w-12 h-auto"
              />
              <span className="font-heading text-2xl font-bold text-white">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-primary-black-400 font-body text-base leading-relaxed max-w-sm mb-6">
              {SITE_CONFIG.tagline}. Premium barbershop in the heart of{" "}
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} — where every
              cut is a craft and every visit, a ritual.
            </p>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary-gold text-primary-black-900 text-sm font-body font-semibold uppercase tracking-wider rounded-sm hover:bg-primary-gold-400 transition-colors duration-300 gold-glow"
            >
              Book Your Appointment
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-primary-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
              Navigate
            </h4>
            <nav className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-primary-black-300 font-body text-sm hover:text-primary-gold transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-primary-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm font-body">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`}
                className="block text-primary-black-300 hover:text-primary-gold transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-primary-black-400 leading-relaxed">
                {BUSINESS_INFO.address.street}
                <br />
                {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
                {BUSINESS_INFO.address.zip}
              </p>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-black-300 hover:text-primary-gold transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <h4 className="text-primary-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
              Hours
            </h4>
            <div className="space-y-1.5 text-xs font-body">
              {BUSINESS_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-3">
                  <span className="text-primary-black-500">{h.day.slice(0, 3)}</span>
                  <span className="text-primary-black-300">
                    {h.open === "Closed"
                      ? "Closed"
                      : "reopen" in h
                      ? `${h.open}–${h.close}, ${h.reopen}–${h.reclose}`
                      : `${h.open}–${h.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-primary-black-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-black-600 font-body text-xs">
              &copy; {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-primary-black-700 font-body text-[10px] uppercase tracking-wider">
              Precision Grooming &middot; Naples, FL
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
