import { createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://localhost:3000/user";

// Async thunk for fetching todos
export const fetchTodo = createAsyncThunk("addTodo", async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const modifiedData = { id: data.id, text: data.todo };
    return modifiedData;
  } catch (error) {
    //
  }
});
