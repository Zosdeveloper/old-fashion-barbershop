"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

/* Chamfered corner clip-path — matches the irregular shape theme */
const CHAMFER = "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-gold text-primary-black-950 font-semibold hover:bg-primary-gold-400",
  outline:
    "bg-transparent text-primary-gold font-semibold border border-primary-gold/60 hover:bg-primary-gold hover:text-primary-black-950 hover:border-primary-gold",
  ghost:
    "text-primary-gold hover:bg-primary-gold/10 font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-6 py-2.5 text-xs",
  md: "px-8 py-3.5 text-sm",
  lg: "px-11 py-4 text-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const usesChamfer = variant !== "ghost";

    const classes = cn(
      "inline-flex items-center justify-center transition-all duration-300 tracking-[0.2em] uppercase font-body",
      usesChamfer ? "" : "rounded-sm",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const clipStyle = usesChamfer ? { clipPath: CHAMFER } : undefined;

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          style={clipStyle}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        style={clipStyle}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
