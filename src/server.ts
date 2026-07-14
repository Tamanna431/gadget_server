import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import gadgetRoutes from "./routes/gadgetRoutes";

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      process.env.FRONTEND_URL || "",
      process.env.BETTER_AUTH_URL || "",
    ].filter(Boolean);

    // Allow exact match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow any Vercel preview/production URL from the user's project
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    console.log("❌ CORS blocked origin:", origin);
    callback(null, false);
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Database connection middleware for Serverless/Vercel cold starts
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err: any) {
    console.error("❌ Database connection error inside middleware:", err);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: err.message,
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "GadgetVerse API is running 🚀" });
});

// ✅ Database connection
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
});

// ✅ Vercel এর জন্য export
export default app;

// ✅ শুধুমাত্র local development এর জন্য listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}