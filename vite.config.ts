import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const frontendDir = path.resolve(import.meta.dirname, "artifacts/kike-code");

const rawPort =
  process.env.WEB_PORT ??
  (process.env.NODE_ENV === "production" ? process.env.PORT : undefined) ??
  "5173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(frontendDir, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: frontendDir,
  envDir: import.meta.dirname,
  build: {
    // Bolt publishes the dist/ folder at the project root.
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
