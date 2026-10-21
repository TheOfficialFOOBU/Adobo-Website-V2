import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    // Portraits are served with a `?v=<content hash>` cache-busting token so a
    // replaced artwork never keeps serving the previously generated bitmap.
    // They therefore have to allow a query string; every other local image
    // keeps the strict "no query string" default.
    localPatterns: [
      { pathname: "/images/members/**" },
      { pathname: "/images/**", search: "" },
      { pathname: "/videos/**", search: "" },
    ],
  },
};

export default nextConfig;
