import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movies.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/User.js";
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

  if (ticketPrice <= 0 || typeof ticketPrice !== "number") {
    throw new ApiError(400, "Invalid ticket price");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const movie = await Movie.findById(movieId).session(session);
    if (!movie) throw new ApiError(404, "Movie not found");

    const showing = movie.showings.find(
      (s) => s.date.toISOString() === new Date(showingDate).toISOString(),
    );
    if (!showing) throw new ApiError(400, "Invalid showing date");

    let availableSeats = showing.availableSeats;

    const bookedSeats = [];

    console.log(
      "All available seats before booking:",
      availableSeats.map((s) => ({
        seatNumber: s.seatNumber,
        isBooked: s.isBooked,
      })),
    );

    for (const seatNumber of seats) {
      console.log(`Checking availability of seat: ${seatNumber}`);
      //      console.log("Available seats:", availableSeats);

      const seatNum = Number(seatNumber);
      const seat = availableSeats.find(
        (s) => s.seatNumber === seatNum && !s.isBooked,
      );
      //      const seat = availableSeats.find(
      //       (s) => s.seatNumber === seatNumber && !s.isBooked,
      //     );
      if (!seat) {
        console.log(`Seat ${seatNumber} is already booked or does not exist.`);
        throw new ApiError(400, `Seat ${seatNumber} is not available`);
      }

      bookedSeats.push(seatNumber);
    }

    const totalPrice = ticketPrice;

    const updatedMovie = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        "showings._id": showing._id,
        //        "showings.availableSeats.seatNumber": { $all: bookedSeats },
      },
      {
        $set: {
          "showings.$.availableSeats.$[seat].isBooked": true,
        },
      },
      {
        new: true,
        session,
        arrayFilters: [
          { "seat.seatNumber": { $in: bookedSeats }, "seat.isBooked": false },
        ],
      },
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
      showingDate,
      seats: bookedSeats,
      totalPrice,
      showingId: showing._id,
    });

    await booking.save({ session });
    await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: booking._id } },
      { session },
    );

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

export { deleteBooking, createBooking };
