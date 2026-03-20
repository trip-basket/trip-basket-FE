import type { TripDay } from "@/src/feature/calendar/types";

export function DateItem({
  day,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ref,
}: {
  day: TripDay;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  ref: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={`hover-item group w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg ${
        isHovered ? "border-gray-200 bg-gray-50 text-gray-900" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
      <span className="font-medium">{day.dateNum}일</span>
      <span className="text-gray-400 group-hover:text-gray-500 transition-colors">
        ({day.dayOfWeek})
      </span>
    </button>
  );
}
