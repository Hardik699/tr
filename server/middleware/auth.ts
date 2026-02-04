import { Request, Response, NextFunction } from "express";

/**
 * Simple identity attach middleware
 * ❌ No routing
 * ❌ No env URLs
 */
export function attachIdentity(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  // example identity (safe default)
  req.user = {
    id: "system",
    role: "admin",
  };

  next();
}
