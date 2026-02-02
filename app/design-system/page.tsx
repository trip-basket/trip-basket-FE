"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, ControlledInput, Input, Text } from "@/src/components/ui";

const controlledSchema = z.object({
  email: z.email("Invalid email address"),
});

const uncontrolledSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
});

type ControlledFormValues = z.infer<typeof controlledSchema>;
type UncontrolledFormValues = z.infer<typeof uncontrolledSchema>;

function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);
  const { control } = useForm<ControlledFormValues>({
    defaultValues: { email: "" },
    mode: "onChange",
    resolver: zodResolver(controlledSchema),
  });

  const {
    register,
    formState: { errors },
  } = useForm<UncontrolledFormValues>({
    mode: "onChange",
    resolver: zodResolver(uncontrolledSchema),
  });

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-canvas p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="font-bold text-4xl text-main">Design System</h1>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg bg-action px-4 py-2 text-on-action transition-colors hover:bg-action-hover"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Colors</h2>

          {/* Brand Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Brand</h3>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-12 rounded-md"
                    style={{
                      backgroundColor: `var(--brand-${shade})`,
                    }}
                  />
                  <span className="mt-1 block text-muted text-xs">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gray Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Gray</h3>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-12 rounded-md"
                    style={{
                      backgroundColor: `var(--gray-${shade})`,
                    }}
                  />
                  <span className="mt-1 block text-muted text-xs">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Semantic</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-12 rounded-md bg-success-500" />
                <span className="mt-1 block text-muted text-xs">Success</span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-warning-500" />
                <span className="mt-1 block text-muted text-xs">Warning</span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-error-500" />
                <span className="mt-1 block text-muted text-xs">Error</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <Text variant="h2" className="mb-6">
            Typography
          </Text>

          <div className="space-y-4 rounded-xl border border-outline bg-surface p-6">
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                display
              </Text>
              <Text variant="display">Display Text</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                h1
              </Text>
              <Text variant="h1">Heading 1</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                h2
              </Text>
              <Text variant="h2">Heading 2</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                h3
              </Text>
              <Text variant="h3">Heading 3</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                h4
              </Text>
              <Text variant="h4">Heading 4</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                body
              </Text>
              <Text variant="body">Body Text</Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                small
              </Text>
              <Text variant="small" color="sub">
                Small Text
              </Text>
            </div>
            <div className="flex items-baseline gap-4">
              <Text variant="caption" color="muted" className="w-20">
                caption
              </Text>
              <Text variant="caption" color="muted">
                Caption Text
              </Text>
            </div>
          </div>

          {/* Text Colors */}
          <Text variant="h4" className="mb-4 mt-8">
            Colors
          </Text>
          <div className="space-y-2 rounded-xl border border-outline bg-surface p-6">
            <Text color="main">Main - Primary text color</Text>
            <Text color="sub">Sub - Secondary text color</Text>
            <Text color="muted">Muted - Tertiary text color</Text>
            <Text color="error">Error - Error text color</Text>
            <Text color="success">Success - Success text color</Text>
            <Text color="action">Action - Action text color</Text>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Spacing</h2>

          <div className="space-y-3 rounded-xl border border-outline bg-surface p-6">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((space) => (
              <div key={space} className="flex items-center gap-4">
                <span className="w-12 text-muted text-xs">space-{space}</span>
                <div
                  className="h-4 rounded bg-brand-500"
                  style={{ width: `var(--space-${space})` }}
                />
                <span className="text-muted text-xs">{space * 4}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Border Radius</h2>

          <div className="flex flex-wrap gap-6">
            {["sm", "md", "lg", "xl", "full"].map((radius) => (
              <div key={radius} className="text-center">
                <div
                  className="h-16 w-16 bg-brand-500"
                  style={{ borderRadius: `var(--radius-${radius})` }}
                />
                <span className="mt-2 block text-muted text-xs">{radius}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Surfaces Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Surfaces</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-outline bg-canvas p-6">
              <p className="font-medium text-sm text-main">Canvas</p>
              <p className="mt-1 text-sub text-xs">Page background</p>
            </div>
            <div className="rounded-xl border border-outline bg-surface p-6">
              <p className="font-medium text-sm text-main">Surface</p>
              <p className="mt-1 text-sub text-xs">Cards, main content areas</p>
            </div>
            <div className="rounded-xl border border-outline bg-elevated p-6 shadow-lg">
              <p className="font-medium text-sm text-main">Elevated</p>
              <p className="mt-1 text-sub text-xs">Modals, popovers</p>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Buttons</h2>

          {/* Variants */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Variants</h3>
            <div className="space-y-4 rounded-xl border border-outline bg-surface p-6">
              {/* Primary */}
              <div>
                <p className="mb-3 text-sm text-muted">Primary</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" color="primary">
                    Solid
                  </Button>
                  <Button variant="outline" color="primary">
                    Outline
                  </Button>
                  <Button variant="ghost" color="primary">
                    Ghost
                  </Button>
                  <Button variant="link" color="primary" href="/">
                    Link
                  </Button>
                </div>
              </div>

              {/* Danger */}
              <div>
                <p className="mb-3 text-sm text-muted">Danger</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" color="danger">
                    Solid
                  </Button>
                  <Button variant="outline" color="danger">
                    Outline
                  </Button>
                  <Button variant="ghost" color="danger">
                    Ghost
                  </Button>
                  <Button variant="link" color="danger" href="/">
                    Link
                  </Button>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <p className="mb-3 text-sm text-muted">Neutral</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="solid" color="neutral">
                    Solid
                  </Button>
                  <Button variant="outline" color="neutral">
                    Outline
                  </Button>
                  <Button variant="ghost" color="neutral">
                    Ghost
                  </Button>
                  <Button variant="link" color="neutral" href="/">
                    Link
                  </Button>
                </div>
              </div>

              {/* Icon */}
              <div>
                <p className="mb-3 text-sm text-muted">Icon</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="icon" color="primary" aria-label="Add item">
                    <PlusIcon />
                  </Button>
                  <Button variant="icon" color="danger" aria-label="Delete item">
                    <TrashIcon />
                  </Button>
                  <Button variant="icon" color="neutral" aria-label="Open menu">
                    <MenuIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-outline bg-surface p-6">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* States */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">States</h3>
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-outline bg-surface p-6">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading</Button>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h3 className="mb-4 font-medium text-lg text-sub">Full Width</h3>
            <div className="rounded-xl border border-outline bg-surface p-6">
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Inputs</h2>

          {/* Basic */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Basic</h3>
            <div className="max-w-md space-y-4 rounded-xl border border-outline bg-surface p-6">
              <Input placeholder="Placeholder text" />
              <Input label="With Label" placeholder="Enter your name" />
              <Input label="With Value" defaultValue="Hello World" />
            </div>
          </div>

          {/* States */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">States</h3>
            <div className="max-w-md space-y-4 rounded-xl border border-outline bg-surface p-6">
              <Input label="Default" placeholder="Default state" />
              <Input label="Disabled" placeholder="Disabled state" disabled />
              <Input label="With Error" placeholder="Error state" error="This field is required" />
            </div>
          </div>

          {/* Types */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Types</h3>
            <div className="max-w-md space-y-4 rounded-xl border border-outline bg-surface p-6">
              <Input
                label="Text"
                type="text"
                placeholder="Text input"
                required
                minLength={2}
                maxLength={50}
              />
              <Input label="Email" type="email" placeholder="email@example.com" required />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                required
                minLength={8}
              />
              <Input label="Number" type="number" placeholder="0" required min={0} max={100} />
            </div>
          </div>

          {/* Controlled */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-sub">Controlled (react-hook-form)</h3>
            <div className="max-w-md space-y-4 rounded-xl border border-outline bg-surface p-6">
              <ControlledInput
                control={control}
                name="email"
                label="Email"
                type="email"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Uncontrolled with Validation */}
          <div>
            <h3 className="mb-4 font-medium text-lg text-sub">
              Uncontrolled with Validation (register)
            </h3>
            <div className="max-w-md space-y-4 rounded-xl border border-outline bg-surface p-6">
              <Input
                label="Name"
                placeholder="Enter your name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Usage Guide</h2>

          <div className="rounded-xl border border-outline bg-surface p-6">
            <h3 className="mb-4 font-medium text-lg text-main">Tailwind Classes</h3>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-sub">
                <span className="text-brand-500">bg-canvas</span> - Page background
              </p>
              <p className="text-sub">
                <span className="text-brand-500">bg-surface</span> - Card background
              </p>
              <p className="text-sub">
                <span className="text-brand-500">text-main</span> - Primary text
              </p>
              <p className="text-sub">
                <span className="text-brand-500">text-sub</span> - Secondary text
              </p>
              <p className="text-sub">
                <span className="text-brand-500">border-outline</span> - Border color
              </p>
              <p className="text-sub">
                <span className="text-brand-500">bg-action hover:bg-action-hover</span> - Button
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
