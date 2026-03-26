import type { Metadata } from "next";
import { QueryProvider } from "@/src/lib/query-provider";

import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Travel Basket",
  description: "실시간 협업 여행 계획 캘린더",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className="flex h-full flex-col antialiased"
        style={{ fontFamily: "'NanumSquareRound', system-ui, sans-serif" }}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
