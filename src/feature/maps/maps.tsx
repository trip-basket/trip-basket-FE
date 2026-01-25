import { APIProvider } from "@vis.gl/react-google-maps";
import { MapsContent } from "./components";

export function Maps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center border border-gray-200 rounded-md p-4 bg-gray-50 h-full w-full">
        <p className="text-gray-500 text-sm text-center">
          지도를 표시하는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <APIProvider apiKey={apiKey}>
        <MapsContent />
      </APIProvider>
    </div>
  );
}
