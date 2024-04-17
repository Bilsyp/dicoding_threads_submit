import { renderHook, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
export function renderWithProviders(
  ui,
  { route = "/" } = {},
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  window.history.pushState({}, "Test page", route);

  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        {" "}
        <Provider store={store}>{children}</Provider>;
      </BrowserRouter>
    );
  }
  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function renderHookWithProviders(
  hook,
  { preloadedState = {}, store = setupStore(preloadedState), ...options } = {}
) {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    store,
    ...renderHook(hook, { wrapper, ...options }),
  };
}
export const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
