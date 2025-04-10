import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/Admin.js";
import { User } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import "dotenv/config";

const authAdmin = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") || req.cookies.token;
  // const token = req.cookies.token;

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
  } catch (error) {
    throw new ApiError(403, "Invalid or expired token");
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") || req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(403, "Invalid or expired token");
  }
});

export { authAdmin, authUser };
