import type { ComponentProps, ElementType } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
  base: "",
  variants: {
    variant: {
      display: "font-bold text-4xl",
      h1: "font-semibold text-3xl",
      h2: "font-semibold text-2xl",
      h3: "font-medium text-xl",
      h4: "font-medium text-lg",
      body: "text-base",
      small: "text-sm",
      caption: "text-xs",
    },
    color: {
      main: "text-main",
      sub: "text-sub",
      muted: "text-muted",
      inverse: "text-inverse",
      error: "text-error",
      success: "text-success",
      action: "text-action",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "main",
  },
});

type TextVariants = VariantProps<typeof textVariants>;

type TextProps<T extends ElementType = "span"> = TextVariants & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentProps<T>, "as" | "className" | "color">;

const variantTagMap: Record<string, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "p",
  caption: "span",
};

export function Text<T extends ElementType = "span">({
  as,
  variant,
  color,
  weight,
  align,
  className,
  children,
  ...props
}: TextProps<T>) {
  const Component = as || variantTagMap[variant || "body"] || "span";

  const styles = textVariants({ variant, color, weight, align, className });

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
}
