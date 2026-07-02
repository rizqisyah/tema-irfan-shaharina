import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import type { OutputChunk, OutputAsset } from "rollup";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: "The Wedding  Of  Clevert & Ivana",
            description: "We joyfully invite you to attend our wedding",
            image:
              "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.35.31.webp?updatedAt=1781262749583",
            url: "https://qinvi.id/",
          },
        },
      }),
    ],
    base: isProd ? "/themes-assets/" : "/",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      assetsInlineLimit: 4096, // 4kb
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return "assets/[name]-[hash][extname]";

            const ext = assetInfo.name.split(".").pop()?.toLowerCase() || "";
            const isImage = /(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(ext);

            return isImage
              ? "assets/images/[name]-[hash][extname]"
              : "assets/[name]-[hash][extname]";
          },
        },
      },
    },
    server: {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
  };
});
