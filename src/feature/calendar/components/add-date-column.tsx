import { ADD_COL_W } from "../constants";

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
      aria-label={position === "left" ? "이전 날짜 추가" : "다음 날짜 추가"}
    >
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-outline group-hover:border-outline-strong group-hover:bg-hover transition-colors">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-muted group-hover:text-soft transition-colors"
        >
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  );
}

export function AddDateGridColumn({ position }: { position: "left" | "right" }) {
  return (
    <div
      className={`shrink-0${position === "right" ? " border-l border-grid-line" : ""}`}
      style={{ width: ADD_COL_W }}
    />
  );
}
