interface AmbientGlowProps {
  /** Position of the glow: "top-left", "top-right", "bottom-left", "bottom-right", "center" */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  /** Color: "gold" or "warm" */
  color?: "gold" | "warm";
  /** Size multiplier (1 = default, 2 = double) */
  size?: number;
  /** Opacity 0-1 */
  intensity?: number;
  className?: string;
}

const positionClasses: Record<string, string> = {
  "top-left": "-top-1/4 -left-1/4",
  "top-right": "-top-1/4 -right-1/4",
  "bottom-left": "-bottom-1/4 -left-1/4",
  "bottom-right": "-bottom-1/4 -right-1/4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const colorGradients: Record<string, string> = {
  gold: "radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
  warm: "radial-gradient(ellipse at center, rgba(180,140,60,0.1) 0%, rgba(120,80,30,0.04) 40%, transparent 70%)",
};

export default function AmbientGlow({
  position = "top-right",
  color = "gold",
  size = 1,
  intensity = 1,
  className = "",
}: AmbientGlowProps) {
  const sizeRem = 30 * size;
  return (
    <div
      className={`absolute pointer-events-none ${positionClasses[position]} ${className}`}
      style={{
        width: `${sizeRem}rem`,
        height: `${sizeRem}rem`,
        background: colorGradients[color],
        opacity: intensity,
      }}
      aria-hidden="true"
    />
  );
}
