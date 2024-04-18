import { fn } from "@storybook/test";
import CardThread from "../components/threads/CardThread";
import { renderHookWithProviders } from "../components/utils/test-utils";
export default {
  title: "CardThread",
  component: renderHookWithProviders(CardThread),
  tags: ["autodocs"],
};

export const Data = {
  args: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
};
