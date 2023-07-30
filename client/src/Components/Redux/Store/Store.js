import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Slices/profileSclice";
import menuReducer from "../Slices/menuSlice";
import statusReducer from "../Slices/statusSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
    menu: menuReducer,
    status: statusReducer,
  },
});
