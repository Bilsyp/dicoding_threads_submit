import CategoryThreads from "../../src/components/threads/CategoryThreads";

describe("CategoryThreads", () => {
  it("displays the unique categories and sets the category when clicked", () => {
    const data = [
      { id: 1, title: "Thread 1", category: "Category A" },
      { id: 2, title: "Thread 2", category: "Category B" },
      { id: 3, title: "Thread 3", category: "Category A" },
    ];
    const setCategory = cy.spy().as("setCategory");
    const category = "Category A";
    cy.mount(
      <CategoryThreads
        data={data}
        setCategory={setCategory}
        category={category}
      />
    );

    cy.get("button").should("have.length", 2); // there should be 2 unique categories

    cy.get("button").eq(0).should("contain", "Category A");
    cy.get("button").eq(1).should("contain", "Category B");

    cy.get("button").eq(0).click();

    cy.get("@setCategory").should("have.been.calledWith", "Category A");
    cy.get("button.bg-slate-800").should("contain", "Category A");
    cy.get("button").eq(1).click();
    cy.get("@setCategory").should("have.been.calledWith", "Category B");
  });
});
