"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ একদম প্রথম লাইনে .env লোড করুন
const better_auth_1 = require("better-auth");
const mongodb_1 = require("better-auth/adapters/mongodb");
const mongodb_2 = require("mongodb");
const mongoUri = process.env.MONGODB_URI;
// 
if (!mongoUri) {
    throw new Error("❌ MONGODB_URI is missing in backend .env file!");
}
const client = new mongodb_2.MongoClient(mongoUri);
const db = client.db("gadgetverse");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_1.mongodbAdapter)(db),
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
//# sourceMappingURL=auth.js.map