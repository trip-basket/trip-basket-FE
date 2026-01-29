import { type ComponentProps, useId, useMemo } from "react";

import { type Control, type FieldValues, type Path, useController } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";

export const inputVariants = tv({
  slots: {
    container: "flex flex-col gap-1",
    label: "text-sm font-medium text-main",
    input: [
      "w-full rounded-lg border px-4 py-2.5",
      "text-base text-on-field placeholder:text-on-field-placeholder",
      "bg-field transition-colors duration-200",
      "outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    errorText: "text-sm text-error",
  },
  variants: {
    error: {
      true: {
        input: "border-field-outline-error focus:border-field-outline-error",
        label: "text-error",
      },
      false: {
        input: "border-field-outline focus:border-field-outline-focus",
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

type InputVariants = VariantProps<typeof inputVariants>;

type InputProps = Omit<InputVariants, "error"> &
  Omit<ComponentProps<"input">, "color"> & {
    label?: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
  };

export function Input({ label, error, className, id, ref, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const styles = useMemo(() => inputVariants({ error: Boolean(error) }), [error]);

  return (
    <div className={styles.container()}>
      {label && (
        <label htmlFor={inputId} className={styles.label()}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={styles.input({ className })}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} role="alert" className={styles.errorText()}>
          {error}
        </span>
      )}
    </div>
  );
}

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  control: Control<T>;
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledInputProps<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={(field.value as string) || ""}
      error={fieldState.error?.message}
      {...props}
    />
  );
}
