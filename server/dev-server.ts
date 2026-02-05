import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;

async function startDevServer() {
  // Create the Express app with all API routes first
  const app = createServer();

  // Create Vite server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  // Use Vite's connect instance as middleware after API routes
  // This way API routes are matched first, then Vite handles everything else
  app.use(vite.middlewares);

  // SPA fallback for non-API routes
  app.get("*", async (req, res, next) => {
    try {
      const html = await vite.transformIndexHtml(
        req.originalUrl,
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
        `,
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
