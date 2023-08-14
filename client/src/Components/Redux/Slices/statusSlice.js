import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    error: false,
    refreshError: false,
    status: [{ msg: "" }],
  },
  reducers: {
    handleError: (state, action) => {
      state.refreshError = action.payload.refreshError || false;
      state.error = action.payload.error || false;
      state.status = action.payload.status;
    },
  },
});

export const { handleError, handleRefresh } = statusSlice.actions;
export default statusSlice.reducer;
