import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import gadgetRoutes from "./routes/gadgetRoutes";

console.log("🔍 Server starting...");

const app = express();

app.use(cors({ 
  origin: ["http://localhost:3000"], 
  credentials: true 
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "GadgetVerse API is running 🚀" });
});

// ✅ Vercel এর জন্য export
export default app;

// ✅ সরাসরি সার্ভার চালু করুন
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  console.log("✅ MongoDB Connected");
  
  // শুধুমাত্র লোকাল ডেভেলপমেন্টের জন্য লিসেন করুন
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API available at http://localhost:${PORT}`);
    });
  } else {
    console.log("🌐 Running on Vercel - serverless mode");
  }
}).catch((error) => {
  console.error("❌ Failed to connect to database:", error);
  process.exit(1);
});