import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { User } from "../models/User.js";
import Movie from "../models/Movies.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bookMovie = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const { movieId, date, seatNumber } = req.body;
  let existingMovie;

  try {
    existingMovie = await Movie.findById(movieId);
  } catch (error) {
    return res.send(err.message);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie not found by given id" });
  }
  const newBooking = new Booking({
    movie: movieId,
    date,
    seatNumber,
    user: userId,
  });

  const existingUser = await User.findById(userId);

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    // Update user and movie bookings
    existingUser.bookings.push(newBooking);
    existingMovie.bookings.push(newBooking);

    await newBooking.save({ session });
    await existingUser.save({ session });
    await existingMovie.save({ session });

    await session.commitTransaction();
    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error("Transaction error:", err);

    if (session) await session.abortTransaction();
    next(new ApiError(500, "Failed to create booking"));
  } finally {
    if (session) session.endSession();
  }
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  res.status(200).json({ message: "Booking deleted successfully" });
});

export { bookMovie, deleteBooking };
