import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        grayish: "#9495A5",
        darkLight: "#C8CBE7",
        darkFade: "#4D5067",
        darkGray: "#5B5E7E",
        lightGray: "#D1D2DA",
        dark: "#494C6B",
        active: "#3A7CFD",
        darkLine: "#393A4B",
        darkGrayish: "#979797"
      },
      fontSize: {
        "title": "1.8rem",
        regular: "1rem",
        small: "1.17rem"
      },
      borderColor: {
        grayish: "#D1D2DA",
        darkLine: "#393A4B",
        grayLine: "#E3E4F1"
      },
      backgroundColor: {
        darkBlue: "#25273D",
        dark: "#171823"
      }
    },
  },
  plugins: [],
};
export default config;
