import { Router } from "express";
import authAdmin from "../middlewares/auth.middleware.js";
import {
  registerAdmin,
  getAllAdmin,
  loginAdmin,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/login", authAdmin, loginAdmin);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/allAdmin", authAdmin, getAllAdmin);

export default adminRouter;
