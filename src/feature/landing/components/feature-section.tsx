import type { ReactNode } from "react";
import { Text } from "@/src/components/ui";

interface FeatureSectionProps {
  badge: ReactNode;
  title: ReactNode;
  description: string;
  demo: ReactNode;
  reversed?: boolean;
}

export function FeatureSection({
  badge,
  title,
  description,
  demo,
  reversed = false,
}: FeatureSectionProps) {
  const textBlock = (
    <div className="flex-1 max-w-lg relative">
      <div className="relative">
        {badge}
        {title}
        <Text as="p" variant="h4" color="soft" className="mt-5 leading-relaxed font-normal">
          {description}
        </Text>
      </div>
    </div>
  );

  const demoBlock = (
    <div
      className={`flex-1 flex justify-center ${reversed ? "lg:justify-start" : "lg:justify-end"} relative`}
    >
      <div className="relative">{demo}</div>
    </div>
  );

  return (
    <section className="py-24 lg:py-32 px-6">
      <div
        className={`mx-auto max-w-5xl flex ${reversed ? "flex-col-reverse" : "flex-col"} lg:flex-row items-center gap-12 lg:gap-20`}
      >
        {reversed ? (
          <>
            {demoBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {demoBlock}
          </>
        )}
      </div>
    </section>
  );
}
