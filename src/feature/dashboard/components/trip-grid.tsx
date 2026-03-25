import type { RoomSummary } from "../types/room";
import { CreateTripCard } from "./create-trip-card";
import { TripCard } from "./trip-card";

export function TripGrid({
  rooms,
  onRoomDeleted,
}: {
  rooms: RoomSummary[];
  onRoomDeleted?: () => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <CreateTripCard />
      {rooms.map((room) => (
        <TripCard key={room.id} room={room} onDeleted={onRoomDeleted} />
      ))}
    </div>
  );
}
