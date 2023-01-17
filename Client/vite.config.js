import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.join(__dirname, "../Server/dist"),
    emptyOutDir: true,
    manifest: true
  },
  base: "/34.23.43.159/",
});
