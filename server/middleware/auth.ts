import { Request, Response, NextFunction } from "express";

// attachIdentity middleware
export function attachIdentity(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  // dummy user (safe default)
  (req as any).user = {
    id: "system",
    role: "admin",
  };

  next();
}

// requireAdmin middleware
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
}
