import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import url from "../../Utils/api";

import { handleError } from "./statusSlice";

export const loadUser = createAsyncThunk("profile/loadUser", async (_, { dispatch }) => {
  const currentToken = localStorage.getItem("token");

  try {
    const request = await fetch(`${url}/api/login`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    const response = await request.json();

    dispatch(
      handleError({
        refreshError: response.error,
        errorMessage: response.status,
      })
    );

    return response;
  } catch (error) {
    console.error(error);

    dispatch(
      handleError({
        refreshError: true,
        errorMessage: [{ msg: "Something went wrong. Please refresh the page." }],
      })
    );

    return {
      isAuthenticated: false,
    };
  }
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileFields: {
      username: "",
      date: 0,
      options: [],
      list: [],
    },
    showBy: "All anime",
    isAuthenticated: false,
  },
  reducers: {
    handleProfile: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      state.profileFields = action.payload.profile;
      state.showBy = action.payload.profile.options[0].defaultListFilter;
    },
    handleClientList: (state, action) => {
      state.profileFields.list = action.payload;
    },
    handleUserSortingStatus: (state, action) => {
      state.showBy = action.payload;
    },
    handleAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    handleProfileSettings: (state, action) => {
      const { optionType } = action.payload;

      optionType
        ? (state.profileFields.options[0][action.payload.optionType] = action.payload.value)
        : (state.profileFields.options = action.payload.value);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      const { error } = action.payload;

      state.profileFields = action.payload.profile;
      state.showBy = error ? "All anime" : action.payload.profile.options[0].defaultListFilter; // check if payload have error - profile.options == [] if error exists
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const {
  handleProfile,
  handleAuthentication,
  handleClientList,
  handleUserSortingStatus,
  handleProfileSettings,
} = profileSlice.actions;
export default profileSlice.reducer;
