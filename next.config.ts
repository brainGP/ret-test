import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Add more patterns if needed:
      // {
      //   protocol: "https",
      //   hostname: "**",
      // },
    ],
  },
};

export default nextConfig;
