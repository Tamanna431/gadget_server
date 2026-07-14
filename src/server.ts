import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import gadgetRoutes from "./routes/gadgetRoutes";

const app = express();

// MongoDB connect
connectDB().catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://gadget-client-chi.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);

// Health Check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 GadgetVerse API is running",
  });
});

// Vercel Serverless Export
export default app;