import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");
// import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
