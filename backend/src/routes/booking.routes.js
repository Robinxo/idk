import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { bookMovie, deleteBooking } from "../controllers/booking.controller.js";

const bookingrouter = Router();

bookingrouter.route("/bookMovie").post(authUser, bookMovie);
bookingrouter
  .route("/deleteBooking/:bookingId")
  .delete(authUser, deleteBooking);

export default bookingrouter;
