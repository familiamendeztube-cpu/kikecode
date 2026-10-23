import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  // Bolt's preview and dev tunnels reach the server under their own hostnames.
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
});
