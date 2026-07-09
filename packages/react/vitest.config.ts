import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    // Forked processes keep per-file isolation; cap concurrency so many jsdom
    // instances don't exhaust RAM (worker threads OOM on this Windows setup).
    pool: "forks",
    poolOptions: { forks: { maxForks: 2, minForks: 1 } },
  },
});
