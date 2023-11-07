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
    updateTodo: (state, action) => {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.text;
        }
      });
    },
    clearTodos: (state, action) => {
      state.todos = [];
    },
    getTodos: (state, action) => {
      state = action.payload;
      return state;
    },
    //Async operations
  },
});

export const { getJobs, getSingleJob, updateTodo, clearTodos, getTodos } =
  jobsSlice.actions;

export default jobsSlice;
