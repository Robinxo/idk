import { Admin } from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email);
  console.log("password:", password);

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await Admin.findOne({
    $or: [{ email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Admin already exist!");
  }
  const newAdmin = new Admin({ email, password: password });
  await newAdmin.save();
});

export default registerAdmin;
