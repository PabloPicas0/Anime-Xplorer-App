import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Slices/profileSclice";
import menuReducer from "../Slices/menuSlice";
import statusReducer from "../Slices/statusSlice";
import statisticsReducer from "../Slices/statisticsSlice";

export default configureStore({
  reducer: {
    profile: profileReducer,
    menu: menuReducer,
    status: statusReducer,
    statistics: statisticsReducer,
  },
});
