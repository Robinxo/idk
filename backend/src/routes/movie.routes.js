import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getAllmovies,
  getMovieById,
} from "../controllers/movie.controller.js";
import { authAdmin } from "../middlewares/auth.middleware.js";

const movieRouter = Router();

movieRouter.route("/add").post(authAdmin, addMovie);
movieRouter.route("/delete").delete(authAdmin, deleteMovie);
movieRouter.route("/getMovies").get(getAllmovies);
movieRouter.route("/:id").get(getMovieById);

export default movieRouter;
