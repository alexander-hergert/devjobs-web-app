import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isLoading: false,
  },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload.messages;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { getMessages } = messagesSlice.actions;

export default messagesSlice;
