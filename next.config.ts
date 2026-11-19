import type { NextConfig } from "next";
import withSerwist from "@serwist/next";

const nextConfig: NextConfig = {
  turbopack: {},
  reactCompiler: true,
  allowedDevOrigins: ["192.168.89.18", "192.168.1.71"],
  experimental: {
    agentUpgrade: "security",
  },
};

export default withSerwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
})(nextConfig);
