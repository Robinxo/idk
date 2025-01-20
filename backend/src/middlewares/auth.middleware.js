import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import "dotenv/config";

const authAdmin = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeaders.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded._id);
    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }
    req.admin = admin;
    next();
    return admin;
  } catch (error) {
    throw new ApiError(403, "Invalid or expired token");
  }
});

export default authAdmin;
