import { RoomDesktop } from "./room-desktop";
import { RoomMobile } from "./room-mobile";

export function RoomContent() {
  return (
    <>
      <div className="contents lg:hidden">
        <RoomMobile />
      </div>
      <div className="hidden lg:contents">
        <RoomDesktop />
      </div>
    </>
  );
}
