/** @type {import('next').NextConfig} */
// next.config.mjs
// What this is: Next.js build configuration.
// - Enables image optimisation from remote domains (add API/CDN domain here
//   once the backend provides image URLs).
// - Bundles stay small: large packages imported in /data or /services are
//   never shipped to the browser (they're only used in server components or
//   services/ files consumed by them).

const nextConfig = {
  images: {
    remotePatterns: [
      // Add production CDN/API hostname here when the backend is live
      // { protocol: "https", hostname: "cdn.4x4center.sa" },
    ],
  },
  // Allow Framer Motion to tree-shake correctly
  transpilePackages: ["framer-motion"],
};

export default nextConfig;
