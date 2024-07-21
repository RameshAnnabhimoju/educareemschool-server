import { Router } from "express";
import {
  createUser,
  findUser,
  getAllUsers,
  userLogin,
  deleteUser,
  findUsersByRole,
} from "../controllers/user.controller.js";

const router = Router();
router.post("/addUser", createUser);
router.post("/login", userLogin);
router.get("/getAllUSers", getAllUsers);
router.get("/findUserByRole", findUsersByRole);
router.get("/findUser", findUser);
router.delete("/deleteUser", deleteUser);
export default router;
