import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT || 10000 : 3001;

// Create the Express app with all API routes
const app = createServer();

// Serve static files from the dist directory (SPA build output) - only in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "..", "dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    // SPA fallback: serve index.html for all unmatched routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
