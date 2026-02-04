import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  let app: any;

  return {
    name: "express-plugin",
    apply: "serve",
    async configureServer(server) {
      // Lazy load the express app
      const loadApp = async () => {
        if (!app) {
          const { createServer } = await import("./server/index.js");
          app = createServer();
        }
        return app;
      };

      server.middlewares.use(async (req, res, next) => {
        try {
          const expressApp = await loadApp();
          expressApp(req, res, next);
        } catch (e) {
          console.error("Express middleware error:", e);
          next(e);
        }
      });
    },
  };
}
