import { Text } from "@/src/components/ui";

export function CalendarHeader() {
  return (
    <header className="flex items-center justify-between rounded-lg bg-surface px-6 py-4 shrink-0">
      <Text variant="h2" className="truncate">여행 이름</Text>
      <div className="flex items-center gap-4 shrink-0">
        <Text variant="body">26.01.15 – 26.02.13</Text>
        <div className="flex -space-x-1.5">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="h-6 w-6 rounded-full border-2 border-canvas bg-gray-300" />
          ))}
        </div>
      </div>
    </header>
  );
}
