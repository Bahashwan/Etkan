import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2020",
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Components are interactive (hooks). The directive makes them drop-in safe
  // inside Next.js App Router server trees.
  banner: { js: '"use client";' },
});
