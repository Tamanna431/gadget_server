import express from 'express';
import {
  getAllGadgets,
  getGadgetById,
  createGadget,
  deleteGadget,
  getMyGadgets,
} from '../controllers/gadgetController';
import { protect } from '../middlewares/auth';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/', getAllGadgets);
router.get('/my', protect as unknown as (req: Request, res: Response, next: NextFunction) => void, getMyGadgets);
router.get('/:id', getGadgetById);
router.post('/', protect as unknown as (req: Request, res: Response, next: NextFunction) => void, createGadget);
router.delete('/:id', protect as unknown as (req: Request, res: Response, next: NextFunction) => void, deleteGadget);

export default router;