"use client";

import {
  BottomCta,
  CollabDemo,
  FeatureSection,
  HeroSection,
  PlaceBasketDemo,
  RouteDemo,
  ScheduleDragDemo,
} from "@/src/feature/landing";

export default function LandingPage() {
  const handleGoogleLogin = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return;
    }
    window.location.href = `${apiUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="relative">
      {/* Global grid pattern — scrolls with page */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <HeroSection onGoogleLogin={handleGoogleLogin} />

      <FeatureSection
        badge={
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-600 text-xs font-semibold mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            장소 저장
          </span>
        }
        title={
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            가고 싶은 장소,
            <br />
            일단 담아두세요
          </h2>
        }
        description="지도에서 발견한 장소를 바구니에 모아두고, 원할 때 일정으로 옮기세요. 흩어진 여행 정보가 한곳에 정리됩니다."
        demo={<PlaceBasketDemo />}
      />

      <FeatureSection
        reversed
        badge={
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/60 text-violet-600 text-xs font-semibold mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#8B5CF6" opacity="0.4" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#8B5CF6" />
              <path
                d="M17.5 17v-3m0 3l-2-2m2 2l2-2"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            일정 관리
          </span>
        }
        title={
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            끌어서
            <br />
            일정 완성
          </h2>
        }
        description="블록을 드래그해서 원하는 날짜와 시간에 배치하세요. 리사이즈로 체류 시간도 자유롭게 조절할 수 있습니다."
        demo={<ScheduleDragDemo />}
      />

      <FeatureSection
        badge={
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-600 text-xs font-semibold mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            실시간 협업
          </span>
        }
        title={
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            함께 만드는
            <br />
            여행 일정
          </h2>
        }
        description="친구, 가족과 동시에 일정을 편집하세요. 누가 어디를 수정하는지 실시간으로 확인할 수 있습니다."
        demo={<CollabDemo />}
      />

      <FeatureSection
        reversed
        badge={
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-600 text-xs font-semibold mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z" />
            </svg>
            이동 경로
          </span>
        }
        title={
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            장소 사이,
            <br />
            얼마나 걸릴까?
          </h2>
        }
        description="일정 사이의 이동 시간과 거리를 자동으로 계산합니다. 대중교통, 도보, 자차까지 한눈에 비교하세요."
        demo={<RouteDemo />}
      />

      <BottomCta onGoogleLogin={handleGoogleLogin} />
    </div>
  );
}
