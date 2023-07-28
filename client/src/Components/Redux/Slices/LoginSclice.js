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
    status: {},
  },
  reducers: {
    handleValue: (state, action) => {
      const { index, event } = action.payload;

      state.loginFields[index].value = event.target.value;
    },
    handleStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { handleValue, handleStatus } = loginSlice.actions;
export default loginSlice.reducer;
