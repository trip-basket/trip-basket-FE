import { useCalendarStore } from "@/src/feature/calendar/stores";

export function AddDayButton({ label, position }: { label: string; position: "before" | "after" }) {
  const addDayBefore = useCalendarStore((s) => s.addDayBefore);
  const addDayAfter = useCalendarStore((s) => s.addDayAfter);

  return (
    <button
      type="button"
      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-400 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600 transition-colors cursor-pointer"
      onClick={position === "before" ? addDayBefore : addDayAfter}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M6 2.5V9.5M2.5 6H9.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </button>
  );
}
