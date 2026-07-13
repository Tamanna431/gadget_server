"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyGadgets = exports.deleteGadget = exports.createGadget = exports.getGadgetById = exports.getAllGadgets = void 0;
const Gadget_1 = require("../models/Gadget");
// Get all gadgets (with filter, sort, pagination)
const getAllGadgets = async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort, page = '1', limit = '8' } = req.query;
        const query = {};
        if (search)
            query.title = { $regex: search, $options: 'i' };
        if (category && category !== 'all')
            query.category = category;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        let sortOption = { createdAt: -1 };
        if (sort === 'price-asc')
            sortOption = { price: 1 };
        if (sort === 'price-desc')
            sortOption = { price: -1 };
        if (sort === 'rating')
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
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllGadgets = getAllGadgets;
// Get single gadget
const getGadgetById = async (req, res) => {
    try {
        const gadget = await Gadget_1.Gadget.findById(req.params.id);
        if (!gadget)
            return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: gadget });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getGadgetById = getGadgetById;
// Create gadget (protected)
const createGadget = async (req, res) => {
    try {
        const gadget = await Gadget_1.Gadget.create({ ...req.body, createdBy: req.user?.id });
        res.status(201).json({ success: true, data: gadget });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.createGadget = createGadget;
// Delete gadget (protected)
const deleteGadget = async (req, res) => {
    try {
        const gadget = await Gadget_1.Gadget.findById(req.params.id);
        if (!gadget)
            return res.status(404).json({ success: false, message: 'Not found' });
        // Admin চেক - req.user?.role এখন কাজ করবে
        if (gadget.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        await gadget.deleteOne();
        res.json({ success: true, message: 'Deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteGadget = deleteGadget;
// Get my gadgets (protected)
const getMyGadgets = async (req, res) => {
    try {
        const gadgets = await Gadget_1.Gadget.find({ createdBy: req.user?.id });
        res.json({ success: true, data: gadgets });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMyGadgets = getMyGadgets;
//# sourceMappingURL=gadgetController.js.map