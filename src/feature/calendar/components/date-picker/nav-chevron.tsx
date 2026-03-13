export function NavChevron({
  orientation,
  size = 20,
  disabled,
  className,
}: {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "up" | "down";
}) {
  const d = orientation === "left" ? "M10 4l-4 4 4 4" : "M6 4l4 4-4 4";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={`text-sub ${disabled ? "opacity-30" : ""} ${className ?? ""}`}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
