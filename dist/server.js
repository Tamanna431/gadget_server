"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const gadgetRoutes_1 = __importDefault(require("./routes/gadgetRoutes"));
const seed_1 = require("./utils/seed");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/gadgets', gadgetRoutes_1.default);
app.get('/', (req, res) => {
    res.json({ success: true, message: 'GadgetVerse API is running 🚀' });
});
const PORT = process.env.PORT || 5000;
const start = async () => {
    await (0, db_1.default)();
    await (0, seed_1.seedData)();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};
start();
//# sourceMappingURL=server.js.map