import { ADD_COL_W } from "../constants";

/**
 * Renders a clickable header cell used to add a date.
 *
 * @param onClick - Function invoked when the header cell is clicked.
 * @param position - Placement of the column border; either `"left"` or `"right"`.
 * @returns The header cell button element that triggers `onClick` and displays a plus icon.
 */
export function AddDateHeaderCell({
  onClick,
  position,
}: {
  onClick: () => void;
  position: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex shrink-0 items-center justify-center p-1.5${position === "right" ? " border-l border-grid-line" : ""} cursor-pointer`}
      style={{ width: ADD_COL_W }}
      aria-label="날짜 추가"
    >
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-gray-200 group-hover:border-gray-300 group-hover:bg-black/[0.02] transition-colors">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-gray-300 group-hover:text-gray-400 transition-colors"
        >
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

/**
 * Renders a fixed-width grid column used as a spacer between calendar columns.
 *
 * @param position - "left" or "right"; when "right", a left border is added to separate this column from its neighbor
 * @returns A div element with width set to the shared ADD_COL_W constant; includes a left border when `position` is "right"
 */
export function AddDateGridColumn({ position }: { position: "left" | "right" }) {
  return (
    <div
      className={`shrink-0${position === "right" ? " border-l border-grid-line" : ""}`}
      style={{ width: ADD_COL_W }}
    />
  );
}
