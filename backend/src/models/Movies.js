import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, min: 1 },
  isBooked: { type: Boolean, default: false },
});

const ShowingSchema = new mongoose.Schema({
  date: { type: Date, required: true, index: true },
  availableSeats: [SeatSchema], // Now stores seat objects instead of just numbers
  version: { type: Number, default: 0 }, // Helps prevent race conditions
});

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
        required: true,
      },
    ],
    releaseDate: {
      type: Date,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    showings: [ShowingSchema],
  },
  {
    timestamps: true,
  },
);

// Ensure each seat number is unique per showing
MovieSchema.index(
  { "showings._id": 1, "showings.availableSeats.seatNumber": 1 },
  { unique: true },
);

const Movies = mongoose.model("Movies", MovieSchema);
export default Movies;
