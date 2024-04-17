import { waitFor, screen, fireEvent } from "@testing-library/react";
import {
  renderWithProviders,
  renderHookWithProviders,
} from "../utils/test-utils";
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

describe("register", () => {
  it("attempts to register a new user", async () => {
    const TestComponent = () => {
      const [registerMutation, { isSuccess }] = useAuthSignUpMutation();
      return (
        <div data-testid="test-container">
          <button
            data-testid="register-button"
            onClick={() =>
              registerMutation({
                email: "newuser@gmail.com",
                password: "123456",
                name: "New User",
              })
            }
          >
            Register
          </button>
          <p data-testid="register-status">{String(isSuccess)}</p>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    const initialRegisterStatus =
      screen.getByTestId("register-status").textContent;

    expect(initialRegisterStatus).toBe("false");

    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);

    await waitFor(() => {
      const finalRegisterStatus =
        screen.getByTestId("register-status").textContent;
      expect(finalRegisterStatus).toBe("true");
    });
  });
});

describe("login", () => {
  it("attempts to log in", async () => {
    const TestComponent = () => {
      const [loginMutation, { isSuccess }] = useAuthLoginMutation();
      return (
        <div data-testid="test-container">
          <button
            data-testid="create"
            onClick={() =>
              loginMutation({
                email: "cosmos@gmail.com",
                password: "123456",
              })
            }
          >
            Login
          </button>
          <p data-testid="login-status">{String(isSuccess)}</p>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);
    const initialLoginStatus = screen.getByTestId("login-status").textContent;

    expect(initialLoginStatus).toBe("false");

    const loginButton = screen.getByTestId("create");
    fireEvent.click(loginButton);

    await waitFor(() => {
      const finalLoginStatus = screen.getByTestId("login-status").textContent;
      expect(finalLoginStatus).toBe("true");
    });
  });
});

describe("threads api", () => {
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

  it("should return true for isSuccess when fetching all threads", async () => {
    const Test = () => {
      const { isSuccess } = useGetAllThreadsQuery();
      return <div data-testid="test">{String(isSuccess)}</div>;
    };
    renderWithProviders(<Test />);
    await waitFor(() => {
      const textContent = screen.getByTestId("test").textContent;
      expect(textContent).toBe("true");
    });
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

  it("should return profile data", async () => {
    const { result } = renderHookWithProviders(() => useGetProfileQuery("12"));
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
    const profile = result.current.data;
    expect(profile.name).toEqual("John Doe");
  });
  it("should create new thread", async () => {
    const TestComponent = () => {
      const [createThread, { isSuccess, data }] = useCreateThreadMutation();

      const handleCreateThread = () =>
        createThread({
          user: {
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "",
          },
          token: "test",
        });

      return (
        <div data-testid="test-container">
          <button data-testid="create" onClick={handleCreateThread}>
            create
          </button>
          <p data-testid="create-status">{String(isSuccess)}</p>
          <h1 data-testid="title">{data?.title}</h1>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    const initialCreateStatus = screen.getByTestId("create-status").textContent;
    expect(initialCreateStatus).toBe("false");

    const createButton = screen.getByTestId("create");
    fireEvent.click(createButton);

    await waitFor(() => {
      const title = screen.getByTestId("title").textContent;
      const finalCreateStatus = screen.getByTestId("create-status").textContent;

      expect(finalCreateStatus).toBe("true");
      expect(title).toBe("Thread Pertama");
    });
  });
  it("should create new comment thread", async () => {
    const TestComponent = () => {
      const [CreateThreadComment, { isSuccess, data }] =
        useCreateThreadCommentMutation();

      const handleCreateThread = () => {
        CreateThreadComment({
          token: "12",
          threadId: "1",
          content: "Hello WOrld",
        });
      };

      return (
        <div data-testid="test-container">
          <button data-testid="create" onClick={handleCreateThread}>
            create
          </button>
          <p data-testid="create-status">{String(isSuccess)}</p>
          <h1 data-testid="id">{data?.id}</h1>
          <h1 data-testid="content">{data?.content}</h1>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    const initialCreateStatus = screen.getByTestId("create-status").textContent;
    expect(initialCreateStatus).toBe("false");

    const createButton = screen.getByTestId("create");
    fireEvent.click(createButton);

    await waitFor(() => {
      const id = screen.getByTestId("id").textContent;
      const content = screen.getByTestId("content").textContent;
      const finalCreateStatus = screen.getByTestId("create-status").textContent;
      expect(finalCreateStatus).toBe("true");
      expect(id).toBe("comment-1");
      expect(content).toBe("Ini adalah komentar pertama");
    });
  });
});
