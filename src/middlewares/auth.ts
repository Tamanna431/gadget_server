import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;  // ✅ required করুন (optional নয়)
    name?: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🔍 Checking session...");

    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    console.log("Session:", session ? "Found" : "Not Found");

    if (!session || !session.user) {
      console.log("❌ No valid session");
      return res.status(401).json({
        success: false,
        message: "No session, please login",
      });
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: (session.user as any).role || "user",  // ✅ fallback দিন
    };

    console.log("✅ User authenticated:", req.user.email);
    next();
  } catch (error) {
    console.error("❌ Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid session",
    });
  }
};