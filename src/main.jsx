import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { register } from "swiper/element/bundle";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  NotFoundPage,
  LeaderBoardPage,
} from "./components/pages";
import { AllThreads, CreateThread, DetailThread } from "./components/threads";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Provider } from "react-redux";
import Error from "./components/Error.jsx";
register();
import { setupStore } from "./store";

const store = setupStore();
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/login" errorElement={<Error />} element={<LoginPage />} />
      <Route path="/signUp" errorElement={<Error />} element={<SignUpPage />} />
      <Route
        path="/allThreads"
        errorElement={<Error />}
        element={<AllThreads />}
      />
      <Route path="/leaderboards" element={<LeaderBoardPage />} />
      <Route path="/detail/:id" element={<DetailThread />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/newThread" element={<CreateThread />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
