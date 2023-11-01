/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "#f4f6f8", //background
          neutral: "#ffffff", //element
          primary: "#141516", //text
          secondary: "#b7b7b7", //input
          accent: "#ffffff", //borders
        },
        dark: {
          "base-100": "#19202d", //background
          neutral: "#121721", //element
          primary: "#ffffff", //text
          secondary: "#ffffff", //input
          accent: "#000000", //borders
        },
      },
    ],
    lightTheme: "light",
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
};
