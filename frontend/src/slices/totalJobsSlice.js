import { createSlice } from "@reduxjs/toolkit";

const totalJobsSlice = createSlice({
  name: "totalJobs",
  initialState: {
    totalJobs: 0,
    isLoading: false,
  },
  reducers: {
    getTotalJobs: (state, action) => {
      state.totalJobs = action.payload.payload;
    },
  },
});

export const { getTotalJobs } = totalJobsSlice.actions;

export default totalJobsSlice;
