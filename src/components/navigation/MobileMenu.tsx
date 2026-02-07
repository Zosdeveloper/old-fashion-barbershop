"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { NAV_ITEMS, BOOKSY_URL } from "@/lib/constants";
import NavLink from "./NavLink";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
};

const menuVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  }),
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-primary-black-950/95 backdrop-blur-md flex flex-col justify-center px-10 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <NavLink
                    href={item.href}
                    label={item.label}
                    variant="mobile"
                    onClick={onClose}
                  />
                </motion.li>
              ))}
              <motion.li
                custom={NAV_ITEMS.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-4"
              >
                <Button href={BOOKSY_URL} variant="primary" size="lg" className="w-full">
                  Book Now
                </Button>
              </motion.li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
