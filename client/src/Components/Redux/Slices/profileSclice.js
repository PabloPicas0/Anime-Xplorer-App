import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import url from "../../Utils/api";

import { handleRefresh } from "./statusSlice";

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
      handleRefresh({
        error: response.error,
        status: response.status,
      })
    );

    return response;
  } catch (error) {
    console.error(error);

    dispatch(
      handleRefresh({
        error: true,
        status: [{ msg: "Something went wrong. Please refresh the page." }],
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
    showByStatus: "All anime",
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  },
  reducers: {
    handleProfile: (state, action) => {
      localStorage.setItem("token", action.payload.token);

      state.profileFields = action.payload.profile;
      state.token = action.payload.token;
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
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.profileFields = action.payload.profile;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const { handleProfile, handleAuthentication, handleClientList, handleUserSortingStatus } =
  profileSlice.actions;
export default profileSlice.reducer;
