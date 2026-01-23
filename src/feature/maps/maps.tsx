import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 37.5665, lng: 126.978 };

const mapOptions = {
  mapTypeControl: false, // 왼쪽 상단 Map/Satellite 제거
  streetViewControl: false, // 오른쪽 하단 사람 아이콘 제거
  fullscreenControl: false, // 전체화면 버튼 제거
  zoomControl: true, // 줌 버튼은 유지
};

export function MapsContent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={13}
      mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "10px" }}
      options={mapOptions}
    >
      <MarkerF position={center} />
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
