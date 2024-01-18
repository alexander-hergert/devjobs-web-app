import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    allUsers: [],
    isLoading: true,
  },
  reducers: {
    getUsers: (state, action) => {
      state.allUsers = action.payload.allUsers;
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { getUsers } = allUsersSlice.actions;

export default allUsersSlice;
