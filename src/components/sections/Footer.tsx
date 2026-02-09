import { SITE_CONFIG, BUSINESS_INFO, SOCIAL_LINKS, BOOKSY_URL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-black-950 border-t border-primary-black-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-white font-heading text-xl font-semibold mb-3">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-primary-black-400 font-body text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.tagline}. Premium barbershop in {BUSINESS_INFO.address.city},{" "}
              {BUSINESS_INFO.address.state}.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-gold font-body text-sm uppercase tracking-widest mb-3">
              Contact
            </h4>
            <div className="space-y-2 text-sm font-body">
              <p>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-primary-black-300 hover:text-primary-gold transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </p>
              <p className="text-primary-black-300">
                {BUSINESS_INFO.address.full}
              </p>
              <p>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-black-300 hover:text-primary-gold transition-colors"
                >
                  Instagram
                </a>
              </p>
            </div>
          </div>

          {/* Book */}
          <div>
            <h4 className="text-primary-gold font-body text-sm uppercase tracking-widest mb-3">
              Book
            </h4>
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 border border-primary-gold text-primary-gold text-sm font-body uppercase tracking-wider rounded-sm hover:bg-primary-gold hover:text-primary-black-900 transition-colors duration-300"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-black-800 text-center">
          <p className="text-primary-black-500 font-body text-xs">
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
