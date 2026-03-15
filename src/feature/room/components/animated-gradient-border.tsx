export function AnimatedGradientBorder() {
  return (
    <svg
      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="border-grad"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="800"
          y2="400"
        >
          <stop offset="0%" stopColor="#d1d5db">
            <animate
              attributeName="stop-color"
              values="#d1d5db;#9ca3af;#d1d5db;#6b7280;#d1d5db"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="33%" stopColor="#9ca3af">
            <animate
              attributeName="stop-color"
              values="#9ca3af;#d1d5db;#6b7280;#d1d5db;#9ca3af"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="66%" stopColor="#6b7280">
            <animate
              attributeName="stop-color"
              values="#6b7280;#9ca3af;#d1d5db;#9ca3af;#6b7280"
              dur="5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#d1d5db">
            <animate
              attributeName="stop-color"
              values="#d1d5db;#6b7280;#9ca3af;#d1d5db;#d1d5db"
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
        stroke="url(#border-grad)"
        strokeWidth="2.5"
        strokeDasharray="10 5"
        strokeLinecap="round"
        style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;-45"
          dur="6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
