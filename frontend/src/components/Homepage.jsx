import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem.jsx";
import { Link } from "react-router-dom";
import { getAllMovies } from "../Api-helper/api-helpers.js";

const Homepage = () => {
  const [movies, setmovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setmovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"70%"} height={"40vh"} padding={2}>
        <img
          src="https://images.livemint.com/img/2022/07/22/1140x641/294778926_174266841737917_6086865701047889521_n_1658473701055_1658473723121_1658473723121.webp"
          alt="movie-banner"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"} marginTop={7}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>
      <Box
        display="flex"
        margin="auto"
        width="80%"
        justifyContent={"center"}
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 6)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d32" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
