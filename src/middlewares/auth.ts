import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
    console.log("🔍 Checking authorization token or session...");

    let token = "";

    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Get token from cookies if not in headers
    if (!token && req.headers.cookie) {
      // BetterAuth uses __Secure- prefix on HTTPS (production)
      const secureCookieMatch = req.headers.cookie.match(/__Secure-better-auth\.session_token=([^;]+)/);
      const normalCookieMatch = req.headers.cookie.match(/better-auth\.session_token=([^;]+)/);
      const cookieMatch = secureCookieMatch || normalCookieMatch;
      if (cookieMatch) {
        token = decodeURIComponent(cookieMatch[1]);
      }
    }

    if (!token) {
      console.log("❌ No token or session cookie found");
      return res.status(401).json({
        success: false,
        message: "No token, please login",
      });
    }

    // Try to verify token as JWT first
    try {
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

      console.log("✅ User authenticated via JWT:", req.user.id);
      return next();
    } catch (jwtError) {
      // If JWT verification fails, try looking it up as a BetterAuth session in MongoDB
      console.log("ℹ️ JWT verification failed. Checking database session...");
      
      const db = mongoose.connection.db;
      if (!db) {
        console.error("❌ Database connection not ready");
        return res.status(500).json({
          success: false,
          message: "Internal server error - Database not ready",
        });
      }

      // Query session collection directly
      const session = await db.collection("session").findOne({ token });
      if (!session) {
        console.log("❌ No session found in database for token");
        return res.status(401).json({
          success: false,
          message: "Invalid session, please login again",
        });
      }

      // Check if session has expired
      if (new Date() > new Date(session.expiresAt)) {
        console.log("❌ Session expired");
        return res.status(401).json({
          success: false,
          message: "Session expired, please login again",
        });
      }

      // Find user for this session
      const user = await db.collection("user").findOne({
        $or: [
          { _id: session.userId },
          { _id: new mongoose.Types.ObjectId(session.userId) },
          { id: session.userId }
        ]
      });

      if (!user) {
        console.log("❌ User not found for session");
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "user",
      };

      console.log("✅ User authenticated via database session:", req.user.id);
      return next();
    }
  } catch (error) {
    console.error("❌ Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token or session",
    });
  }
};