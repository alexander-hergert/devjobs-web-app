import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/jobsSlice";
import { apiSlice } from "./api/apiSlice";

//Example store and slices
const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("jobs", JSON.stringify(state.jobs));
});

export default store;
