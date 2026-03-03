import { RoomContent } from "@/src/feature/room";

export default async function PlanPage({ params }: { params: Promise<{ roomId: string }> }) {
  //   const { roomId } = await params;

  return (
    <div
      className="flex flex-1 min-h-0 flex-col lg:flex-row"
      style={{ backgroundColor: "rgb(212, 228, 205)" }}
    >
      <div className="hidden lg:block lg:h-auto lg:w-[50px] flex-shrink-0" aria-hidden="true" />
      <RoomContent />
    </div>
  );
}
