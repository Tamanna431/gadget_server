import dotenv from "dotenv";
dotenv.config(); // ✅ একদম প্রথম লাইনে .env লোড করুন

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, Db } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

// 
if (!mongoUri) {
  throw new Error("❌ MONGODB_URI is missing in backend .env file!");
}

const client = new MongoClient(mongoUri);
const db: Db = client.db("gadgetverse");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});