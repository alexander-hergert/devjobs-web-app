import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    isLoading: true,
  },
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload.jobs;
      state.isLoading = action.payload.isLoading;
    },
    getSingleJob: (state, action) => {
      state.jobs = action.payload.jobs;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { getJobs, getSingleJob } = jobsSlice.actions;

export default jobsSlice;
