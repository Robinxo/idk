import { Router } from "express";
import { addMovie, deleteMovie } from "../controllers/movie.controller.js";
import authAdmin from "../middlewares/auth.middleware.js";

const movieRouter = Router();

movieRouter.route("/add").post(authAdmin, addMovie);
movieRouter.route("/delete").delete(authAdmin, deleteMovie);

export default movieRouter;
