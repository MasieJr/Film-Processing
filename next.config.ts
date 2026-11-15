import withSerwist from "@serwist/next";

const nextConfig = {
  turbopack: {},
  reactCompiler: true,
  allowedDevOrigins: ["192.168.89.17", "192.168.1.71"],
};

export default withSerwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
})(nextConfig);
