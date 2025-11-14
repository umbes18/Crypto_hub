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
        'rh-green': '#00C805',
        'rh-red': '#FF5000',
        'rh-bg': '#000000',
        'rh-surface': '#1C1C1E',
        'rh-border': '#2C2C2E',
        'rh-text': '#FFFFFF',
        'rh-text-secondary': '#8E8E93',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
