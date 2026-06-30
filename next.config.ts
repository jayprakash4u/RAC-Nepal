import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "?v=2",
      },
      {
        pathname: "/images/**",
        search: "?v=6",
      },
      {
        pathname: "/images/**",
        search: "?v=7",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
