import { createSlice } from "@reduxjs/toolkit";

const appsSlice = createSlice({
  name: "apps",
  initialState: {
    apps: {},
    isLoading: false,
  },
  reducers: {
    getApps: (state, action) => {
      state.apps = action.payload.payload;
    },
    //Async operations
  },
});

export const { getApps } = appsSlice.actions;

export default appsSlice;
