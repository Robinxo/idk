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
      ref: "Admin",
      // For future need to add the admin authenticator
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Movies = mongoose.model("Movies", MovieSchema);
export default Movies;
