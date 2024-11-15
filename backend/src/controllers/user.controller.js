import { user } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  console.log("email:", email);
  console.log("password:", password);
  console.log("username :", username);

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await user.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with error");
  }
  const newUser = new user({ email, password, username });
  await newUser.save();
});

export default registerUser;
