import { describe, it, expect } from "vitest";
import authReducer, { login, logout, setProfile } from "./authSlice";

const initialState = {
  isAuthenticated: false,
  userToken: null,
  userId: null,
  userData: null,
};

describe("authReducer", () => {
  it("harus menangani state awal", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("harus menangani login", () => {
    const token = "token-123";
    const action = login({ token });
    const expectedState = {
      ...initialState,
      userId: null,
      userData: null,
      isAuthenticated: true,
      userToken: "token-123",
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it("harus menangani logout", () => {
    const preLoginState = {
      isAuthenticated: true,
      userToken: "token-123",
      userId: "user-123",
      userData: null,
    };
    const action = logout();

    expect(authReducer(preLoginState, action)).toEqual(initialState);
  });

  it("harus menangani setProfile", () => {
    const id = "123";
    const user = {
      name: "John Doe",
      email: "john@example.com",
      avatar: "aang",
    };
    const action = setProfile({ userData: user, userId: id });
    const expectedState = {
      ...initialState,
      userData: { name: "John Doe", email: "john@example.com", avatar: "aang" },
      userId: "123",
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
