import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { attachIdentity } from "./middleware/auth";
import { connectDB } from "./db";

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

  app.get("/api/demo", handleDemo);

  // Salaries API
  app.use("/api/salaries", salariesRouter());

  // Google Sheets API
  app.post("/api/google-sheets/sync", syncToGoogleSheets);
  app.get("/api/google-sheets/info", getSpreadsheetInfo);

  // Data APIs
  app.use("/api/employees", employeesRouter);
  app.use("/api/departments", departmentsRouter);
  app.use("/api/it-accounts", itAccountsRouter);
  app.use("/api/attendance", attendanceRouter);
  app.use("/api/leave-requests", leaveRequestsRouter);
  app.use("/api/salary-records", salaryRecordsRouter);
  app.use("/api/system-assets", systemAssetsRouter);

  // Clear data API (for development/testing)
  app.use("/api/clear-data", clearDataRouter);

  // Serve static files from the dist/spa directory
  app.use(express.static(path.join(process.cwd(), "dist/spa")));

  // SPA fallback - serve index.html for any non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/spa", "index.html"));
  });

  return app;
}
