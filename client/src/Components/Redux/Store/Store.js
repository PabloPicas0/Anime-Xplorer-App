import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Slices/LoginSclice";

export default configureStore({
  reducer: {
    login: loginSlice,
  },
});
