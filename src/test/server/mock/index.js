export const allThreadsResponse = {
  data: {
    threads: [
      {
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
    ],
  },
};
export const detailMockApiResponse = {
  data: {
    detailThread: {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    },
  },
};
export const profileResponse = {
  data: {
    user: {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  },
};
export const loginResponse = {
  data: {
    token: "1234",
  },
};
export const registerResponse = {
  data: {
    user: {
      id: "user-123",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  },
};
export const createThreadResponse = {
  data: {
    thread: {
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
  },
};
export const createCommentThreadResponse = {
  data: {
    comment: {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
      },
    },
  },
};
export const upVoteCommentResponse = {
  data: {
    vote: {
      id: "vote-1",
      userId: "users-1",
      commentId: "comment-1",
      voteType: 1,
    },
  },
};
export const downVoteCommentResponse = {
  data: {
    vote: {
      id: "vote-1",
      userId: "users-1",
      commentId: "comment-1",
      voteType: -1,
    },
  },
};
