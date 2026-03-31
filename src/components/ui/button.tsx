import Link from "next/link";
import { type ComponentProps, useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium rounded-lg cursor-pointer",
    "transition-colors duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      solid: "",
      outline: "bg-transparent border",
      ghost: "bg-transparent",
      link: "bg-transparent underline-offset-4 hover:underline",
      icon: "bg-transparent rounded-md p-0",
    },
    color: {
      primary: "",
      danger: "",
      neutral: "",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  compoundVariants: [
    // Primary Solid
    {
      variant: "solid",
      color: "primary",
      class: "bg-action text-on-action hover:bg-action-hover",
    },
    // Primary Outline
    {
      variant: "outline",
      color: "primary",
      class: "border-action-outline text-action hover:bg-action-hover hover:text-on-action",
    },
    // Primary Ghost
    {
      variant: "ghost",
      color: "primary",
      class: "text-action hover:bg-brand-100",
    },
    // Primary Link
    {
      variant: "link",
      color: "primary",
      class: "text-action hover:text-action-hover",
    },
    // Danger Solid
    {
      variant: "solid",
      color: "danger",
      class: "bg-action-danger text-on-action-danger hover:bg-action-danger-hover",
    },
    // Danger Outline
    {
      variant: "outline",
      color: "danger",
      class:
        "border-action-danger-outline text-action-danger hover:bg-action-danger hover:text-on-action-danger",
    },
    // Danger Ghost
    {
      variant: "ghost",
      color: "danger",
      class: "text-action-danger hover:bg-error-100",
    },
    // Danger Link
    {
      variant: "link",
      color: "danger",
      class: "text-action-danger hover:text-action-danger-hover",
    },
    // Neutral Solid
    {
      variant: "solid",
      color: "neutral",
      class: "bg-gray-600 text-inverse hover:bg-gray-700",
    },
    // Neutral Outline
    {
      variant: "outline",
      color: "neutral",
      class: "border-outline-strong text-main hover:bg-gray-100",
    },
    // Neutral Ghost
    {
      variant: "ghost",
      color: "neutral",
      class: "text-main hover:bg-gray-100",
    },
    // Neutral Link
    {
      variant: "link",
      color: "neutral",
      class: "text-sub hover:text-main",
    },
    // Icon Primary
    {
      variant: "icon",
      color: "primary",
      class: "text-action hover:bg-brand-100",
    },
    // Icon Danger
    {
      variant: "icon",
      color: "danger",
      class: "text-action-danger hover:bg-error-100",
    },
    // Icon Neutral
    {
      variant: "icon",
      color: "neutral",
      class: "text-sub hover:bg-gray-100 hover:text-main",
    },
    // Icon sizes (정사각형)
    {
      variant: "icon",
      size: "sm",
      class: "h-8 w-8 px-0",
    },
    {
      variant: "icon",
      size: "md",
      class: "h-10 w-10 px-0",
    },
    {
      variant: "icon",
      size: "lg",
      class: "h-12 w-12 px-0",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonAsButton = {
  href?: never;
} & Omit<ComponentProps<"button">, "color">;

type ButtonAsLink = {
  href: string;
} & Omit<ComponentProps<typeof Link>, "color">;

type ButtonProps = ButtonVariants & {
  isLoading?: boolean;
} & (ButtonAsButton | ButtonAsLink);

export function Button({
  variant,
  color,
  size,
  fullWidth,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = useMemo(
    () => buttonVariants({ variant, color, size, fullWidth, className }),
    [variant, color, size, fullWidth, className],
  );

  if (variant === "link" && props.href) {
    const { href, ...linkProps } = props as ButtonAsLink;

    return (
      <Link href={href} className={styles} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;

  return (
    <button className={styles} disabled={disabled || isLoading} {...buttonProps}>
      <div className="flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <span className={`flex items-center gap-2 ${isLoading ? "invisible" : ""}`}>
          {children}
        </span>
      </div>
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
