import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/intelligent/",  // ✅ ต้องตรงกับ GitHub Repository
  build: {
    outDir: "dist"
  }
});
