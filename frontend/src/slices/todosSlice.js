import { createSlice } from "@reduxjs/toolkit";

//Example slice remove what you not use
const todosSlice = createSlice({
  name: "todos",
  //initialState: [],
  initialState: {
    todos: [],
    isLoading: false,
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
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

export const { addTodo, removeTodo, updateTodo, clearTodos, getTodos } =
  todosSlice.actions;

export default todosSlice;
