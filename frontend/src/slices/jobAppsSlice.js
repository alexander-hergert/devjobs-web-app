import { createSlice } from "@reduxjs/toolkit";

const jobAppSlice = createSlice({
  name: "jobApps",
  initialState: {
    jobApps: [],
    isLoading: false,
  },
  reducers: {
    getCompanyApps: (state, action) => {
      state.jobApps = action.payload.jobApps;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { getCompanyApps } = jobAppSlice.actions;

export default jobAppSlice;
