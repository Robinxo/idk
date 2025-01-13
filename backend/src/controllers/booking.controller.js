import Booking from "../models/Booking.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

const bookMovie = asyncHandler(async (req, res) => {
  const { movieId, date, seatNumber } = req.body;
  const user = req.user._id;
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }
  const booking = new Booking({ movie: movieId, date, seatNumber, user });
  const savedBooking = await booking.save();
});

const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  res.status(200).json({ message: "Booking deleted successfully" });
});

export { bookMovie };
