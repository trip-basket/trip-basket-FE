interface SidebarToggleProps {
  onClick: () => void;
}

export function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center h-full bg-canvas rounded-r-xl px-2 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-900"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
}
