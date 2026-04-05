import Link from "next/link";
import { type ComponentProps, useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium rounded-button cursor-pointer",
    "transition-colors duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      primary: "bg-action text-on-action hover:bg-action-hover",
      secondary: "bg-transparent border border-outline-strong text-main hover:bg-inset",
      tertiary: "bg-transparent text-sub hover:bg-inset hover:text-main",
      danger: "bg-action-danger text-on-action-danger hover:bg-action-danger-hover",
      icon: "bg-transparent rounded-md p-0 text-sub hover:bg-inset hover:text-soft",
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
    { variant: "icon", size: "sm", class: "h-8 w-8 px-0" },
    { variant: "icon", size: "md", class: "h-10 w-10 px-0" },
    { variant: "icon", size: "lg", class: "h-12 w-12 px-0" },
  ],
  defaultVariants: {
    variant: "primary",
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
  size,
  fullWidth,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = useMemo(
    () => buttonVariants({ variant, size, fullWidth, className }),
    [variant, size, fullWidth, className],
  );

  if (props.href) {
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
