import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        type: mongoose.Types.ObjectId,
        ref: "Booking",
        description: "List of booking references made by the user.",
      },
    ],
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};
UserSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

export const user = mongoose.model("User", UserSchema);
