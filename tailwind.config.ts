import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sbux: {
          green: '#006241',
          lightGreen: '#00754a',
          darkGreen: '#1e3932',
          accent: '#d4e9e2',
          cream: '#f2f0eb',
          gold: '#cba258',
          espresso: '#211c1d'
        }
      },
    },
  },
  plugins: [],
};
export default config;
