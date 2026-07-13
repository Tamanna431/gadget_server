import express from 'express';
import {
  getAllGadgets,
  getGadgetById,
  createGadget,
  deleteGadget,
  getMyGadgets,
} from '../controllers/gadgetController';
import { protect } from '../middlewares/auth';

const router = express.Router();

// ✅ Public routes (protect ছাড়া)
router.get('/', getAllGadgets);           // সবাই দেখতে পারবে
router.get('/:id', getGadgetById);        // সবাই দেখতে পারবে

// ✅ Protected routes (protect middleware সহ)
router.get('/my', protect, getMyGadgets);              // শুধু logged in users
router.post('/', protect, createGadget);               // শুধু logged in users
router.delete('/:id', protect, deleteGadget);          // শুধু logged in users

export default router;