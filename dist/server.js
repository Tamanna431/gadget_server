"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gadgetRoutes_1 = __importDefault(require("./routes/gadgetRoutes"));
const app = (0, express_1.default)();
// CORS - Vercel URL যোগ করুন
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://gadget-client-chi.vercel.app" // ✅ আপনার Vercel frontend URL
    ],
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/gadgets", gadgetRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ success: true, message: "GadgetVerse API is running 🚀" });
});
// ✅ Vercel এর জন্য - app.listen() এর বদলে এটি ব্যবহার করুন
exports.default = app;
// ❌ এই লাইনগুলো কমেন্ট আউট করুন বা মুছে ফেলুন:
// const PORT = process.env.PORT || 5000;
// const start = async () => {
//   await connectDB();
//   await seedData();
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// };
// start();
//# sourceMappingURL=server.js.map