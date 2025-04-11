import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      description: "The name of the user.",
    },

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
      minLength: 6,
      description:
        "The password for the user account, must be at least 6 characters long.",
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        description: "List of booking references made by the user.",
      },
    ],
  },
  { timestamps: true },
);
UserSchema.pre("save", async function (next) {
  console.log("Pre-save hook running 😛");

  if (!this.isModified("password")) {
    console.log("Password not modified, skipping hash");
    return next();
  }

  try {
    // Hash the password
    console.log("Hashing password");
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed successfully");
    next();
  } catch (err) {
    // Pass error to next middleware
    next(err);
  }
});

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    },
  );
};
export const User = mongoose.model("User", UserSchema);
