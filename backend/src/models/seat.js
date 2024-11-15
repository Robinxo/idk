import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  screen: { type: mongoose.Types.ObjectId, ref: "Screen", required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, required: true },
});

export const Seat = mongoose.model("Seat", seatSchema);
