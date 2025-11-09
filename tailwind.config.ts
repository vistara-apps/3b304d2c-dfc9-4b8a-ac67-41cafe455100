import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        fg: "var(--color-fg)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        primary: "var(--color-primary)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 8px 24px hsla(221, 83%, 53%, 0.12)",
        elevate: "0px 4px 12px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
