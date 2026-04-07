import { Text } from "@/src/components/ui";
import { WindowDots } from "./window-dots";

const COLLAB_STYLES = `
  @keyframes float-cursor-1 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(30px, 15px); }
    50% { transform: translate(15px, -8px); }
    75% { transform: translate(-8px, 12px); }
  }
`;

export function CollabDemo() {
  return (
    <>
      <style>{COLLAB_STYLES}</style>
      <div className="w-full max-w-sm">
        <div className="rounded-3xl bg-white border border-outline shadow-xl p-5">
          <div className="flex items-center justify-between">
            <WindowDots title="오사카 여행" />
            <div className="flex -space-x-1.5 -mt-5 mb-5">
              <div className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                J
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                M
              </div>
              <div className="w-6 h-6 rounded-full bg-violet-400 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                S
              </div>
            </div>
          </div>

          {/* Mini calendar grid */}
          <div className="grid grid-cols-3 gap-2 relative">
            <div>
              <Text
                as="p"
                variant="caption"
                color="muted"
                className="!text-[10px] mb-2 text-center"
              >
                Day 1
              </Text>
              <div className="space-y-1.5">
                <div className="h-9 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <Text variant="caption" className="!text-[10px] text-sky-600 font-medium">
                    도톤보리
                  </Text>
                </div>
                <div className="h-12 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center">
                  <Text variant="caption" className="!text-[10px] text-amber-600 font-medium">
                    오사카성
                  </Text>
                </div>
              </div>
            </div>
            <div>
              <Text
                as="p"
                variant="caption"
                color="muted"
                className="!text-[10px] mb-2 text-center"
              >
                Day 2
              </Text>
              <div className="space-y-1.5">
                <div className="h-10 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center relative">
                  <Text variant="caption" className="!text-[10px] text-violet-600 font-medium">
                    나라 공원
                  </Text>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm">
                    M
                  </div>
                </div>
                <div className="h-7 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center">
                  <Text variant="caption" className="!text-[10px] text-rose-600 font-medium">
                    신사이바시
                  </Text>
                </div>
              </div>
            </div>
            <div>
              <Text
                as="p"
                variant="caption"
                color="muted"
                className="!text-[10px] mb-2 text-center"
              >
                Day 3
              </Text>
              <div className="space-y-1.5">
                <div className="h-9 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <Text variant="caption" className="!text-[10px] text-teal-600 font-medium">
                    유니버셜
                  </Text>
                </div>
                <div className="h-9 rounded-lg border-2 border-dashed border-violet-300 flex items-center justify-center animate-pulse relative">
                  <Text variant="caption" className="!text-[10px] text-violet-400">
                    추가 중...
                  </Text>
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-violet-400 border-2 border-white text-[7px] font-bold text-white flex items-center justify-center shadow-sm">
                    S
                  </div>
                </div>
              </div>
            </div>

            {/* Animated cursor */}
            <div
              className="absolute top-8 left-6 pointer-events-none"
              style={{ animation: "float-cursor-1 4s ease-in-out infinite" }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="#F43F5E" aria-hidden="true">
                <path d="M0 0l12 8.5-5 1L4.5 16 0 0z" />
              </svg>
              <Text
                variant="caption"
                className="!text-[8px] bg-rose-500 text-white px-1 py-0.5 rounded ml-0.5 whitespace-nowrap"
              >
                지민
              </Text>
            </div>
          </div>

          {/* Editing indicator */}
          <div className="mt-4 flex items-center gap-3 text-[10px] text-muted">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Text variant="caption" className="!text-[10px]">
                민수님이 Day 2 편집 중
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
