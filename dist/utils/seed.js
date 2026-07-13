"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const Gadget_1 = require("../models/Gadget");
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedData = async () => {
    try {
        // Create demo users
        const adminExists = await User_1.User.findOne({ email: 'admin@gadgetverse.com' });
        if (!adminExists) {
            await User_1.User.create({
                name: 'Admin',
                email: 'admin@gadgetverse.com',
                password: await bcryptjs_1.default.hash('admin123', 10),
                role: 'admin',
            });
            await User_1.User.create({
                name: 'John User',
                email: 'user@gadgetverse.com',
                password: await bcryptjs_1.default.hash('user123', 10),
                role: 'user',
            });
            console.log('✅ Users seeded');
        }
        // Seed gadgets
        const count = await Gadget_1.Gadget.countDocuments();
        if (count === 0) {
            const admin = await User_1.User.findOne({ email: 'admin@gadgetverse.com' });
            const gadgets = [
                {
                    title: 'Apple Watch Series 9',
                    shortDesc: 'Advanced health tracking with bright always-on display',
                    fullDesc: 'The Apple Watch Series 9 features a brighter always-on Retina display, S9 SiP chip, and Double Tap gesture. Track your workouts, heart rate, blood oxygen, and sleep with precision.',
                    price: 399,
                    category: 'Smartwatch',
                    rating: 4.8,
                    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
                    brand: 'Apple',
                    stock: 25,
                    createdBy: admin?._id,
                },
                {
                    title: 'Sony WH-1000XM5',
                    shortDesc: 'Industry-leading noise canceling headphones',
                    fullDesc: 'Experience exceptional sound quality with industry-leading noise cancellation. 30-hour battery life, multipoint connection, and speak-to-chat technology.',
                    price: 349,
                    category: 'Headphones',
                    rating: 4.7,
                    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
                    brand: 'Sony',
                    stock: 18,
                    createdBy: admin?._id,
                },
                {
                    title: 'Samsung Galaxy S24 Ultra',
                    shortDesc: 'AI-powered flagship smartphone with S Pen',
                    fullDesc: 'The Galaxy S24 Ultra features a titanium frame, 200MP camera, built-in S Pen, and Galaxy AI features for translation, photo editing, and more.',
                    price: 1299,
                    category: 'Smartphone',
                    rating: 4.9,
                    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600',
                    brand: 'Samsung',
                    stock: 12,
                    createdBy: admin?._id,
                },
                {
                    title: 'MacBook Pro 14" M3',
                    shortDesc: 'Pro performance with M3 chip and Liquid Retina XDR',
                    fullDesc: 'Supercharged by M3 Pro or M3 Max chip. Up to 22 hours battery life, Liquid Retina XDR display, and professional-grade performance for demanding workflows.',
                    price: 1999,
                    category: 'Laptop',
                    rating: 4.9,
                    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
                    brand: 'Apple',
                    stock: 8,
                    createdBy: admin?._id,
                },
                {
                    title: 'AirPods Pro 2nd Gen',
                    shortDesc: 'Active noise cancellation with USB-C charging',
                    fullDesc: 'Rebuilt from the sound up with H2 chip, Adaptive Audio, Personalized Spatial Audio, and up to 2x more Active Noise Cancellation.',
                    price: 249,
                    category: 'Earbuds',
                    rating: 4.7,
                    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600',
                    brand: 'Apple',
                    stock: 30,
                    createdBy: admin?._id,
                },
                {
                    title: 'iPad Pro 12.9" M2',
                    shortDesc: 'Supercharged by M2 chip with Liquid Retina XDR',
                    fullDesc: 'The ultimate iPad experience with M2 chip, Apple Pencil hover, ProRes video, and the stunning Liquid Retina XDR display.',
                    price: 1099,
                    category: 'Tablet',
                    rating: 4.8,
                    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600',
                    brand: 'Apple',
                    stock: 15,
                    createdBy: admin?._id,
                },
                {
                    title: 'DJI Mini 4 Pro',
                    shortDesc: 'Compact 4K drone with omnidirectional sensing',
                    fullDesc: 'Under 249g drone with 4K/60fps HDR video, 48MP photos, omnidirectional obstacle sensing, and 34-min flight time.',
                    price: 759,
                    category: 'Drone',
                    rating: 4.6,
                    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600',
                    brand: 'DJI',
                    stock: 10,
                    createdBy: admin?._id,
                },
                {
                    title: 'Bose QuietComfort Ultra',
                    shortDesc: 'Premium noise canceling with immersive audio',
                    fullDesc: 'World-class noise cancellation, Bose Immersive Audio, CustomTune sound calibration, and up to 24 hours battery life.',
                    price: 429,
                    category: 'Headphones',
                    rating: 4.7,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
                    brand: 'Bose',
                    stock: 20,
                    createdBy: admin?._id,
                },
            ];
            await Gadget_1.Gadget.insertMany(gadgets);
            console.log('✅ Gadgets seeded');
        }
    }
    catch (error) {
        console.error('Seed error:', error);
    }
};
exports.seedData = seedData;
//# sourceMappingURL=seed.js.map