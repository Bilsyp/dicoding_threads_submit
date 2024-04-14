import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import { threadApi } from "../components/api/threadApi";
const store = configureStore({
  reducer: {
    auth: authSlice,
    [threadApi.reducerPath]: threadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(threadApi.middleware),
});

export { store };
