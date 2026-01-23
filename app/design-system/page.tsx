"use client";

import { useState } from "react";

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen p-8`}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="font-bold text-4xl text-text-primary">Design System</h1>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg bg-interactive-primary px-4 py-2 text-text-inverse transition-colors hover:bg-interactive-primary-hover"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Colors</h2>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-text-secondary">Primary</h3>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className={`h-12 rounded-md bg-primary-${shade}`}
                    style={{
                      backgroundColor: `var(--primary-${shade})`,
                    }}
                  />
                  <span className="mt-1 block text-text-tertiary text-xs">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gray Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-text-secondary">Gray</h3>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-11">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                <div key={shade} className="text-center">
                  <div
                    className="h-12 rounded-md"
                    style={{
                      backgroundColor: `var(--gray-${shade})`,
                    }}
                  />
                  <span className="mt-1 block text-text-tertiary text-xs">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-8">
            <h3 className="mb-4 font-medium text-lg text-text-secondary">Semantic</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-12 rounded-md bg-success-500" />
                <span className="mt-1 block text-text-tertiary text-xs">Success</span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-warning-500" />
                <span className="mt-1 block text-text-tertiary text-xs">Warning</span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-error-500" />
                <span className="mt-1 block text-text-tertiary text-xs">Error</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Typography</h2>

          <div className="space-y-4 rounded-xl border border-border-primary bg-surface-primary p-6">
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">4xl</span>
              <p className="font-bold text-4xl text-text-primary">Display Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">3xl</span>
              <p className="font-semibold text-3xl text-text-primary">Heading 1</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">2xl</span>
              <p className="font-semibold text-2xl text-text-primary">Heading 2</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">xl</span>
              <p className="font-medium text-text-primary text-xl">Heading 3</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">lg</span>
              <p className="text-lg text-text-primary">Large Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">base</span>
              <p className="text-base text-text-primary">Body Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">sm</span>
              <p className="text-sm text-text-secondary">Small Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="w-16 text-text-tertiary text-xs">xs</span>
              <p className="text-text-tertiary text-xs">Caption Text</p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Spacing</h2>

          <div className="space-y-3 rounded-xl border border-border-primary bg-surface-primary p-6">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((space) => (
              <div key={space} className="flex items-center gap-4">
                <span className="w-12 text-text-tertiary text-xs">space-{space}</span>
                <div
                  className="h-4 rounded bg-primary-500"
                  style={{ width: `var(--space-${space})` }}
                />
                <span className="text-text-tertiary text-xs">{space * 4}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Border Radius</h2>

          <div className="flex flex-wrap gap-6">
            {["sm", "md", "lg", "xl", "full"].map((radius) => (
              <div key={radius} className="text-center">
                <div
                  className={`h-16 w-16 bg-primary-500 rounded-${radius}`}
                  style={{ borderRadius: `var(--radius-${radius})` }}
                />
                <span className="mt-2 block text-text-tertiary text-xs">{radius}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Surfaces Section */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Surfaces</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border-primary bg-surface-primary p-6">
              <p className="font-medium text-sm text-text-primary">Surface Primary</p>
              <p className="mt-1 text-text-secondary text-xs">Cards, main content areas</p>
            </div>
            <div className="rounded-xl border border-border-primary bg-surface-secondary p-6">
              <p className="font-medium text-sm text-text-primary">Surface Secondary</p>
              <p className="mt-1 text-text-secondary text-xs">Nested containers</p>
            </div>
            <div className="rounded-xl border border-border-primary bg-surface-elevated p-6 shadow-lg">
              <p className="font-medium text-sm text-text-primary">Surface Elevated</p>
              <p className="mt-1 text-text-secondary text-xs">Modals, popovers</p>
            </div>
          </div>
        </section>

        {/* Buttons Example */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Interactive Examples</h2>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-lg bg-interactive-primary px-4 py-2 text-text-inverse transition-colors hover:bg-interactive-primary-hover"
            >
              Primary Button
            </button>
            <button
              type="button"
              className="rounded-lg border border-border-primary bg-interactive-secondary px-4 py-2 text-text-primary transition-colors hover:bg-interactive-secondary-hover"
            >
              Secondary Button
            </button>
            <button
              type="button"
              className="rounded-lg bg-success-500 px-4 py-2 text-white transition-colors hover:bg-success-600"
            >
              Success
            </button>
            <button
              type="button"
              className="rounded-lg bg-error-500 px-4 py-2 text-white transition-colors hover:bg-error-600"
            >
              Error
            </button>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-16">
          <h2 className="mb-6 font-semibold text-2xl text-text-primary">Usage Guide</h2>

          <div className="rounded-xl border border-border-primary bg-surface-primary p-6">
            <h3 className="mb-4 font-medium text-lg text-text-primary">Tailwind Classes</h3>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-text-secondary">
                <span className="text-primary-500">bg-primary-500</span> - Primary color background
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">text-text-primary</span> - Primary text color
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">bg-surface-primary</span> - Card background
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">border-border-primary</span> - Border color
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">
                  bg-interactive-primary hover:bg-interactive-primary-hover
                </span>{" "}
                - Button
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
