import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true, // Enable global Vitest variables (e.g., `vi`)
    environment: "jsdom", // Use jsdom for React testing
    setupFiles: "./src/setupTests.ts", // Optional: Add a setup file if you have one
  },
});
