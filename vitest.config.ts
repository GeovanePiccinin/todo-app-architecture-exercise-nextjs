import { defineConfig } from "vitest/config";
import path from "node:path";
import { config } from "dotenv";
config({ path: ".env.test" });

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup-tests.ts"],
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/src/tests/e2e/**", // Caminho para seus testes do Playwright
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
