import { fn } from "@storybook/test";
import CategoryThreads from "../components/threads/CategoryThreads";
export default {
  title: "CategoryThreads",
  component: CategoryThreads,
  tags: ["autodocs"],
  argsTypes: { setCategory: { actions: "setCategory" } },
};

export const Data = {
  args: {
    data: [{ category: "A" }, { category: "B" }],
    category: "A",
    setCategory: fn(),
  },
};
