import mongoose from "mongoose";

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
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
      },
    ],
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "admin",
      // For future need to add the admin authenticator
      // required: true,
      description: "The ID of the admin who added the movie.",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);
export const Movie = mongoose.model("Movies", MovieSchema);
