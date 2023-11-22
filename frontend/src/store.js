import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/jobsSlice";
import userSlice from "./slices/userSlice";
import appsSlice from "./slices/appsSlice";
import themeSlice from "./slices/themeSlice";
import totalJobsSlice from "./slices/totalJobsSlice";
import paginationSlice from "./slices/paginationSlice";
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
    //[apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("theme", JSON.stringify(state.theme));
});

export default store;
