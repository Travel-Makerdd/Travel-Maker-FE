import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // /api로 시작하는 모든 경로
        destination: 'http://localhost:8080/api/:path*', // localhost:8080으로 프록시
      },
    ];
  },
};

export default nextConfig;
