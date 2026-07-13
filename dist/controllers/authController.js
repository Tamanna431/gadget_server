"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
};
// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.User.create({ name, email, password: hashed });
        const token = generateToken(user._id.toString(), user.role);
        res.status(201).json({
            success: true,
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.register = register;
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Demo Login
        if (email === 'demo@gadgetverse.com' && password === 'demo123') {
            const token = generateToken('demo_user_id', 'user');
            return res.json({
                success: true,
                token,
                user: { id: 'demo_user_id', name: 'Demo User', email, role: 'user' },
            });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id.toString(), user.role);
        res.json({
            success: true,
            token,
            user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.login = login;
// Get current user
const getMe = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.id).select('-password');
        res.json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map