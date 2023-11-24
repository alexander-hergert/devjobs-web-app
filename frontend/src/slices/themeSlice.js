import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light", // "light" or "dark
  reducers: {
    setTheme: (state, action) => {
      return (state = action.payload.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice;
