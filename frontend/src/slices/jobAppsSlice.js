import { createSlice } from "@reduxjs/toolkit";

const jobAppSlice = createSlice({
  name: "jobApps",
  initialState: {
    jobApps: [],
    isLoading: false,
  },
  reducers: {
    getCompanyApps: (state, action) => {
      state.jobApps = action.payload.payload;
    },
  },
});

export const { getCompanyApps } = jobAppSlice.actions;

export default jobAppSlice;
