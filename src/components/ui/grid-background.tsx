export function GridBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}
