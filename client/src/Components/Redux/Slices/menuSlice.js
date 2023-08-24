import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isVisible: false,
    openDialog: false,
  },
  reducers: {
    handleVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    handleDialog: (state, action) => {
      state.openDialog = action.payload;
    },
  },
});

export const { handleVisibility, handleDialog } = menuSlice.actions;
export default menuSlice.reducer;
