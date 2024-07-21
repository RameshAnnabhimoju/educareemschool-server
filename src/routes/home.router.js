import { Router } from "express";
import {
  home,
  getHomeId,
  paylod,
  saveData,
  addItem,
} from "../controllers/home.controller.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.get("/", home);
router.get("/:id", getHomeId);
router.post("/payload", paylod);
router.post("/saveData", upload.single("image"), saveData);
router.post("/addItem", upload.single("itemImage"), addItem);
export default router;
