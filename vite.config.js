/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
const path = require("path");
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  test: {
    globals: true,
    silent: true,
    include: [...configDefaults.include],
    coverage: {
      reporter: ["text", "lcov"]
    }
  },
});