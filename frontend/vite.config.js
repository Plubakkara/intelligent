import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/intelligent/",  // ✅ เปลี่ยนเป็นชื่อ repository ของคุณ
  build: {
    outDir: "dist"
  }
});
