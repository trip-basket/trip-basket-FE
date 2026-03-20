"use client";

import { useCallback, useState } from "react";
import { Text } from "@/src/components/ui";

const DURATION = 10;

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      </svg>
    ),
    title: "장소 저장",
    description: "가고 싶은 장소를 바구니에 담아두세요",
    borderColor: "#fbbf24",
    fillColor: "rgba(251, 191, 36, 0.12)",
    iconColor: "#d97706",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.4" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
        <path
          d="M17.5 17v-3m0 3l-2-2m2 2l2-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "일정 관리",
    description: "드래그로 일정을 자유롭게 배치하세요",
    borderColor: "#a78bfa",
    fillColor: "rgba(167, 139, 250, 0.12)",
    iconColor: "#7c3aed",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    title: "실시간 협업",
    description: "함께 만드는 여행 일정",
    borderColor: "#34d399",
    fillColor: "rgba(52, 211, 153, 0.12)",
    iconColor: "#059669",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4z" />
      </svg>
    ),
    title: "이동 경로",
    description: "장소 사이 이동 시간을 자동 계산",
    borderColor: "#2dd4bf",
    fillColor: "rgba(45, 212, 191, 0.12)",
    iconColor: "#0d9488",
  },
];

export function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleBoxClick = useCallback((index: number) => {
    setActiveIndex(index);
    setAnimKey((k) => k + 1);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % features.length);
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <section className="py-24 lg:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="tablist">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={feature.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleBoxClick(index)}
                className="relative overflow-hidden rounded-xl border-2 p-4 text-left transition-colors cursor-pointer"
                style={{
                  borderColor: isActive ? feature.borderColor : "#e5e7eb",
                }}
              >
                {isActive && (
                  <div
                    key={animKey}
                    className="absolute inset-0"
                    style={{
                      backgroundColor: feature.fillColor,
                      animation: `fill-progress ${DURATION}s linear forwards`,
                      transformOrigin: "left",
                    }}
                    onAnimationEnd={handleAnimationEnd}
                  />
                )}

                <div className="relative z-10">
                  <div className="mb-2" style={{ color: feature.iconColor }}>
                    {feature.icon}
                  </div>
                  <Text variant="small" weight="semibold">
                    {feature.title}
                  </Text>
                  <Text as="span" variant="caption" color="muted" className="mt-1 block">
                    {feature.description}
                  </Text>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
          <Text variant="h3" color="muted">
            영상이 들어갈 자리
          </Text>
        </div>
      </div>
    </section>
  );
}
