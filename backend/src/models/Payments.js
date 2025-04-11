import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    Booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      description: "The booking info",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const Payment = mongoose.model("Payment", PaymentSchema);
