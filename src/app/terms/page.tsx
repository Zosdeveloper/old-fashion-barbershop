import type { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${SITE_CONFIG.name}. Our policies on appointments, cancellations, and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-primary-black-950 min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em] mb-3">
          Legal
        </p>
        <h1 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-primary-black-500 font-body text-sm mb-12">
          Last updated: February 2026
        </p>

        <div className="space-y-8 text-primary-black-300 font-body text-base leading-relaxed">
          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Appointments & Walk-Ins</h2>
            <p>
              We welcome both walk-ins and scheduled appointments. Appointments can be
              booked through Booksy. While we do our best to accommodate walk-ins,
              scheduled appointments take priority. We recommend booking ahead,
              especially on Saturdays.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Cancellations & No-Shows</h2>
            <p>
              We ask that you provide at least 2 hours&apos; notice if you need to cancel
              or reschedule. Repeated no-shows may result in being required to prepay
              for future appointments.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Services & Pricing</h2>
            <p>
              All service descriptions and durations are approximate. Final pricing
              may vary based on hair length, complexity, and additional services
              requested. Your barber will confirm pricing before beginning any service.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Payment</h2>
            <p>
              We accept all major credit and debit cards, Apple Pay, Google Pay, and
              cash. Tips can be added to card payments or given directly to your barber.
              Payment is due at the time of service.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Age Policy</h2>
            <p>
              Clients under 16 must be accompanied by a parent or guardian. We offer
              kids&apos; cuts for younger clients — no age minimum.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Complimentary Beverages</h2>
            <p>
              Our signature Old Fashioned cocktail is offered to clients 21 and over
              with valid ID. We reserve the right to refuse service of alcoholic
              beverages at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Liability</h2>
            <p>
              {SITE_CONFIG.name} is not responsible for any allergic reactions to
              products used during services. Please inform your barber of any known
              allergies or skin sensitivities before your service begins.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Contact</h2>
            <p>
              Questions about these terms? Call us at{" "}
              <a href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`} className="text-primary-gold hover:underline">
                {BUSINESS_INFO.phone}
              </a>{" "}
              or visit us at {BUSINESS_INFO.address.full}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
