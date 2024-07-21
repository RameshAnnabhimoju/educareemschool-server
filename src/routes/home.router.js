import { Router } from "express";
import { addItem } from "../controllers/home.controller.js";
import { upload } from "../middlewares/multer.js";
const router = Router();
router.post("/addItem", upload.single("itemImage"), addItem);
export default router;
