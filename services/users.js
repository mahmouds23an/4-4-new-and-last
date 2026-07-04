// users.js
// Authentication services.
// The backend uses HttpOnly Cookies, so no token is stored
// in localStorage or sessionStorage.

import { apiPost, apiGet } from "./apiClient";

export async function register({
  username,
  first_name,
  last_name,
  email,
  password,
}) {
  return await apiPost("/api/v1/auth/register", {
    username,
    first_name,
    last_name,
    email,
    password,
  });
}

export async function login(username, password) {
  return await apiPost("/api/v1/auth/login", {
    username,
    password,
  });
}

export async function getCurrentUser() {
  return await apiGet("/api/v1/auth/me");
}

export async function logout() {
  return await apiPost("/api/v1/auth/logout");
}
