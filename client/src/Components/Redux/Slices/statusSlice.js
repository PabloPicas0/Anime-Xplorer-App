import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    error: false,
    refreshError: false,
    status: [{ msg: "" }],
  },
  reducers: {
    handleStatus: (state, action) => {
      state.error = action.payload.error;
      state.status = action.payload.status;
    },
    handleRefresh: (state, action) => {
      state.refreshError = action.payload.error
      state.status = action.payload.status
    }
  },
});

export const { handleStatus, handleRefresh } = statusSlice.actions;
export default statusSlice.reducer;
