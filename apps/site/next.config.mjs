import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app is self-contained; keep file tracing scoped to it (there is a
  // separate lockfile at the monorepo root for the library packages).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
