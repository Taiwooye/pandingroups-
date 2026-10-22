import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pandin-group-production.up.railway.app",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "213.199.53.100",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.pandingroup.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
