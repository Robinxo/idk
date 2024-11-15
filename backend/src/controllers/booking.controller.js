import { Booking } from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const makeBooking = asyncHandler(async (req, res) => {
  const { movie, date, seatNumber, user } = req.body;
  console.log("movie:", movie);
  console.log("date:", date);
  console.log("seatNumber:", seatNumber);
  console.log("user:", user);

  if ([movie, date, seatNumber, user].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const newBooking = new Booking({ movie, date, seatNumber, user });
  const existedBooking = await Booking.findOne({
    $or: [{ seatNumber, date, movie, user }],
  });
  if (existedBooking) {
    throw new ApiError(409, "Booking already exist!");
  }
  await newBooking.save();
  res.status(201).json({ message: "Booking created successfully" });
});
