import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

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
AdminSchema.pre("save", async function (next) {
  console.log("Pre-save hook running 😛 ");
  if (!this.isModified("password")) {
    console.log("Password not modified, skipping hash");
    return next();
  }
  try {
    // Hash the password
    console.log("Hashing password");
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed successfully");
  } catch (err) {
    next(err);
  }
});
AdminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: "admin",
    },

    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    },
  );
};
AdminSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const Admin = mongoose.model("Admin", AdminSchema);
