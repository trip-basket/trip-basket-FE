import type { RoomSummary } from "../types/room";
import { CreateTripCard } from "./create-trip-card";
import { TripCard } from "./trip-card";

export function TripGrid({
  rooms,
  showCreate = true,
}: {
  rooms: RoomSummary[];
  showCreate?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
      {showCreate && <CreateTripCard />}
      {rooms.map((room) => (
        <TripCard key={room.id} room={room} />
      ))}
    </div>
  );
}
