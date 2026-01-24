import type { NextConfig } from "next";

const apiBase = process.env.API_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${apiBase}/api/:path*` }];
  },
};

export default nextConfig;
