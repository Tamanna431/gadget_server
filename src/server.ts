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
  origin: ["http://localhost:3000", process.env.BETTER_AUTH_URL || ""].filter(Boolean),
  credentials: true
}));

app.use(express.json());

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