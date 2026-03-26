"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GridBackground } from "@/src/components/ui";
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
      return;
    }
  }, [isSuccess, router]);

  const handleGoogleLogin = async () => {
    window.location.href = "https://api.luts.kr/oauth2/authorization/google";
  };

  return (
    <div className="relative">
      <GridBackground />

      <HeroSection onGoogleLogin={handleGoogleLogin} />

      <FeatureShowcase />

      <BottomCta onGoogleLogin={handleGoogleLogin} />
    </div>
  );
}
