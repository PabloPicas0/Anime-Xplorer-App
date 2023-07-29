import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../Slices/LoginSclice";

export default configureStore({
  reducer: {
    profile: profileSlice,
  },
});
