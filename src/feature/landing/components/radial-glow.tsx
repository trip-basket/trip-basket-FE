export function RadialGlow() {
  return (
    <div
      className="absolute -inset-12 pointer-events-none -z-10"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0) 70%)",
      }}
    />
  );
}
