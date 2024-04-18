import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import { describe, it, expect } from "vitest";
import CardThread from "../CardThread";
import userEvent from "@testing-library/user-event";
import { threadItem } from "./mock";
// Skenario

// Menguji komponen "CardThread" untuk memastikan visibilitas dan fungsionalitasnya.
// - Komponen ini menggunakan utilitas "renderWithProviders" dari "../../utils/test-utils" untuk rendering.
// - Komponen "CardThread" diimpor, serta props "threadItem" dari "./mock".

describe("Testing CardThreadComponent", () => {
  it("should be visible", async () => {
    renderWithProviders(<CardThread {...threadItem} />);
    const card = screen.getByTestId("card");
    const title = screen.getByTestId("title").textContent;
    const body = screen.getByTestId("body").textContent;

    expect(card).toBeInTheDocument();
    expect(title).toBe("Thread Pertama");
    expect(body).toBe("Ini adalah thread pertama");

    await userEvent.click(screen.getByTestId("title"));
  });
});
