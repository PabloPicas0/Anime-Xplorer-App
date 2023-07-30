import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    error: false,
    status: [{ msg: "" }],
  },
  reducers: {
    handleStatus: (state, action) => {
      state.error = action.payload.error;
      state.status = action.payload.status;
    },
  },
});

export const { handleStatus } = statusSlice.actions;
export default statusSlice.reducer;
