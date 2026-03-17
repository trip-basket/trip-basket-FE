export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium">Travel Basket</p>
        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">내 여행</h1>
      </div>

      {/* Profile placeholder */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label="초대 코드 입력"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </button>
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer"
          aria-label="프로필"
        >
          T
        </button>
      </div>
    </header>
  );
}
