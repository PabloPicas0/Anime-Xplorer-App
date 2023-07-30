import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "../Slices/profileSclice";
import menuSlice from "../Slices/menuSlice";

export default configureStore({
  reducer: {
    profile: profileSlice,
    menu: menuSlice,
  },
});
