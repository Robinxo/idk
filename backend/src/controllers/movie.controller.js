import { movie } from "../models/Movies.js";
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
  const newMovie = new movie({
    title,
    description,
    actors,
    releaseDate,
    posterUrl,
  });
  const existedMovie = await movie.findOne({
    $or: [{ title, description, actors, releaseDate, posterUrl }],
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
export default addMovie;
