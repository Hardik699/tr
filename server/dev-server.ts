import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "./index.js";

const PORT = process.env.PORT || 8080;

async function startDevServer() {
  const app = createServer();

  // Create Vite server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // SPA fallback: serve index.html for all unmatched routes handled by Vite
  app.get("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const html = await vite.transformIndexHtml(
        url,
        `
        <!DOCTYPE html>
        <html lang="en" class="dark">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Admin Dashboard</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/client/App.tsx"></script>
          </body>
        </html>
        `
      );
      res.type("html").end(html);
    } catch (e) {
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`✅ Dev server running on http://localhost:${PORT}`);
  });
}

startDevServer().catch(console.error);
