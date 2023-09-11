import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      display: ["Gilroy", "sans-serif"],
      body: ["Graphik", "sans-serif"],
    },
    borderWidth: {
      default: "1px",
      0: "0",
      2: "2px",
      4: "4px",
    },
    extend: {
      colors: {
        forest: "#799370",
      },
      spacing: {
        96: "24rem",
        128: "32rem",
      },
    },
    darkTheme: false,
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FAD1CF",
          "primary-light": "#FFEEED",
          secondary: "#FFFAEE",
          tertiary: "#799370",
          "base-100": "#ffffff",
          accent: "#799370",
          neutral: "#d4d4d4",
          info: "#3c8fe2",
          success: "#1e8f51",
          warning: "#f1991e",
          error: "#ed2c52",
        },
      },
    ],
  },
};
