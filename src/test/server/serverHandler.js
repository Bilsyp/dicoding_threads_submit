import { HttpResponse, http } from "msw";
import {
  allThreadsResponse,
  createCommentThreadResponse,
  createThreadResponse,
  detailMockApiResponse,
  loginResponse,
  profileResponse,
  registerResponse,
} from "./mock";
const ensureAuthHeader = (request) => {
  const token = request.headers.get("authorization");
  if (!token || !token.startsWith("Bearer")) {
    return HttpResponse.json({ message: "Unauthorized" });
  }
};
const baseURL = "https://forum-api.dicoding.dev/v1";
const getHandlers = [
  http.get(`${baseURL}/threads`, () => {
    return HttpResponse.json(allThreadsResponse);
  }),
  http.get(`${baseURL}/threads/:id`, () => {
    return HttpResponse.json(detailMockApiResponse);
  }),
  http.get(`${baseURL}/users/me`, ({ request }) => {
    return ensureAuthHeader(request) || HttpResponse.json(profileResponse);
  }),
];

const postHandlers = [
  http.post(`${baseURL}/login`, () => {
    return HttpResponse.json(loginResponse);
  }),
  http.post(`${baseURL}/register`, () => {
    return HttpResponse.json(registerResponse);
  }),
  http.post(`${baseURL}/threads`, ({ request }) => {
    return ensureAuthHeader(request) || HttpResponse.json(createThreadResponse);
  }),
  http.post(`${baseURL}/threads/:id/comments`, ({ request }) => {
    return (
      ensureAuthHeader(request) ||
      HttpResponse.json(createCommentThreadResponse)
    );
  }),
];

const handlers = [...getHandlers, ...postHandlers];

export { handlers };
