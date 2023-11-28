import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        isLoading: action.payload.isLoading,
      };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
