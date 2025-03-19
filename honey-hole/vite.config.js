import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wp-json": {
        target: "http://honey-hole.local",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "../wordpress-plugin/build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return `css/[name].${ext}`;
          }
          return `assets/[name].${ext}`;
        },
      },
    },
  },
});
