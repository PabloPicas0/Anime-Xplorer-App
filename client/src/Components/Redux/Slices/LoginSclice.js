import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFields: {},
    isAuthenticated: false,
  },
  reducers: {
    handleProfile: (state, action) => {
      const { index, event } = action.payload;

      state.loginFields[index].value = event.target.value;
    },
    handleStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { handleProfile, handleStatus } = profileSlice.actions;
export default profileSlice.reducer;
