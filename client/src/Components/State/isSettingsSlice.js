import { createSlice } from "@reduxjs/toolkit";

const isSettingsSlice = createSlice({
  name: "isSettings",
  initialState: false,
  reducers: {
    changeNav: (state) => {
      return (state = !state);
    },
  },
});

export const { changeNav } = isSettingsSlice.actions;
export default isSettingsSlice.reducer;
