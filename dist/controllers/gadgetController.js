"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyGadgets = exports.deleteGadget = exports.createGadget = exports.getGadgetById = exports.getAllGadgets = void 0;
const Gadget_1 = require("../models/Gadget");
const getAllGadgets = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort, page = "1", limit = "8" } = req.query;
        const query = {};
        if (search)
            query.title = { $regex: search, $options: "i" };
        if (category && category !== "all")
            query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        let sortOption = { createdAt: -1 };
        if (sort === "price-asc")
            sortOption = { price: 1 };
        if (sort === "price-desc")
            sortOption = { price: -1 };
        if (sort === "rating")
            sortOption = { rating: -1 };
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const [gadgets, total] = await Promise.all([
            Gadget_1.Gadget.find(query).sort(sortOption).skip(skip).limit(limitNum),
            Gadget_1.Gadget.countDocuments(query),
        ]);
        res.json({
            success: true,
            data: gadgets,
            pagination: {
                total,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (error) {
        console.error("❌ Get All Gadgets Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllGadgets = getAllGadgets;
const getGadgetById = async (req, res) => {
    try {
        const gadget = await Gadget_1.Gadget.findById(req.params.id);
        if (!gadget) {
            return res.status(404).json({ success: false, message: "Gadget not found" });
        }
        res.json({ success: true, data: gadget });
    }
    catch (error) {
        console.error("❌ Get Gadget By ID Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGadgetById = getGadgetById;
const createGadget = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const gadget = new Gadget_1.Gadget({
            ...req.body,
            createdBy: req.user.id,
        });
        await gadget.save();
        res.status(201).json({ success: true, data: gadget });
    }
    catch (error) {
        console.error("❌ Create Gadget Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createGadget = createGadget;
const deleteGadget = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const gadget = await Gadget_1.Gadget.findByIdAndDelete(req.params.id);
        if (!gadget) {
            return res.status(404).json({ success: false, message: "Gadget not found" });
        }
        res.json({ success: true, message: "Gadget deleted successfully" });
    }
    catch (error) {
        console.error("❌ Delete Gadget Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteGadget = deleteGadget;
const getMyGadgets = async (req, res) => {
    try {
        console.log("🚀 [DEBUG] getMyGadgets called");
        console.log("🚀 [DEBUG] req.user:", req.user);
        if (!req.user || !req.user.id) {
            console.log("❌ [DEBUG] No user ID found");
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }
        console.log("🚀 [DEBUG] Querying for createdBy:", req.user.id);
        const gadgets = await Gadget_1.Gadget.find({ createdBy: req.user.id });
        console.log("✅ [DEBUG] Found gadgets:", gadgets.length);
        res.json({
            success: true,
            data: gadgets,
            count: gadgets.length,
        });
    }
    catch (error) {
        console.error("💥 [DEBUG] CATCH BLOCK ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMyGadgets = getMyGadgets;
//# sourceMappingURL=gadgetController.js.map