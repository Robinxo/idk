import { Router } from "express";
import { authAdmin } from "../middlewares/auth.middleware.js";
import {
  registerAdmin,
  getAllAdmin,
  loginAdmin,
  getAdminByID
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", registerAdmin);
adminRouter.get("/allAdmin", authAdmin, getAllAdmin);
adminRouter.get("/:id", getAdminByID);

export default adminRouter;
