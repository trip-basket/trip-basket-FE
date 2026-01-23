"use client";

export function Calendar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <button
        className="w-fit bg-white p-2 rounded shadow"
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      <div className="mt-2 text-center font-bold">CALENDAR MAIN AREA</div>
    </div>
  );
}
