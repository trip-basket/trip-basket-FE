"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomCta, FeatureShowcase, HeroSection } from "@/src/feature/landing";
import { memberApi } from "@/src/lib/api";
import { QUERY_KEYS } from "@/src/lib/query-keys";

export default function LandingPage() {
  const router = useRouter();
  const { isSuccess } = useQuery({
    queryKey: QUERY_KEYS.me,
    queryFn: () => memberApi.me(),
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      router.replace("/dashboard");
    }
  }, [isSuccess, router]);

  const handleGoogleLogin = async () => {
    window.location.href = "https://api.luts.kr/oauth2/authorization/google";
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

      <FeatureShowcase />

      <BottomCta onGoogleLogin={handleGoogleLogin} />
    </div>
  );
}
