import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/algo-visualizer/" : "/",
  server: {
    host: true,
  },
  plugins: [tailwindcss(), react()],
}));
