import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFields: {},
    isAuthenticated: false,
  },
  reducers: {
    handleProfile: (state, action) => {
      state.profileFields = action.payload;
    },
    handleClientList: (state, action) => {
      state.profileFields.list = action.payload;
    },
    handleAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { handleProfile, handleAuthentication, handleClientList } = profileSlice.actions;
export default profileSlice.reducer;
