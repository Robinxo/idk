import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

// Register user
const signUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exist!\n");
  }
  const newUser = new User({ email, password, username });
  await newUser.save();
  console.log("User created successfully");
  console.log(newUser);
});
// Login user

const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  let existedUser;
  try {
    existedUser = await User.findOne({ email });
  } catch (err) {
    console.log("Can't find the user");
  }

  if (!existedUser) {
    throw new ApiError(401, "User not found!");
  }
  const isPasswordValid = bcrypt.compare(password, existedUser.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password!");
  }
  return res
    .status(200)
    .json({ message: "Login Successful", id: existedUser._id });
});

// get all users

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

// update user

const updateUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { email, username, password },
    { new: true },
  );
  res.status(200).json({ message: "Updated user successfully", updatedUser });
});

// Delete user

const deleteUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let wantToDelete = await User.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, wantToDelete.password);
  if (isPasswordValid) {
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    throw new ApiError(401, "Invalid password!");
  }
});

// get user by id

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({ user });
});

export { signUp, logIn, getAllUsers, updateUser, deleteUser, getUserById };
