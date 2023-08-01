import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFields: {},
    showByStatus: "All anime",
    isAuthenticated: false,
  },
  reducers: {
    handleProfile: (state, action) => {
      state.profileFields = action.payload;
    },
    handleClientList: (state, action) => {
      state.profileFields.list = action.payload;
    },
    handleUserSortingStatus: (state, action) => {
      state.showByStatus = action.payload;
    },
    handleAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { handleProfile, handleAuthentication, handleClientList, handleUserSortingStatus } =
  profileSlice.actions;
export default profileSlice.reducer;
