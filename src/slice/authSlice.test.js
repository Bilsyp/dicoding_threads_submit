import { describe, it, expect } from "vitest";
import authReducer, { login, logout, setProfile } from "./authSlice";

const initialState = {
  isAuthenticated: false,
  userToken: null,
  userId: null,
  userData: null,
};
// Skenario

// TODO: Menguji reducer "authReducer" untuk memastikan penanganan state dan aksi yang sesuai.
// - Initial state dari reducer didefinisikan sebagai object "initialState".
describe("authReducer", () => {
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login", () => {
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

  it("should handle logout", () => {
    const preLoginState = {
      isAuthenticated: true,
      userToken: "token-123",
      userId: "user-123",
      userData: null,
    };
    const action = logout();

    expect(authReducer(preLoginState, action)).toEqual(initialState);
  });

  it("should handle setProfile", () => {
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
