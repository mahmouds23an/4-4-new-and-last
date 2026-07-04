// apiClient.js
// Shared API client used by all services.
// Reads the backend URL from .env.local:
//
// NEXT_PUBLIC_API_URL=https://your-api-domain.com
//
// The backend uses HttpOnly Cookies, so every request includes credentials.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const REQUEST_TIMEOUT_MS = 60000;

async function request(path, options = {}) {
  if (!API_BASE_URL) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    console.log("Request:", `${API_BASE_URL}${path}`);

    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(options.body && {
          "Content-Type": "application/json",
        }),
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export function apiGet(path) {
  return request(path, {
    method: "GET",
  });
}

export function apiPost(path, body) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function apiPut(path, body) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function apiPatch(path, body) {
  return request(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function apiDelete(path) {
  return request(path, {
    method: "DELETE",
  });
}
