import Movie from "../models/Movies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";

const addMovie = asyncHandler(async (req, res) => {
  const adminId = req.admin;

  const { title, description, actors, releaseDate, posterUrl } = req.body;

  if ([title, description, posterUrl].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const newMovie = new Movie({
    title,
    description,
    actors,
    posterUrl,
    releaseDate,
    admin: adminId,
  });
  const existedMovie = await Movie.findOne({
    $or: [{ title, description, actors, posterUrl }],
  });
  if (existedMovie) {
    throw new ApiError(409, "Movie already exist!");
  }
  res.status(201).json({
    success: true,
    message: "Movie added successfully",
  });
  const session = await mongoose.startSession();
  const adminUser = await Admin.findById(adminId);

  session.startTransaction();
  await newMovie.save({ session });
  adminUser.addedMovies.push(newMovie);
  await adminUser.save({ session });

  await session.commitTransaction();
});
const deleteMovie = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if ([title].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const movie = await Movie.findOneAndDelete({ title });
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }
  res.status(200).json({ message: "Movie deleted successfully" });
});

const getAllmovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json({ movies });
});

export { addMovie, deleteMovie ,getAllmovies };
