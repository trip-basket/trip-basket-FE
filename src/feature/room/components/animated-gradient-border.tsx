import { useId } from "react";

export function AnimatedGradientBorder() {
  const gradientId = useId();

  return (
    <svg
      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="800"
          y2="400"
        >
          <stop offset="0%" stopColor="#FFE566">
            <animate
              attributeName="stop-color"
              values="#FFE566;#FFD60A;#FFE566;#FFCA00;#FFE566"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="33%" stopColor="#FFD60A">
            <animate
              attributeName="stop-color"
              values="#FFD60A;#FFE566;#FFCA00;#FFE566;#FFD60A"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="66%" stopColor="#FFCA00">
            <animate
              attributeName="stop-color"
              values="#FFCA00;#FFD60A;#FFE566;#FFD60A;#FFCA00"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#FFE566">
            <animate
              attributeName="stop-color"
              values="#FFE566;#FFCA00;#FFD60A;#FFE566;#FFE566"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        rx="13"
        ry="13"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeDasharray="8 6"
        strokeLinecap="round"
        style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-14"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
