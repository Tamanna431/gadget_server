"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: ".env",
});
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gadgetRoutes_1 = __importDefault(require("./routes/gadgetRoutes"));
const app = (0, express_1.default)();
// MongoDB connect
(0, db_1.default)().catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
// Middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://gadget-client-chi.vercel.app",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/gadgets", gadgetRoutes_1.default);
// Health Check
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 GadgetVerse API is running",
    });
});
// Vercel Serverless Export
exports.default = app;
//# sourceMappingURL=server.js.map