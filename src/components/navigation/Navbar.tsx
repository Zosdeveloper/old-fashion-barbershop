"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_ITEMS, SITE_CONFIG, BOOKSY_URL } from "@/lib/constants";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HamburgerButton from "./HamburgerButton";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

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
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-3 hover:opacity-90 transition-opacity duration-300"
            >
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                width={56}
                height={54}
                className="w-14 h-auto"
                priority
              />
              <span className="font-heading text-xl font-bold text-white hidden sm:inline">
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`gold-underline text-sm font-heading font-bold uppercase tracking-[0.2em] py-1 transition-colors duration-300 ${
                      isActive
                        ? "text-primary-gold"
                        : "text-white hover:text-primary-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
