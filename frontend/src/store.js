import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todosSlice";
import { apiSlice } from "./api/apiSlice";

//Example store and slices
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  //localStorage.setItem("todos", JSON.stringify(state.todos));
});

export default store;
