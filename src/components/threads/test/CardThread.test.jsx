import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { describe, it, expect } from "vitest";
import CardThread from "../CardThread";
import userEvent from "@testing-library/user-event";
const test = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};
describe("CardThreadComponent", () => {
  it("should be visible", async () => {
    renderWithProviders(<CardThread {...test} />);
    const title = screen.getByTestId("title").textContent;
    const body = screen.getByTestId("body").textContent;

    expect(title).toBe("Thread Pertama");
    expect(body).toBe("Ini adalah thread pertama");

    await userEvent.click(screen.getByTestId("title"));
  });
});
