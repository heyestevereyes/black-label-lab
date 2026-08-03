import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-space-mono)", "monospace"],
        sans: ["var(--font-space-mono)", "monospace"],
        // Hero headline only — 403 Neudron.
        hero: ["var(--font-hero)", "monospace"],
      },
      // Semantic aliases over the CSS custom properties in globals.css.
      colors: {
        surface: "var(--bg-primary)",
        elevated: "var(--bg-elevated)",
        ink: "var(--text-primary)",
        muted: "var(--text-secondary)",
        hairline: "var(--border-subtle)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
export default config;
