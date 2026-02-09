interface SectionDividerProps {
  variant?: "gradient" | "gold-line" | "fade";
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  variant = "gradient",
  flip = false,
  className = "",
}: SectionDividerProps) {
  if (variant === "gold-line") {
    return (
      <div className={`relative py-1 ${className}`}>
        <div className="h-px bg-gradient-to-r from-transparent via-primary-gold/25 to-transparent" />
      </div>
    );
  }

  if (variant === "fade") {
    return (
      <div
        className={`h-24 md:h-32 ${className}`}
        style={{
          background: flip
            ? "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(26,26,26,1) 100%)"
            : "linear-gradient(to bottom, rgba(26,26,26,1) 0%, rgba(13,13,13,1) 100%)",
        }}
      />
    );
  }

  // gradient — a warm ambient glow between sections
  return (
    <div className={`relative h-32 md:h-48 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(26,26,26,0) 100%)"
            : "linear-gradient(to bottom, rgba(26,26,26,1) 0%, rgba(13,13,13,0) 100%)",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] h-[2px] opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.8) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
