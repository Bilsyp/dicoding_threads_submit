import { threadItem } from "../components/threads/test/mock";
import CardThread from "../components/threads/CardThread";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import { BrowserRouter } from "react-router-dom";
const store = setupStore();
export default {
  title: "CardThread",
  component: CardThread,
  decorators: [
    (story) => (
      <BrowserRouter>
        <Provider store={store}>{story()}</Provider>
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
};
export const Data = {
  args: {
    ...threadItem,
    background: "red",
    size: "small",
  },
};
