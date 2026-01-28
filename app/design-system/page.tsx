"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui";

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-canvas p-8">
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
          <h2 className="mb-6 font-semibold text-2xl text-main">Typography</h2>

          <div className="space-y-4 rounded-xl border border-outline bg-surface p-6">
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">4xl</span>
              <p className="font-bold text-4xl text-main">Display Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">3xl</span>
              <p className="font-semibold text-3xl text-main">Heading 1</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">2xl</span>
              <p className="font-semibold text-2xl text-main">Heading 2</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">xl</span>
              <p className="font-medium text-main text-xl">Heading 3</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">lg</span>
              <p className="text-lg text-main">Large Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">base</span>
              <p className="text-base text-main">Body Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">sm</span>
              <p className="text-sm text-sub">Small Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-muted text-xs">xs</span>
              <p className="text-muted text-xs">Caption Text</p>
            </div>
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

        {/* Buttons Example */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-main">Interactive Examples</h2>

          <div className="flex flex-wrap gap-4">
            <Button size="sm" color="primary">
              Primary Button
            </Button>
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
