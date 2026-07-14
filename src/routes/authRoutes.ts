import express from "express";
import { register, login, getMe } from "../controllers/authController";
import { protect } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect as any, getMe as any);

export default router;