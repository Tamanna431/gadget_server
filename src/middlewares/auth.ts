import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🔍 Checking token...");

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No token found");
      return res.status(401).json({
        success: false,
        message: "No token, please login",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      id: string;
      role: string;
    };

    // For demo user
    if (decoded.id === "demo_user_id") {
      req.user = {
        id: decoded.id,
        email: "demo@gadgetverse.com",
        name: "Demo User",
        role: decoded.role || "user",
      };
    } else {
      req.user = {
        id: decoded.id,
        email: "",
        role: decoded.role || "user",
      };
    }

    console.log("✅ User authenticated:", req.user.id);
    next();
  } catch (error) {
    console.error("❌ Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};