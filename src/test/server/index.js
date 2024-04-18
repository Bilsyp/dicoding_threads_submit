import { setupServer } from "msw/node";
import { handlers } from "./serverHandler";
// server
const server = setupServer(...handlers);

export { server };
