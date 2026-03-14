import { DashboardHeader, TripFilterTabs } from "@/src/feature/dashboard";
import { MOCK_ROOMS } from "@/src/feature/dashboard/mocks/mock-rooms";

export default function DashboardPage() {
  return (
    <div className="relative min-h-dvh bg-gray-50/30">
      {/* Grid pattern — scrolls with page */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-8">
        <DashboardHeader />

        <div className="mt-8">
          <TripFilterTabs rooms={MOCK_ROOMS} />
        </div>
      </div>
    </div>
  );
}
