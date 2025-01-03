import { Router } from "express";
import { bookMovie, deleteBooking } from "../controllers/booking.controller.js";

const router = Router();

router.post("/bookMovie", bookMovie);
