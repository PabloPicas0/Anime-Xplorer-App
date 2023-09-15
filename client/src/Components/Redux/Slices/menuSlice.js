import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isVisible: false,
    openDialog: false,
    sort: false,
    filter: false,
    showSearch: false,
    showType: false,
    showScore: false,
    showDate: false,
  },
  reducers: {
    handleVisibility: (state, action) => {
      state.isVisible = action.payload;
    },
    handleDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    handleSort: (state, action) => {
      state.sort = action.payload;
    },
    handleFilter: (state, action) => {
      const { type, isActive } = action.payload;
      state[type] = isActive;
    },
  },
});

export const { handleVisibility, handleDialog, handleSort, handleFilter } = menuSlice.actions;
export default menuSlice.reducer;
