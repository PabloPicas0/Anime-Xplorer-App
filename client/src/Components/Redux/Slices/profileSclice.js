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

      state.profileFields = event.target.value;
    },
  },
});

export const { handleProfile } = profileSlice.actions;
export default profileSlice.reducer;
