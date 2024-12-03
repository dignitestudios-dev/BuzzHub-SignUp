/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1D7C42",
        secondary: "#E8F2EC",
        light: "#F3F3F3",
      },
      colors: {
        primary: "#1D7C42",
        secondary: "#5E5F62",
        dark: "#0E1014",
      },
      boxShadow: {
        "custom-border": "0px 8px 24px rgba(149, 157, 165, 0.2)",
        "custom-light": "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      },
    },
  },
  plugins: [],
};
