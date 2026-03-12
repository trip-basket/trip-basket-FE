/**
 * Renders an inline SVG chevron icon whose direction is determined by `orientation`.
 *
 * @param orientation - Direction of the chevron: `"left" | "right" | "up" | "down"`. If omitted or not `"left"`, a right-pointing chevron is rendered.
 * @param size - Pixel size applied to both width and height of the SVG. Defaults to 20.
 * @param className - Optional CSS class applied to the SVG element.
 * @returns An SVG element containing a stroked chevron path oriented according to `orientation`.
 */
export function NavChevron({
  orientation,
  size = 20,
}: {
  className?: string;
  size?: number;
  disabled?: boolean;
  orientation?: "left" | "right" | "up" | "down";
}) {
  const d = orientation === "left" ? "M10 4l-4 4 4 4" : "M6 4l4 4-4 4";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="text-sub">
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
