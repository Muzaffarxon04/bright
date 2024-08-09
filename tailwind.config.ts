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
        inter: ["var(--font-inter)"],
        raleway: ["var(--font-raleway)"],
      },
      fontSize: {
        default: "16px",
      },
      colors: {
        accentColor: "#a87c4f",
        bgColor: "#fff7f0",
        textColor: "#131313",
        secondaryColor: "#6d758f",
        errorColor: "#DD2F2F",
      },
    },
  },
  plugins: [],
};
export default config;
