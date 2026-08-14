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
        // Satoshi es la principal: titulares, hero y títulos de sección
        // grandes. Se carga desde Fontshare con un <link> en el layout, no
        // por next/font, así que va por nombre y no por variable CSS.
        satoshi: ["Satoshi", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
        // Space Mono se conserva para body copy, subheaders y labels.
        mono: ["var(--font-space-mono)", "monospace"],
        // 403 Neudron. Sin uso desde que Satoshi tomó el rol de display;
        // se deja registrada por si vuelve a hacer falta.
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
