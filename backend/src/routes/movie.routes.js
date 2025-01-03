import { Router } from "express";
import { addMovie, deleteMovie } from "../controllers/movie.controller.js";

const movieRouter = Router();

movieRouter.route("/add").post(addMovie);
movieRouter.route("/delete").delete(deleteMovie);

export default movieRouter;
