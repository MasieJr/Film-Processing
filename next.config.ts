import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.82','192.168.89.6','192.168.1.84']
};

export default nextConfig;
