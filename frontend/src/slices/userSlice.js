import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
