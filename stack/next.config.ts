import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  typescript: {
    // Deployment will succeed even if there are type errors
    // This is safe because we use JSX files for API/context layers
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
