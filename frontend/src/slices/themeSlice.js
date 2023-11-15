import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light", // "light" or "dark
  reducers: {
    setTheme: (state, action) => {
      if (state === "light") {
        return (state = "dark");
      }
      return (state = "light");
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice;
