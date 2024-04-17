import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userToken: JSON.parse(localStorage.getItem("token")) || null,
  userId: JSON.parse(localStorage.getItem("userId")) || null,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, actions) {
      const { token } = actions.payload;
      localStorage.setItem("token", JSON.stringify(token));
      return {
        ...state,
        isAuthenticated: true,
        userToken: token,
      };
    },
    setProfile(state, actions) {
      const { userId, userData } = actions.payload;
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("userData", JSON.stringify(userData));
      return {
        ...state,
        userId,
        userData,
      };
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
        userId: null,
        userToken: null,
      };
    },
  },
});

export const { login, logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
