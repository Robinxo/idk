import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { User } from "../models/User.js";
import Movie from "../models/Movies.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBooking = asyncHandler(async (req, res) => {
  const {
    movie: movieId,
    user: userId,
    showingDate,
    seats,
    ticketPrice,
  } = req.body;

  if (!movieId || !userId || !showingDate || !seats || !Array.isArray(seats)) {
    throw new ApiError(400, "Missing required booking information");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const movie = await Movie.findById(movieId).session(session);

    if (!movie) {
      throw new ApiError(404, "Movie not found");
    }

    const showing = movie.showings.find(
      (s) => s.date.toISOString() === new Date(showingDate).toISOString(), // VERY IMPORTANT: Compare dates carefully
    );

    if (!showing) {
      throw new ApiError(400, "Invalid showing date");
    }

    // Clone available seats to avoid modifying the original array directly
    let availableSeats = [...showing.availableSeats];
    const bookedSeats = [];

    for (const seat of seats) {
      const index = availableSeats.indexOf(seat);
      if (index === -1) {
        throw new ApiError(400, `Seat ${seat} is not available`);
      }
      bookedSeats.push(availableSeats.splice(index, 1)[0]);
    }

    // Calculate total price (replace with your actual pricing logic)

    // Update the movie's showings with the booked seats removed and use optimistic concurrency control
    const updatedMovie = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        "showings._id": showing._id,
        "showings.availableSeats": { $all: bookedSeats },
      },
      {
        $pull: {
          "showings.$.availableSeats": { $in: bookedSeats },
        },
      },
      { new: true, session: session },
    );

    if (!updatedMovie) {
      throw new ApiError(
        409,
        "Seats are no longer available (concurrency issue)",
      );
    }

    const booking = new Booking({
      movie: movieId,
      user: userId,
      showingDate: showingDate,
      seats: bookedSeats,
      totalPrice: totalPrice,
    });

    await booking.save({ session: session });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error creating booking:", error);
    throw new ApiError(500, `Failed to create booking: ${error.message}`);
  } finally {
    session.endSession();
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
