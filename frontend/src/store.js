import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/jobsSlice";
import companyJobsSlice from "./slices/companyJobsSlice";
import userSlice from "./slices/userSlice";
import appsSlice from "./slices/appsSlice";
import themeSlice from "./slices/themeSlice";
import totalJobsSlice from "./slices/totalJobsSlice";
import paginationSlice from "./slices/paginationSlice";
import jobAppSlice from "./slices/jobAppsSlice";
import messagesSlice from "./slices/messagesSlice";
import repliesSlice from "./slices/repliesSlice";
import allUsersSlice from "./slices/allUsersSlice";
//import { apiSlice } from "./api/apiSlice";

//Example store and slices
const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
    user: userSlice.reducer,
    apps: appsSlice.reducer,
    theme: themeSlice.reducer,
    pagination: paginationSlice.reducer,
    totalJobs: totalJobsSlice.reducer,
    companyJobs: companyJobsSlice.reducer,
    jobApps: jobAppSlice.reducer,
    messages: messagesSlice.reducer,
    replies: repliesSlice.reducer,
    allUsers: allUsersSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("theme", JSON.stringify(state.theme));
});

export default store;
