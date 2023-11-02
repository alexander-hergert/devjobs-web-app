import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    isLoading: false,
  },
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload;
    },
    removeTodo: (state, action) => {
      //return state.todos.filter((todo) => todo.id !== action.payload);
      state.todos.forEach((todo, index) => {
        if (todo.id === action.payload) {
          state.todos.splice(index, 1);
        }
      });
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

export const { getJobs, removeTodo, updateTodo, clearTodos, getTodos } =
  jobsSlice.actions;

export default jobsSlice;
