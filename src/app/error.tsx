"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary-black-950 px-4">
      <div className="text-center max-w-lg">
        <p
          className="font-heading text-primary-gold text-xs font-bold uppercase mb-4"
          style={{ letterSpacing: "0.3em" }}
        >
          Something Went Wrong
        </p>
        <h1 className="font-heading font-bold text-white text-4xl md:text-5xl mb-4">
          Unexpected Error
        </h1>
        <p className="text-primary-black-300 font-body text-lg leading-relaxed mb-10">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-primary-gold text-primary-black-900 px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-primary-gold-400"
          style={{
            clipPath:
              "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
          }}
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
