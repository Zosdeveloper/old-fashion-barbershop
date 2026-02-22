import Link from "next/link";
import { SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary-black-950 px-4">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-lg">
        <p
          className="font-heading text-primary-gold text-xs font-bold uppercase mb-4"
          style={{ letterSpacing: "0.3em" }}
        >
          Page Not Found
        </p>

        <h1 className="font-heading font-bold text-white text-6xl md:text-7xl mb-4">
          404
        </h1>

        <p className="text-primary-black-300 font-body text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist. Head back to{" "}
          {SITE_CONFIG.name} and find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-primary-gold text-primary-black-900 px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-primary-gold-400"
            style={{
              clipPath:
                "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
            }}
          >
            Back to Home
          </Link>
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-primary-gold text-primary-gold px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-primary-gold hover:text-primary-black-900"
            style={{
              clipPath:
                "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
            }}
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
