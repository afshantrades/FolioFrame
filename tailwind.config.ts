import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": "#0F172A",
        "pastel-blue": "#A9C4F2",
        "mist-blue": "#E6EEFB",
        "warm-ivory": "#F6F2E8",
        "slate-blue-grey": "#64748B",
        "soft-white": "#FAFBFD",
        "champagne-line": "#D9B76E",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
