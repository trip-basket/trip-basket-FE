import { Text } from "@/src/components/ui";
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
      className={`hover-item group w-full flex items-center gap-2.5 px-3 py-2 rounded-lg ${
        isHovered ? "hover-item-active" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
      <Text as="span" variant="small" weight="medium">
        {day.dateNum}일
      </Text>
      <Text
        as="span"
        variant="small"
        color="muted"
        className="group-hover:text-soft transition-colors"
      >
        ({day.dayOfWeek})
      </Text>
    </button>
  );
}
