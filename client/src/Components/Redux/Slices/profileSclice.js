import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import url from "../../Utils/api";

import { handleError } from "./statusSlice";

export const loadUser = createAsyncThunk("profile/loadUser", async (username, { dispatch }) => {
  const currentToken = localStorage.getItem("token");

  if (!currentToken) {
    dispatch(
      handleError({
        refreshError: true,
        errorMessage: [{ msg: "You don't have profile token. Please login or sign up." }],
      })
    );

    return {
      error: true,
      status: [{ msg: "You don't have profile token. Please login or sign up." }],
      profile: {
        username: "",
        date: 0,
        options: [],
        list: [],
      },
      isAuthenticated: false,
    };
  }

  try {
    const request = await fetch(`${url}/api/login/data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${currentToken}`,
      },
      body: `username=${username}`,
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
      error: true,
      status: [{ msg: "Something went wrong. Please refresh the page." }],
      isAuthenticated: false,
      profile: {
        username: "",
        date: 0,
        options: [],
        list: [],
      },
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
      const { type, data } = action.payload;
      const { list } = state.profileFields;

      switch (type) {
        case "changeEpisode":
          state.profileFields.list = list.map((anime) => {
            if (anime.animeName === data.title) {
              anime.currentEpisode = data.newEp;
            }
            return anime;
          });
          break;
        case "addToList":
          const newList = [...list];
          newList.push(data);
          state.profileFields.list = newList;
          break;
        case "editList":
          state.profileFields.list = list.map((anime) => {
            if (anime.animeName === data.title) {
              anime.currentEpisode = data.currentEpisode;
              anime.score = data.score;
              anime.animeType = data.animeType;
              anime.animeStatus = data.animeStatus;
              anime.endWatching === 0 && data.animeStatus === "Completed"
                ? (anime.endWatching = new Date().getTime())
                : null;
            }
            return anime;
          });
          break;
        case "deleteTitle":
          const titleIndex = list.findIndex((title) => title.animeName === data);
          const updatedList = list.toSpliced(titleIndex, 1);
          state.profileFields.list = updatedList;
          break;
        default:
          state.profileFields.list = data;
      }
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
    handleReset: () => {
      return {
        profileFields: {
          username: "",
          date: 0,
          options: [],
          list: [],
        },
        showBy: "All anime",
        isAuthenticated: false,
      };
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
  handleReset,
} = profileSlice.actions;
export default profileSlice.reducer;
