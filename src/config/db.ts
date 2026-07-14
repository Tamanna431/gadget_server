import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = { 
      bufferCommands: false,
      dbName: "gadgetverse"
    };
    // ✅ Non-null assertion operator (!) যোগ করুন
    cached.promise = mongoose.connect(MONGODB_URI!, options).then(async (mongooseInstance) => {
      console.log("✅ MongoDB Connected");
      try {
        const { seedData } = await import("../utils/seed");
        await seedData();
      } catch (seedErr) {
        console.error("❌ Auto-seeding database failed:", seedErr);
      }
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;