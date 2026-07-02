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
        "ink-navy": "#061B3D",
        "warm-ivory": "#F8F4EC",
        "folio-blue": "#8FB6F0",
        graphite: "#273248",
        mist: "#EAF1FB",
        "deep-navy": "#061B3D",
        "pastel-blue": "#8FB6F0",
        "mist-blue": "#EAF1FB",
        "slate-blue-grey": "#273248",
        "soft-white": "#FAFBFD",
        "champagne-line": "#D9B76E",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(6, 27, 61, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
