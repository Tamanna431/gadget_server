"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetController_1 = require("../controllers/gadgetController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// ✅ নির্দিষ্ট রুটগুলো উপরে
router.get("/", gadgetController_1.getAllGadgets);
router.get("/my", auth_1.protect, gadgetController_1.getMyGadgets); // ✅ `as any` যোগ করুন
// ✅ ডাইনামিক রুটগুলো নিচে
router.post("/", auth_1.protect, gadgetController_1.createGadget); // ✅ `as any` যোগ করুন
router.get("/:id", gadgetController_1.getGadgetById);
router.delete("/:id", auth_1.protect, gadgetController_1.deleteGadget); // ✅ `as any` যোগ করুন
exports.default = router;
//# sourceMappingURL=gadgetRoutes.js.map