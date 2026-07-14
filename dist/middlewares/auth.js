"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const auth_1 = require("../lib/auth");
const protect = async (req, res, next) => {
    try {
        console.log("🔍 Checking session...");
        const session = await auth_1.auth.api.getSession({
            headers: req.headers,
        });
        console.log("Session:", session ? "Found" : "Not Found");
        if (!session || !session.user) {
            console.log("❌ No valid session");
            return res.status(401).json({
                success: false,
                message: "No session, please login",
            });
        }
        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role || "user", // ✅ fallback দিন
        };
        console.log("✅ User authenticated:", req.user.email);
        next();
    }
    catch (error) {
        console.error("❌ Auth Error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid session",
        });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map