interface NinaLogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  variant?: "pulse" | "spin";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-lg",
  md: "h-14 w-14 text-2xl",
  lg: "h-20 w-20 text-3xl",
};

export default function NinaLogo({
  size = "md",
  animated = false,
  variant = "pulse",
  className = "",
}: NinaLogoProps) {
  const animationClass =
    animated && variant === "spin" ? "nina-logo-spin" : animated ? "nina-logo-pulse" : "";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {animated && (
        <span className="absolute inset-0 rounded-2xl border-2 border-indigo-400/40 nina-logo-ring" />
      )}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-lg shadow-indigo-300/40 ${sizeClasses[size]} ${animationClass}`}
      >
        N
      </div>
    </div>
  );
}
