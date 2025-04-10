import { Router } from "express";
import {
  signUp,
  logIn,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getBookingofUser,
} from "../controllers/user.controller.js";

const router = Router();

// User login and signup routes
router.post("/signup", signUp);
router.post("/login", logIn);

// User Management Routes
router.get("/getAllUsers", getAllUsers);
router.get("/:id", getUserById);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/bookings/:id", getBookingofUser);

export default router;
