// app/login/page.js  (Login page - thin server wrapper for metadata)
// What this is: the /login route. Exports metadata for SEO, then renders
// the interactive LoginClient component that handles form state.

import LoginClient from "./LoginClient";

export const metadata = {
  title: "Sign In | 4x4 Center",
  description: "Sign in to your 4x4 Center account to track orders, manage your wishlist and check out faster.",
  robots: { index: false },  // Don't index auth pages
};

export default function LoginPage() {
  return <LoginClient />;
}
