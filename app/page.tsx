"use client";

import { Button } from "@/src/components/ui/button";

const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`;

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <main className="flex flex-col items-center gap-8 px-6">
        <h1 className="font-semibold text-2xl text-main">Travel Basket</h1>
        <Button size="lg" onClick={handleGoogleLogin}>
          Google로 로그인
        </Button>
      </main>
    </div>
  );
}
