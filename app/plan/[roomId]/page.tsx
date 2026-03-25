import { RoomContent } from "@/src/feature/room";

export default async function PlanPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  return (
    <div className="flex flex-1 min-h-0 flex-col lg:flex-row bg-canvas">
      <RoomContent roomId={roomId} />
    </div>
  );
}
