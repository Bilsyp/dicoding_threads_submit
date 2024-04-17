import "@testing-library/jest-dom";
import { server } from "./test/server";
import { beforeAll, afterAll, afterEach } from "vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
