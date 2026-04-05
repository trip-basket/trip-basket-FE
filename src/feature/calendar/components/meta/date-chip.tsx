import { Button, Text } from "@/src/components/ui";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return `${dateFormatter.format(s)} – ${dateFormatter.format(e)} · ${days}일`;
}

export function DateChip({
  startDate,
  endDate,
  onClick,
}: {
  startDate: string;
  endDate: string;
  onClick?: () => void;
}) {
  return (
    <Button variant="bordered" size="sm" className="shrink-0" onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 10h18M8 2v4M16 2v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <Text variant="caption" weight="bold" className="text-inherit">
        {formatDateRange(startDate, endDate)}
      </Text>
    </Button>
  );
}
