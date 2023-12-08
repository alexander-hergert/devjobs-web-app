import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    isLoading: false,
  },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload.payload;
    },
  },
});

export const { getMessages } = messagesSlice.actions;

export default messagesSlice;
