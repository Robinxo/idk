import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movies",
      required: true,
      description: "The ID of the movie being booked.",
    },
    date: {
      type: String,
      required: true,
      description: "The date and time of the booking.",
    },
    seatNumber: {
      type: Number,
      required: true,
      description: "The seat number assigned for the booking.",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      description: "The ID of the user who made the booking.",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);
export const Booking = mongoose.model("Booking", BookingSchema);
