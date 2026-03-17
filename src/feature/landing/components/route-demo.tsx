import { WindowDots } from "./window-dots";

const WAYPOINTS = [
  { label: "에펠탑", time: "10:00 - 12:00" },
  { label: "루브르 박물관", time: "13:00 - 16:00" },
  { label: "몽마르뜨 언덕", time: "17:00 - 18:30" },
];

const TRANSPORTS = [
  {
    label: "도보 15분 · 1.2km",
    bg: "bg-teal-50 border-teal-200 text-teal-700",
    icon: "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7",
  },
  {
    label: "버스 8분 · 3.5km",
    bg: "bg-gray-100 border-gray-200 text-gray-600",
    icon: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 11H6V6h12v5z",
  },
];

export function RouteDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl bg-white border border-gray-200 shadow-xl p-5">
        <WindowDots title="이동 경로" />

        <div className="relative pl-8">
          <div className="absolute left-[11px] top-3 bottom-3 border-l-2 border-dashed border-teal-200" />

          {WAYPOINTS.map((wp, i) => (
            <div key={wp.label}>
              {/* Waypoint */}
              <div className={`relative ${i < WAYPOINTS.length - 1 ? "mb-5" : ""}`}>
                <div className="absolute -left-[21px] top-0.5 w-6 h-6 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white">{i + 1}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{wp.label}</p>
                <p className="text-[11px] text-gray-400">{wp.time}</p>
              </div>

              {/* Transport (between waypoints) */}
              {i < TRANSPORTS.length && (
                <div className="relative mb-5 -ml-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${TRANSPORTS[i].bg}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={TRANSPORTS[i].icon} />
                    </svg>
                    {TRANSPORTS[i].label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">총 이동</span>
          <span className="text-xs font-semibold text-teal-700">23분 · 4.7km</span>
        </div>
      </div>
    </div>
  );
}
