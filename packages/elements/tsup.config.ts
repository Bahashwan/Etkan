import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  // ESM for bundlers/frameworks; IIFE global for a plain <script> drop-in.
  format: ["esm", "iife"],
  globalName: "EtkanUI",
  dts: true,
  clean: true,
  minify: true,
  target: "es2020",
  platform: "browser",
  treeshake: true,
});
