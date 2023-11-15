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
          accent: "#5964e0",
          info: "#939bf4",
          warning: "#e2e6ea", //border
        },
        dark: {
          "base-100": "#121721", //background
          neutral: "#19202d", //element
          primary: "#ffffff", //text
          secondary: "#ffffff", //input
          accent: "#5964e0",
          info: "#939bf4",
          warning: "#2a3342",
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
