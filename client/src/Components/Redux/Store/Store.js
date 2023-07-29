import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../Slices/profileSclice";

export default configureStore({
  reducer: {
    profile: profileSlice,
  },
});
