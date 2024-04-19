import { waitFor, act } from "@testing-library/react";
import { renderHookWithProviders } from "../utils/test-utils";
import { describe, it, expect } from "vitest";
import {
  useAuthLoginMutation,
  useAuthSignUpMutation,
  useCreateThreadCommentMutation,
  useCreateThreadMutation,
  useGetAllThreadsQuery,
  useGetDetailThreadQuery,
  useGetProfileQuery,
} from "./threadApi";

/// Skenario

//  TODO : Menguji API useAuthSignUpMutation / hooks yang digunakan untuk melakukan proses fetching saat registrasi
// - Entripoint routes: POST

// should attempt to register a new user

describe("register api testing", () => {
  it(" should attempts to register a new user", async () => {
    const { result } = renderHookWithProviders(() => useAuthSignUpMutation());
    const register = result.current[0];
    await act(async () => {
      await register({
        name: "John Doe'",
        email: "john@example.com",
        password: "2123",
      });
    });
    const data = result.current[1].data;
    expect(data.name).toEqual("John Doe");
  });
});

// Skenario
/*
  TODO: Menguji API dan hooks yang digunakan untuk melakukan proses fetching pada saat login.

  Hooks: useAuthLoginMutation
  - Entripoint routes: POST

*/

// should attempt to log in
describe("login", () => {
  it("should attempts to log in", async () => {
    const { result } = renderHookWithProviders(() => useAuthLoginMutation());
    const login = result.current[0];
    await act(async () => {
      await login({
        name: "John Doe'",
        email: "john@example.com",
        password: "2123",
      });
    });
    const token = result.current[1].data;
    expect(result.current[1].isSuccess).toBe(true);
    expect(token).toEqual("1234");
  });
});

// Skenario
/*
  TODO: Menguji API dan hooks yang digunakan untuk melakukan proses fetching data user setelah login berdasarkan token yang diterima.

  - Entripoint routes: GET
  - Hooks: useGetProfileQuery(token)
*/

describe("user profile", () => {
  it("should return profile data", async () => {
    const { result } = renderHookWithProviders(() =>
      useGetProfileQuery("12324")
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
    const profile = result.current.data;
    expect(profile.name).toEqual("John Doe");
  });
});

// Skenario
/*
  TODO: Menguji API dan hooks yang digunakan untuk melakukan proses fetching data threads, membuat data thread baru, dan membuat komentar pada thread.

  - Entripoint routes: GET, POST
  - Hooks: useGetAllThreadsQuery, useGetDetailThreadQuery, useCreateThreadMutation, useCreateThreadCommentMutation

  useGetAllThreadsQuery: Mendapatkan semua data threads yang ada.
  useGetDetailThreadQuery: Mendapatkan detail data thread berdasarkan ID thread.
  useCreateThreadMutation({ user, token }): Membuat data thread baru.
    - user: { title, content, category } Object
  useCreateThreadCommentMutation(comment): Membuat komentar pada thread berdasarkan ID thread.
    - comment: { token, threadId, content } Object
*/

describe("threads api query", () => {
  it("should return all threads", async () => {
    const { result } = renderHookWithProviders(() => useGetAllThreadsQuery());
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
    const threads = result.current.data;
    expect(threads).toHaveLength(1);
    expect(threads[0].title).toBe("Thread Pertama");
  });

  it("should return details of a specific thread", async () => {
    const { result } = renderHookWithProviders(() =>
      useGetDetailThreadQuery("1")
    );
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
    const thread = result.current.data;
    expect(thread.comments).toHaveLength(1);
    expect(thread.id).toBe("thread-1");
  });

  it("should create new thread", async () => {
    const { result } = renderHookWithProviders(() => useCreateThreadMutation());
    const postThread = result.current[0];
    await act(async () => {
      await postThread({
        user: {
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "",
        },
        token: "12324",
      });
    });

    const thread = result.current[1].data;
    expect(thread.title).toEqual("Thread Pertama");
    expect(thread.body).toEqual("Ini adalah thread pertama");
  });
  it("should create new comment thread", async () => {
    const { result } = renderHookWithProviders(() =>
      useCreateThreadCommentMutation()
    );
    const postComment = result.current[0];
    await act(async () => {
      await postComment({
        token: "1234",
        threadId: "1",
        content: "Ini adalah komentar pertama",
      });
    });
    const comment = result.current[1].data;
    expect(comment.content).toEqual("Ini adalah komentar pertama");
    expect(comment.id).toEqual("comment-1");
  });
});
