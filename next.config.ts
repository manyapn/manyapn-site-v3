import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  // github pages serves <route>/index.html, so /fun/ and /fun both work
  trailingSlash: true,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
