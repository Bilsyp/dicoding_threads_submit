import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated:
      JSON.parse(localStorage.getItem("token")) !== null ? true : false,
    userToken: JSON.parse(localStorage.getItem("token")) || null,
    userId: JSON.parse(localStorage.getItem("userId")) || null,
    userData: JSON.parse(localStorage.getItem("userData")) || null,
  },
  reducers: {
    login(state, actions) {
      localStorage.setItem("token", JSON.stringify(actions.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        userToken: actions.payload.token,
      };
    },
    setProfile(state, actions) {
      localStorage.setItem("userId", JSON.stringify(actions.payload.userId));
      localStorage.setItem(
        "userData",
        JSON.stringify(actions.payload.userData)
      );
      return {
        ...state,
        userId: actions.payload.userId,
        userData: actions.payload.userData,
      };
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      return {
        ...state,
        isAuthenticated: false,
        userData: "",
        userId: "",
        userToken: "",
      };
    },
  },
});

export const { login, logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
