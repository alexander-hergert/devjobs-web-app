import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/jobsSlice";
import userSlice from "./slices/userSlice";
import appsSlice from "./slices/appsSlice";
//import { apiSlice } from "./api/apiSlice";

//Example store and slices
const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
    user: userSlice.reducer,
    apps: appsSlice.reducer,
    //[apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  //localStorage.setItem("jobs", JSON.stringify(state.jobs));
});

export default store;
