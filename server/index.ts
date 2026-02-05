import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { attachIdentity } from "./middleware/auth";
// import { salariesRouter } from "./routes/salaries";
// import {
//   syncToGoogleSheets,
//   getSpreadsheetInfo,
// } from "./services/googleSheets";
import { connectDB } from "./db";
// import { employeesRouter } from "./routes/employees";
// import { departmentsRouter } from "./routes/departments";
// import { itAccountsRouter } from "./routes/it-accounts";
// import { attendanceRouter } from "./routes/attendance";
// import { leaveRequestsRouter } from "./routes/leave-requests";
// import { salaryRecordsRouter } from "./routes/salary-records";
// import { systemAssetsRouter } from "./routes/system-assets";
// import { clearDataRouter } from "./routes/clear-data";

export function createServer() {
  const app = express();

  let dbConnected = false;

  // Initialize MongoDB connection
  connectDB()
    .then(() => {
      dbConnected = true;
    })
    .catch((error) => {
      console.error("Failed to initialize MongoDB:", error);
      // Continue running even if MongoDB fails to connect
    });

  // Middleware to check DB connection and return proper error
  // app.use((req, res, next) => {
  //   if (!dbConnected && req.path.startsWith("/api/")) {
  //     return res.status(503).json({
  //       success: false,
  //       error: "Database service is unavailable. Please configure MONGODB_URI environment variable.",
  //     });
  //   }
  //   next();
  // });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(attachIdentity);

  // Static for uploaded files
  // app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // app.get("/api/demo", handleDemo);

  // Salaries API
  // app.use("/api/salaries", salariesRouter());

  // Google Sheets API
  // app.post("/api/google-sheets/sync", syncToGoogleSheets);
  // app.get("/api/google-sheets/info", getSpreadsheetInfo);

  // Data APIs - temporarily commented out to debug
  // app.use("/api/employees", employeesRouter);
  // app.use("/api/departments", departmentsRouter);
  // app.use("/api/it-accounts", itAccountsRouter);
  // app.use("/api/attendance", attendanceRouter);
  // app.use("/api/leave-requests", leaveRequestsRouter);
  // app.use("/api/salary-records", salaryRecordsRouter);
  // app.use("/api/system-assets", systemAssetsRouter);

  // Clear data API (for development/testing)
  // app.use("/api/clear-data", clearDataRouter);

  return app;
}
