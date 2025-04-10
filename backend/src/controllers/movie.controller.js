import Movies from "../models/Movies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { Admin } from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";

function generateSeatNumbers(numberOfSeats) {
  const seats = [];
  for (let i = 1; i <= numberOfSeats; i++) {
    seats.push(i);
  }
  return seats;
}

const addMovie = asyncHandler(async (req, res) => {
  const adminId = req.admin;
  const {
    title,
    description,
    actors,
    releaseDate,
    posterUrl,
    showings,
    ticketPrice,
  } = req.body;

  if ([title, description, posterUrl].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!showings && !Array.isArray(showings)) {
    throw new ApiError(400, "Showings must be an array");
  }
  if (showings.length === 0) {
    throw new ApiError(400, "At least one showing is required");
  }

  if (actors && !Array.isArray(actors)) {
    throw new ApiError(400, "Actors must be an array");
  }
  showings.forEach((showing, index) => {
    console.log(`Showing at index ${index}:`, showing);
    if (!showing.date || typeof showing.numberOfSeats !== "number") {
      throw new ApiError(400, `Invalid showing data at index ${index}`);
    }
  });

  const existedMovie = await Movies.findOne({
    $or: [{ title, description, actors, posterUrl }],
  });
  if (existedMovie) {
    throw new ApiError(409, "Movie already exist!");
  }
  const showingWithSeats = showings.map((showing) => ({
    date: showing.date,
    availableSeats: generateSeatNumbers(showing.numberOfSeats).map(
      (seatNumber) => ({
        seatNumber,
        isBooked: false,
      }),
    ),
  }));
  const adminIdnew = adminId._id;

  console.log(adminIdnew);
  const newMovie = new Movies({
    title,
    description,
    actors,
    posterUrl,
    releaseDate,
    admin: adminIdnew,
    showings: showingWithSeats,
    ticketPrice,
  });

  console.log("New movie data:", newMovie);
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await newMovie.save({ session });
    await Admin.findByIdAndUpdate(
      adminIdnew,
      { $push: { addedMovies: newMovie._id } },
      { session },
    );
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Movie added successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, "Failed to add movie");
  } finally {
    await session.endSession();
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if ([title].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const movie = await Movies.findOneAndDelete({ title });
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }
  res.status(200).json({ message: "Movie deleted successfully" });
});

const getAllmovies = asyncHandler(async (req, res) => {
  const movies = await Movies.find();
  res.status(200).json({ movies });
});

const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;

  try {
    movie = await Movies.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie Id" });
  }
  return res.status(200).json({ movie });
};

export { addMovie, deleteMovie, getAllmovies, getMovieById };
