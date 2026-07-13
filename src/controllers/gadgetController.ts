import { Request, Response } from 'express';
import { Gadget } from '../models/Gadget';
import { AuthRequest } from '../middlewares/auth';

// Get all gadgets (with filter, sort, pagination)//h
export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = '1', limit = '8' } = req.query;
    const query: any = {};

    if (search) query.title = { $regex: search, $options: 'i' };
    if (category && category !== 'all') query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    if (sort === 'price-desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single gadget
export const getGadgetById = async (req: Request, res: Response) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: gadget });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create gadget (protected)
export const createGadget = async (req: AuthRequest, res: Response) => {
  try {
    const gadget = await Gadget.create({ ...req.body, createdBy: req.user?.id });
    res.status(201).json({ success: true, data: gadget });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete gadget (protected)
export const deleteGadget = async (req: AuthRequest, res: Response) => {
  try {
    const gadget = await Gadget.findById(req.params.id);
    if (!gadget) return res.status(404).json({ success: false, message: 'Not found' });
    
    // Admin চেক - req.user?.role এখন কাজ করবে
    if (gadget.createdBy.toString() !== req.user?.id && req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    await gadget.deleteOne();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my gadgets (protected)
export const getMyGadgets = async (req: AuthRequest, res: Response) => {
  try {
    const gadgets = await Gadget.find({ createdBy: req.user?.id });
    res.json({ success: true, data: gadgets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};