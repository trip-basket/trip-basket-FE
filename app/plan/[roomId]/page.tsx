import { RoomContent } from "@/src/feature/room";

export default async function PlanPage({ params }: { params: Promise<{ roomId: string }> }) {
  //   const { roomId } = await params;

  return (
    <div className="flex flex-1 min-h-0 flex-row bg-green-50">
      <nav className="bg-red-50 w-[70px] flex-shrink-0"></nav>
      <RoomContent />
    </div>
  );
}
