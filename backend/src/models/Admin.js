import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^.+@.+\..+$/, // Basic email format validation
      description: "The email address of the user, must be unique.",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      description:
        "The password for the user account, must be at least 6 characters long.",
    },
    addedMovies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movies",
        description: "List of movie references added by the user.",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const Admin = mongoose.model("Admin", AdminSchema);
