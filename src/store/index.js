import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import { threadApi } from "../components/api/threadApi";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [threadApi.reducerPath]: threadApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(threadApi.middleware),

    preloadedState,
  });
};
