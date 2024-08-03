import { Router } from "express";
import {
  createUser,
  findUsers,
  getAllUsers,
  deleteUser,
  findUsersByRole,
} from "../controllers/user.controller.js";

const router = Router();
router.post("/addUser", createUser);
router.get("/getAllUSers", getAllUsers);
router.get("/findUserByRole", findUsersByRole);
router.get("/findUser", findUsers);
router.delete("/deleteUser", deleteUser);
export default router;
