import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isVisible: false,
    openDialog: false,
    openEditDialog: false,
  },
  reducers: {
    handleVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    handleDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    handleEditDialog: (state, action) => {
      state.openEditDialog = action.payload
    }
  },
});

export const { handleVisibility, handleDialog, handleEditDialog } = menuSlice.actions;
export default menuSlice.reducer;
