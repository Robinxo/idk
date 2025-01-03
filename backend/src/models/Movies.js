import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      description: "The title of the movie.",
    },
    description: {
      type: String,
      required: true,
      description: "A brief description of the movie.",
    },
    actors: [
      {
        type: String,
        required: true,
        description: "List of actors in the movie.",
      },
    ],
    releaseDate: {
      type: String,
      required: true,
      description: "The release date of the movie.",
    },
    posterUrl: {
      type: String,
      required: true,
      description: "URL to the poster image of the movie.",
    },
    featured: {
      type: Boolean,
      description: "Indicates if the movie is featured.",
    },
    bookings: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Booking",
        description: "List of booking references related to the movie.",
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
