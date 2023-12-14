import { createSlice } from "@reduxjs/toolkit";

const repliesSlice = createSlice({
  name: "replies",
  initialState: {
    replies: [],
    isLoading: false,
  },
  reducers: {
    getReplies: (state, action) => {
      state.replies = action.payload.replies;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { getReplies } = repliesSlice.actions;

export default repliesSlice;
