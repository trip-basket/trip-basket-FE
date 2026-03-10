export function BackButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0 text-black/70 transition-colors hover:bg-black/10 hover:text-black"
      aria-label="홈으로 이동"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M10 13L5 8L10 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
