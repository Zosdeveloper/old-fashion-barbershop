import type { Metadata } from "next";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_CONFIG.name}. Learn how we handle your information.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-primary-black-950 min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-primary-gold font-heading text-sm font-bold uppercase tracking-[0.3em] mb-3">
          Legal
        </p>
        <h1 className="text-display-sm md:text-display-md font-heading font-bold text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-primary-black-500 font-body text-sm mb-12">
          Last updated: February 2026
        </p>

        <div className="prose-policy space-y-8 text-primary-black-300 font-body text-base leading-relaxed">
          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Information We Collect</h2>
            <p>
              When you book an appointment through our third-party booking platform (Booksy),
              we may collect your name, phone number, and email address. We do not store
              payment card details — all payments are processed securely through our payment
              processor.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-primary-black-400">
              <li>Schedule and manage your appointments</li>
              <li>Send appointment confirmations and reminders</li>
              <li>Communicate about our services when you opt in</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Third-Party Services</h2>
            <p>
              We use Booksy for appointment scheduling and Google Maps on our website.
              These services have their own privacy policies governing how they handle
              your data. We encourage you to review their policies.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Cookies & Analytics</h2>
            <p>
              Our website may use cookies and similar technologies to analyze traffic
              and improve your browsing experience. You can control cookie preferences
              through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information. However,
              no method of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal
              information at any time by contacting us directly.
            </p>
          </div>

          <div>
            <h2 className="text-white font-heading text-xl font-bold mb-3">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, contact us at{" "}
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
