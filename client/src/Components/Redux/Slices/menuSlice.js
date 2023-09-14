import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isVisible: false,
    openDialog: false,
    sort: false,
  },
  reducers: {
    handleVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    handleDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    handleSort: (state, action) => {
      state.sort = action.payload
    }
  },
});

export const { handleVisibility, handleDialog, handleSort } = menuSlice.actions;
export default menuSlice.reducer;
