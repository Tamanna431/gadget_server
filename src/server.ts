import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import gadgetRoutes from "./routes/gadgetRoutes";
import { seedData } from "./utils/seed";

const app = express();

// CORS - Vercel URL যোগ করুন
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "https://gadget-client-chi.vercel.app"  // ✅ আপনার Vercel frontend URL
  ], 
  credentials: true 
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gadgets", gadgetRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "GadgetVerse API is running 🚀" });
});

// ✅ Vercel এর জন্য - app.listen() এর বদলে এটি ব্যবহার করুন
export default app;

// ❌ এই লাইনগুলো কমেন্ট আউট করুন বা মুছে ফেলুন:
// const PORT = process.env.PORT || 5000;
// const start = async () => {
//   await connectDB();
//   await seedData();
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// };
// start();