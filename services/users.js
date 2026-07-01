// users.js (service)
// What this is: data access point for the current user / auth. login()
// currently just simulates a network round trip and returns the mock user —
// replace the body with a real POST /auth/login call once the Node/JWT
// backend exists; the function signature and return shape stay the same.

import { apiPost } from "./apiClient";
import mockUsers from "@/data/users";

export async function login({ identifier, password }) {
  const apiData = await apiPost("/auth/login", { identifier, password });
  if (apiData) return apiData;

  // Mock fallback: simulate latency, then "succeed" with the demo user.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { user: mockUsers[0], token: "mock-token" };
}
