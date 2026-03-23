import { Text } from "@/src/components/ui/text";
import { roomApi } from "@/src/lib/api";

export function CreateTripCard() {
  const handleCreate = async () => {
    try {
      const room = await roomApi.create({
        name: "런던 여행",
        tripStartDate: "2026-03-16",
        tripEndDate: "2026-03-29",
      });
      // TODO: 생성 후 해당 방으로 이동
      window.location.href = `/plan/${room.id}`;
    } catch {
      // TODO: 에러 처리
    }
  };

  return (
    <button
      type="button"
      onClick={handleCreate}
      className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-300 bg-gray-50/50 hover:bg-brand-50/50 transition-all duration-300 cursor-pointer h-full"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white border border-gray-200 group-hover:border-brand-300 group-hover:bg-brand-50 flex items-center justify-center transition-all duration-300 shadow-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className="text-gray-400 group-hover:text-brand-500 transition-colors"
          >
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <Text
          as="span"
          variant="small"
          weight="medium"
          className="text-gray-400 group-hover:text-brand-600 transition-colors"
        >
          새 여행 만들기
        </Text>
      </div>
    </button>
  );
}
