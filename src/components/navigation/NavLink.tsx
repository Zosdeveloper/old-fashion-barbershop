"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

export default function NavLink({
  href,
  label,
  className,
  onClick,
  variant = "desktop",
}: NavLinkProps) {
  const isAnchor = href.startsWith("#");
  const isExternal = href.startsWith("http");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClick?.();
  };

  if (variant === "mobile") {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        className={cn(
          "block text-3xl font-heading font-semibold text-white hover:text-primary-gold transition-colors duration-300",
          className
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {label}
      </motion.a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "gold-underline text-sm font-body font-medium uppercase tracking-widest text-primary-black-200 hover:text-primary-gold transition-colors duration-300 py-1",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
