import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  base: "/", // Ensure this is correctly set for SPA routing
});
