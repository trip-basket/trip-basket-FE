import type { DateRange } from "react-day-picker";
import { Text } from "@/src/components/ui/text";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
});

function formatDate(range: DateRange | undefined): {
  from: string | null;
  to: string | null;
  days: number;
} {
  if (!range?.from) {
    return { from: null, to: null, days: 0 };
  }
  const from = dateFormatter.format(range.from);
  if (!range.to) {
    return { from, to: null, days: 0 };
  }
  const to = dateFormatter.format(range.to);
  const days = Math.floor((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { from, to, days };
}

export function DateRangeLabel({ range }: { range: DateRange | undefined }) {
  const { from, to } = formatDate(range);

  if (!from) {
    return (
      <Text variant="small" color="sub">
        날짜를 선택하세요
      </Text>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Text
        as="span"
        variant="small"
        weight="medium"
        className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md"
      >
        {from}
      </Text>
      {to ? (
        <>
          <Text as="span" variant="small" color="sub">
            –
          </Text>
          <Text
            as="span"
            variant="small"
            weight="medium"
            className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md"
          >
            {to}
          </Text>
        </>
      ) : (
        <Text as="span" variant="small" color="sub">
          –
        </Text>
      )}
    </div>
  );
}
