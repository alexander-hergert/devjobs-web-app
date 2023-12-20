import { createSlice } from "@reduxjs/toolkit";

const appsSlice = createSlice({
  name: "apps",
  initialState: {
    apps: {},
    isLoading: true,
  },
  reducers: {
    getApps: (state, action) => {
      state.apps = action.payload.apps;
      state.isLoading = false;
    },
  },
});

export const { getApps } = appsSlice.actions;

export default appsSlice;
