import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react() as any],
  define: {
    "process.env": {},
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
