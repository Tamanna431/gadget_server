import { Request, Response } from "express";
import { Gadget } from "../models/Gadget";
import { AuthRequest } from "../middlewares/auth";

export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = "1", limit = "8" } = req.query;
    const query: any = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (category && category !== "all") query.category = category;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const [gadgets, total] = await Promise.all([
      Gadget.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Gadget.countDocuments(query),
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
  } catch (error: any) {
    console.error("❌ Get All Gadgets Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGadgetById = async (req: Request, res: Response) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) {
      return res.status(404).json({ success: false, message: "Gadget not found" });
    }
    res.json({ success: true, data: gadget });
  } catch (error: any) {
    console.error("❌ Get Gadget By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGadget = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const gadget = new Gadget({
      ...req.body,
      createdBy: req.user.id,
    });

    await gadget.save();
    res.status(201).json({ success: true, data: gadget });
  } catch (error: any) {
    console.error("❌ Create Gadget Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGadget = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const gadget = await Gadget.findByIdAndDelete(req.params.id);
    if (!gadget) {
      return res.status(404).json({ success: false, message: "Gadget not found" });
    }

    res.json({ success: true, message: "Gadget deleted successfully" });
  } catch (error: any) {
    console.error("❌ Delete Gadget Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyGadgets = async (req: AuthRequest, res: Response) => {
  try {
    console.log("🚀 [DEBUG] getMyGadgets called");
    console.log("🚀 [DEBUG] req.user:", req.user);

    if (!req.user || !req.user.id) {
      console.log("❌ [DEBUG] No user ID found");
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    console.log("🚀 [DEBUG] Querying for createdBy:", req.user.id);
    const gadgets = await Gadget.find({ createdBy: req.user.id });
    console.log("✅ [DEBUG] Found gadgets:", gadgets.length);

    res.json({
      success: true,
      data: gadgets,
      count: gadgets.length,
    });
  } catch (error: any) {
    console.error("💥 [DEBUG] CATCH BLOCK ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};