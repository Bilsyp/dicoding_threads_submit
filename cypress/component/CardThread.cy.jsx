import { BrowserRouter } from "react-router-dom";
import CardThread from "../../src/components/threads/CardThread";
import { Provider } from "react-redux";
import { setupStore } from "../../src/store";

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
const store = setupStore();
describe("CardThread.cy.jsx", () => {
  it("playground", () => {
    cy.mount(
      <BrowserRouter>
        <Provider store={store}>
          <CardThread {...test} />
        </Provider>
      </BrowserRouter>
    );
    cy.getDataTest("card").should("be.visible");

    cy.getDataTest("title").should("be.visible");
    // JUST Test its can be click or not and the post request will be throw an error with statu code 401
    cy.getDataTest("voteUp").click({ force: true });

    // cy.getDataTest("voteDown").click({ force: true });
  });
});
