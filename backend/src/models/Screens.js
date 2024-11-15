import mongoose from "mongoose";

const screenSchema = new mongoose.Schema({
  theater: { type: mongoose.Types.ObjectId, ref: "Theater", required: true },
  screenNumber: { type: Number, required: true },
  seats: [{ type: mongoose.Types.ObjectId, ref: "Seat" }],
});

export const Screen = mongoose.model("Screen", screenSchema);
