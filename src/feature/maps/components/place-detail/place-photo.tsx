import Image from "next/image";

export function PlacePhoto({ url, name }: { url: string; name: string | null }) {
  return (
    <div className="relative w-full h-32 bg-gray-100">
      <Image src={url} alt={name ?? "장소 사진"} fill className="object-cover" />
    </div>
  );
}
