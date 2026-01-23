import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const center = { lat: 37.5665, lng: 126.978 };

export function MapContent() {
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
    >
      <MarkerF position={center} />
    </GoogleMap>
  ) : (
    <div className="flex-1 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  );
}
