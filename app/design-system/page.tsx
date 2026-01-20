"use client";

import { useState } from "react";

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen p-8 ${isDark ? "dark" : ""}`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary">
            Design System
          </h1>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-interactive-primary text-text-inverse rounded-lg hover:bg-interactive-primary-hover transition-colors"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Colors
          </h2>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-secondary mb-4">
              Primary
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`h-12 rounded-md bg-primary-${shade}`}
                      style={{
                        backgroundColor: `var(--primary-${shade})`,
                      }}
                    />
                    <span className="text-xs text-text-tertiary mt-1 block">
                      {shade}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Gray Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-secondary mb-4">
              Gray
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
                (shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className="h-12 rounded-md"
                      style={{
                        backgroundColor: `var(--gray-${shade})`,
                      }}
                    />
                    <span className="text-xs text-text-tertiary mt-1 block">
                      {shade}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text-secondary mb-4">
              Semantic
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-12 rounded-md bg-success-500" />
                <span className="text-xs text-text-tertiary mt-1 block">
                  Success
                </span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-warning-500" />
                <span className="text-xs text-text-tertiary mt-1 block">
                  Warning
                </span>
              </div>
              <div>
                <div className="h-12 rounded-md bg-error-500" />
                <span className="text-xs text-text-tertiary mt-1 block">
                  Error
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Typography
          </h2>

          <div className="space-y-4 bg-surface-primary p-6 rounded-xl border border-border-primary">
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">4xl</span>
              <p className="text-4xl font-bold text-text-primary">
                Display Text
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">3xl</span>
              <p className="text-3xl font-semibold text-text-primary">
                Heading 1
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">2xl</span>
              <p className="text-2xl font-semibold text-text-primary">
                Heading 2
              </p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">xl</span>
              <p className="text-xl font-medium text-text-primary">Heading 3</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">lg</span>
              <p className="text-lg text-text-primary">Large Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">base</span>
              <p className="text-base text-text-primary">Body Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">sm</span>
              <p className="text-sm text-text-secondary">Small Text</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-text-tertiary w-16">xs</span>
              <p className="text-xs text-text-tertiary">Caption Text</p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Spacing
          </h2>

          <div className="space-y-3 bg-surface-primary p-6 rounded-xl border border-border-primary">
            {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((space) => (
              <div key={space} className="flex items-center gap-4">
                <span className="text-xs text-text-tertiary w-12">
                  space-{space}
                </span>
                <div
                  className="h-4 bg-primary-500 rounded"
                  style={{ width: `var(--space-${space})` }}
                />
                <span className="text-xs text-text-tertiary">
                  {space * 4}px
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Border Radius
          </h2>

          <div className="flex flex-wrap gap-6">
            {["sm", "md", "lg", "xl", "full"].map((radius) => (
              <div key={radius} className="text-center">
                <div
                  className={`w-16 h-16 bg-primary-500 rounded-${radius}`}
                  style={{ borderRadius: `var(--radius-${radius})` }}
                />
                <span className="text-xs text-text-tertiary mt-2 block">
                  {radius}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Surfaces Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Surfaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-surface-primary border border-border-primary">
              <p className="text-sm font-medium text-text-primary">
                Surface Primary
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Cards, main content areas
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-secondary border border-border-primary">
              <p className="text-sm font-medium text-text-primary">
                Surface Secondary
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Nested containers
              </p>
            </div>
            <div className="p-6 rounded-xl bg-surface-elevated border border-border-primary shadow-lg">
              <p className="text-sm font-medium text-text-primary">
                Surface Elevated
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Modals, popovers
              </p>
            </div>
          </div>
        </section>

        {/* Buttons Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Interactive Examples
          </h2>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-interactive-primary text-text-inverse rounded-lg hover:bg-interactive-primary-hover transition-colors"
            >
              Primary Button
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-interactive-secondary text-text-primary rounded-lg hover:bg-interactive-secondary-hover transition-colors border border-border-primary"
            >
              Secondary Button
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
            >
              Success
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-colors"
            >
              Error
            </button>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            Usage Guide
          </h2>

          <div className="bg-surface-primary p-6 rounded-xl border border-border-primary">
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Tailwind Classes
            </h3>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-text-secondary">
                <span className="text-primary-500">bg-primary-500</span> -
                Primary color background
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">text-text-primary</span> -
                Primary text color
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">bg-surface-primary</span> -
                Card background
              </p>
              <p className="text-text-secondary">
                <span className="text-primary-500">border-border-primary</span>{" "}
                - Border color
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
