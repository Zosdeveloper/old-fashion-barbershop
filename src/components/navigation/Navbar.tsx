"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import NavLink from "./NavLink";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-primary-black-950/90 backdrop-blur-md border-b border-primary-gold/10"
            : "bg-transparent"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between h-18">
            {/* Logo */}
            <a
              href="#hero"
              className="relative z-50 font-heading text-xl font-bold text-white hover:text-primary-gold transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {SITE_CONFIG.name}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </div>

            {/* Desktop Book Now */}
            <div className="hidden md:block">
              <Button href={BOOKSY_URL} variant="primary" size="sm">
                Book Now
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <HamburgerButton
              isOpen={isMenuOpen}
              toggle={() => setIsMenuOpen((prev) => !prev)}
            />
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
