import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginFields: [
      {
        id: "username",
        label: "Username",
        type: "text",
        value: "",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        value: "",
      },
    ],
  },
  reducers: {
    handleValue: (state, action) => {
      const { index, event } = action.payload;
      state.loginFields[index].value = event.target.value;
    },
  },
});

export const { handleValue } = loginSlice.actions;
export default loginSlice.reducer;
