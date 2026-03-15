import { GoogleIcon } from "./google-icon";
import { RadialGlow } from "./radial-glow";

export function BottomCta({ onGoogleLogin }: { onGoogleLogin: () => void }) {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-lg text-center relative">
        <RadialGlow />
        <h2 className="relative text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          지금 바로 시작하세요
        </h2>
        <p className="relative text-gray-500 mb-8">
          복잡한 가입 절차 없이, Google 계정으로 바로 여행 계획을 시작할 수 있습니다.
        </p>
        <button
          type="button"
          onClick={onGoogleLogin}
          className="relative inline-flex items-center gap-3 h-12 px-7 rounded-lg bg-white border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
        >
          <GoogleIcon />
          <span className="text-gray-700 font-medium text-base">Google로 시작하기</span>
        </button>
      </div>
    </section>
  );
}
