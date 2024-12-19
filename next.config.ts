const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.HOST,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
