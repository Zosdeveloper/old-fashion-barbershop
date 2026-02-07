"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

const lineVariants = {
  closed: { rotate: 0, y: 0 },
  open: (custom: number) => {
    switch (custom) {
      case 0:
        return { rotate: 45, y: 8 };
      case 1:
        return { opacity: 0, x: -20 };
      case 2:
        return { rotate: -45, y: -8 };
      default:
        return {};
    }
  },
};

export default function HamburgerButton({
  isOpen,
  toggle,
  className,
}: HamburgerButtonProps) {
  return (
    <button
      onClick={toggle}
      className={cn(
        "relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden",
        className
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block h-[2px] w-6 bg-white origin-center"
        />
      ))}
    </button>
  );
}
