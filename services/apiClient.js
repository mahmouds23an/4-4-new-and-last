// apiClient.js
// What this is: ONE tiny fetch wrapper every service file uses to talk to
// the future Python backend. It reads the base URL from
// NEXT_PUBLIC_API_URL (see .env.local).
//
// Contract:
//   - If NEXT_PUBLIC_API_URL is empty -> returns null immediately (no network call).
//   - If the request fails, times out, or the API is down -> returns null.
//   - If it succeeds -> returns the parsed JSON.
// Every service does: `const apiData = await apiGet("/products"); return apiData ?? mockData;`
// so the mock fallback is automatic and frontend code never needs to change
// when the backend goes live.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const REQUEST_TIMEOUT_MS = 6000;

export async function apiGet(path) {
  if (!API_BASE_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Network error, timeout, CORS issue, backend not deployed yet, etc.
    // We deliberately swallow this — mock data takes over silently.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiPost(path, body) {
  if (!API_BASE_URL) return null;
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
