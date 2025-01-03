import { Router } from "express";
import {
  signUp,
  logIn,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/login", logIn);

// User Management Routes
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById); // Include dynamic parameter for ID
router.put("/updateUser/:id", updateUser); // Use PUT for updates
router.delete("/deleteUser/:id", deleteUser); // Use DELETE for deletions

export default router;
