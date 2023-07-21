import { configureStore } from "@reduxjs/toolkit";
import isSettingsReducer from "../State/isSettingsSlice"

export default configureStore({
  reducer: {
    isSettings: isSettingsReducer
  },
});
