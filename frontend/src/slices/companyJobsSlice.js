import { createSlice } from "@reduxjs/toolkit";

const companyJobsSlice = createSlice({
  name: "companyJobs",
  initialState: {
    companyJobs: [],
    isLoading: false,
  },
  reducers: {
    getCompanyJobs: (state, action) => {
      state.companyJobs = action.payload.payload;
    },
  },
});

export const { getCompanyJobs } = companyJobsSlice.actions;

export default companyJobsSlice;
