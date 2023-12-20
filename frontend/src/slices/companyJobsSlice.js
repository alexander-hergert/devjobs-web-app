import { createSlice } from "@reduxjs/toolkit";

const companyJobsSlice = createSlice({
  name: "companyJobs",
  initialState: {
    companyJobs: [],
    isLoading: true,
  },
  reducers: {
    getCompanyJobs: (state, action) => {
      state.companyJobs = action.payload.companyJobs;
      state.isLoading = false;
    },
  },
});

export const { getCompanyJobs } = companyJobsSlice.actions;

export default companyJobsSlice;
