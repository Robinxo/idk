import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../Api-helper/api-helpers.js";

const Movies = () => {
  const [Movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        variant="h4"
        padding={2}
        textAlign="center"
        bgcolor={"#1976d2"}
        width="40%"
        color="white"
        margin={"auto"}
        sx={{
          borderRadius: 3,
        }}
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin={"auto"}
        marginTop="5"
        padding={4}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {Movies.map((item, index) => (
          <MovieItem
            id={item._id}
            title={item.title}
            posterUrl={item.posterUrl}
            releaseDate={item.releaseDate}
            ticketPrice={item.ticketPrice}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Movies;
