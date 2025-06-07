import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pagesPlugin from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), pagesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
