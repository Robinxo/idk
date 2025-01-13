import { Movie } from "../models/Movies.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const addMovie = asyncHandler(async (req, res) => {
  const { title, description, actors, releaseDate, posterUrl } = req.body;
  console.log("title:", title);
  console.log("description:", description);
  console.log("actors:", actors);
  console.log("releaseDate:", releaseDate);
  console.log("posterUrl:", posterUrl);

  if (
    [title, description, releaseDate, posterUrl].some(
      (field) => field?.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const newMovie = new Movie({
    title,
    description,
    actors,
    posterUrl,
  });
  const existedMovie = await Movie.findOne({
    $or: [{ title, description, actors, posterUrl }],
  });
  if (existedMovie) {
    throw new ApiError(409, "Movie already exist!");
  }
  await newMovie.save();
  res.status(201).json({
    success: true,
    message: "Movie added successfully",
  });
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

export { addMovie, deleteMovie };
