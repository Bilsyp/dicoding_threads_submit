import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/test-utils";
import { describe, it, expect } from "vitest";
import { commentItem } from "./mock";
import CardComment from "../comment/CardComment";

// Skenario

// TODO: Menguji komponen "CardComment" untuk memastikan visibilitas dan fungsionalitasnya.
// - Komponen ini menggunakan library testing "@testing-library/react" dan "@testing-library/user-event".
// - Utilitas "renderWithProviders" dari "../../utils/test-utils" digunakan untuk rendering.
// - Komponen "CardComment" diimpor, serta props "commentItem" dari "./mock".

describe("Testing CardComment", () => {
  it("should be visible", async () => {
    renderWithProviders(<CardComment comments={commentItem} id={"1"} />);
    const cardComment = screen.getByTestId("comment");
    const name = screen.getByTestId("name").textContent;

    expect(cardComment).toBeInTheDocument();
    expect(name).toBe("Dimas Saputra");

    // event click tidak mengembalikan apapun hanya check apakah button vote ada dan berfungsi
    await userEvent.click(screen.getByTestId("voteUp"));
    await userEvent.click(screen.getByTestId("voteDown"));
  });
});
