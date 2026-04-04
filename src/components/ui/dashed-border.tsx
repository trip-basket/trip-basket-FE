/**
 * SVG 기반 점선 테두리.
 * CSS border-dashed 는 dash 패턴 커스터마이징이 불가하므로,
 * SVG rect 로 통일된 점선 패턴을 보장한다.
 *
 * 부모 요소에 `position: relative` 가 필요하다.
 */
export function DashedBorder({
  radius = 16,
  className = "text-dashed",
}: {
  radius?: number;
  className?: string;
}) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
        rx={radius - 1}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
    </svg>
  );
}
