import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    isLoading: false,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;

export default paginationSlice;
