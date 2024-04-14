import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const threadApi = createApi({
  reducerPath: "threadsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://forum-api.dicoding.dev/v1/" }),
  tagTypes: ["Threads", "Votes", "IsLogin", "Comment"],

  endpoints: (builder) => ({
    authSignUp: builder.mutation({
      query: ({ name, email, password }) => ({
        url: `/register`,
        method: "POST",
        body: { name, email, password },
      }),
    }),
    authLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        body: { email, password },
        method: "POST",
      }),
      transformResponse: (response) => {
        return response.data.token;
      },
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: "users/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => {
        return response.data.user;
      },
    }),

    getAllThreads: builder.query({
      query: () => `threads`,
      transformResponse: (response) => {
        return response.data.threads;
      },
      providesTags: ["Threads", "Votes", "IsLogin", "Comment"],
    }),
    getAllUsers: builder.query({
      query: () => `users`,
      transformResponse: (response) => {
        return response.data.users;
      },
      providesTags: ["Threads", "Votes", "IsLogin"],
    }),
    getDetailThread: builder.query({
      providesTags: ["Votes", "Comment"],
      query: (id) => `threads/${id}`,
      transformResponse: (response) => {
        return response.data.detailThread;
      },
    }),
    getLeaderboards: builder.query({
      query: () => `leaderboards`,
      transformResponse: (response) => {
        return response.data.leaderboards;
      },
    }),

    createThread: builder.mutation({
      query: ({ user, token }) => ({
        method: "POST",
        body: JSON.stringify(user),
        url: `threads`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Threads"],
    }),

    createThreadComment: builder.mutation({
      query: ({ threadId, content, token }) => ({
        method: "POST",
        body: JSON.stringify({ content }),
        url: `/threads/${threadId}/comments`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Comment"],
    }),
    upVoteThread: builder.mutation({
      invalidatesTags: ["Votes"],
      query: ({ id, token }) => ({
        url: `threads/${id}/up-vote`,

        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response) => response.data.vote.voteType,
      transformErrorResponse: (response) => {
        return { isErrorUpVote: response.data };
      },
    }),
    downVoteThread: builder.mutation({
      invalidatesTags: ["Votes"],
      transformErrorResponse: (response) => {
        return { isErrorDownVote: response.data };
      },
      query: ({ id, token }) => ({
        url: `threads/${id}/down-vote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    neutralVoteThread: builder.mutation({
      invalidatesTags: ["Votes"],

      query: ({ id, token }) => ({
        url: `/threads/${id}/neutral-vote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    upVoteCommentThread: builder.mutation({
      invalidatesTags: ["Comment"],
      query: ({ id, token, commentId }) => ({
        url: `/threads/${id}/comments/${commentId}/up-vote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    downVoteCommentThread: builder.mutation({
      invalidatesTags: ["Comment"],
      query: ({ id, token, commentId }) => ({
        url: `/threads/${id}/comments/${commentId}/down-vote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    neutralVoteCommentThread: builder.mutation({
      invalidatesTags: ["Comment"],
      query: ({ id, token, commentId }) => ({
        url: `/threads/${id}/comments/${commentId}/neutral-vote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const {
  useGetAllThreadsQuery,
  useGetDetailThreadQuery,
  useGetProfileQuery,
  useGetLeaderboardsQuery,
  useUpVoteThreadMutation,
  useDownVoteCommentThreadMutation,
  useUpVoteCommentThreadMutation,
  useNeutralVoteCommentThreadMutation,
  useCreateThreadCommentMutation,
  useDownVoteThreadMutation,
  useNeutralVoteThreadMutation,
  useAuthLoginMutation,
  useAuthSignUpMutation,
  useGetAllUsersQuery,
  useCreateThreadMutation,
} = threadApi;
