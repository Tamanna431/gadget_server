import express from "express";
import {
  getAllGadgets,
  getGadgetById,
  createGadget,
  deleteGadget,
  getMyGadgets,
} from "../controllers/gadgetController";
import { protect } from "../middlewares/auth";

const router = express.Router();

// ✅ নির্দিষ্ট রুটগুলো উপরে
router.get("/", getAllGadgets);
router.get("/my", protect as any, getMyGadgets as any);  // ✅ `as any` যোগ করুন

// ✅ ডাইনামিক রুটগুলো নিচে
router.post("/", protect as any, createGadget as any);  // ✅ `as any` যোগ করুন
router.get("/:id", getGadgetById);
router.delete("/:id", protect as any, deleteGadget as any);  // ✅ `as any` যোগ করুন

export default router;