import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

export function createServer() {
  const app = express();

  // Initialize MongoDB connection
  connectDB().catch((error) => {
    console.error("Failed to initialize MongoDB:", error);
    // Continue running even if MongoDB fails to connect
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(attachIdentity);

  // Static for uploaded files
  app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // TODO: Add API routes back one by one after debugging

  // Serve static files from the dist/spa directory
  app.use(express.static(path.join(process.cwd(), "dist/spa")));

  // SPA fallback - serve index.html for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/spa", "index.html"));
  });

  return app;
}
