import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movies",
      required: true,
      description: "The ID of the movie being booked.",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      description: "The ID of the user who made the booking.",
    },

    showingDate: {
      type: Date,
      required: true,
      description: "The date and time of the booking.",
    },
    seats: [
      {
        type: Number,
        required: true,
        min: 1,
        description: "The seat number assigned for the booking.",
      },
    ],
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);
const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
