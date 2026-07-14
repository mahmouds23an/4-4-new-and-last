"use client";
// RequireAuth.jsx — wraps a page's content and redirects guests to /login.
//
// Usage:
//   export default function CheckoutPage() {
//     return (
//       <RequireAuth>
//         <CheckoutContent />
//       </RequireAuth>
//     );
//   }
//
// While AuthContext is still resolving the session, we render nothing (no
// flash of protected content). If there's no user once loading finishes,
// we redirect to /login and remember where the user was headed via
// ?next=<path> so login can send them back afterwards.

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Loader2 } from "lucide-react";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-orange" />
      </div>
    );
  }

  return children;
}
