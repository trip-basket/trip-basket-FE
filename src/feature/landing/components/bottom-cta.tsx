import { Button, Text } from "@/src/components/ui";
import { GoogleIcon } from "./google-icon";

export function BottomCta({ onGoogleLogin }: { onGoogleLogin: () => void }) {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-lg text-center relative">
        <Text variant="h2" weight="extrabold" className="relative mb-4">
          지금 바로 시작하세요
        </Text>
        <Text variant="body" color="soft" className="relative mb-8">
          복잡한 가입 절차 없이, Google 계정으로 바로 여행 계획을 시작할 수 있습니다.
        </Text>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={onGoogleLogin}
          className="relative px-7 shadow-md hover:shadow-lg"
        >
          <GoogleIcon />
          Google로 시작하기
        </Button>
      </div>
    </section>
  );
}
