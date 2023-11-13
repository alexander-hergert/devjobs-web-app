import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    isLoading: false,
  },
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload.payload;
    },
    getSingleJob: (state, action) => {
      state.jobs = action.payload.payload;
    },
    //Async operations
  },
});

export const { getJobs, getSingleJob } =
  jobsSlice.actions;

export default jobsSlice;
