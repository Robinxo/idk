import { Router } from "express";
import addMovie from "../controllers/movie.controller.js";

const movieRouter = Router();

movieRouter.route("/add").post(addMovie);

export default movieRouter;
