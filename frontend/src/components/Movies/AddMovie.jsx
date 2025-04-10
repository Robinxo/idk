import {
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { addMovie } from "../../Api-helper/api-helpers.js";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddMovies = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
    ticketPrice: "",
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [showings, setShowings] = useState([{ date: "", numberOfSeats: 1 }]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleActorAdd = () => {
    if (actor.trim() && !actors.includes(actor.trim())) {
      setActors([...actors, actor.trim()]);
      setActor("");
    }
  };

  const handleActorDelete = (index) => {
    setActors(actors.filter((_, i) => i !== index));
  };

  const handleShowingChange = (index, event) => {
    const { name, value } = event.target;
    setShowings((prevShowings) =>
      prevShowings.map((showing, i) =>
        i === index
          ? {
              ...showing,
              [name]:
                name === "numberOfSeats" ? Math.max(1, Number(value)) : value,
            }
          : showing,
      ),
    );
  };

  const handleShowingAdd = () => {
    setShowings([...showings, { date: "", numberOfSeats: 1 }]);
  };

  const handleShowingDelete = (index) => {
    setShowings(showings.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.description || !inputs.releaseDate || !inputs.ticketPrice) {
      alert("Please fill all required fields.");
      return;
    }
    if (
      showings.some((showing) => !showing.date || showing.numberOfSeats < 1)
    ) {
      alert("Please fill all showing fields correctly.");
      return;
    }
    addMovie({ ...inputs, actors, showings })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
    >
      <Paper elevation={3} sx={{ p: 4, width: "80%", maxWidth: "800px" }}>
        <Typography textAlign="center" variant="h4" mb={4}>
          Add New Movie
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
          >
            {/* Title */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Title</FormLabel>
              <TextField
                fullWidth
                value={inputs.title}
                onChange={handleChange}
                name="title"
                variant="outlined"
              />
            </Box>

            {/* Description */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Description</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={inputs.description}
                onChange={handleChange}
                name="description"
                variant="outlined"
              />
            </Box>

            {/* Poster URL */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Poster URL</FormLabel>
              <TextField
                fullWidth
                value={inputs.posterUrl}
                onChange={handleChange}
                name="posterUrl"
                variant="outlined"
              />
            </Box>

            {/* Release Date */}
            <Box>
              <FormLabel sx={labelProps}>Release Date</FormLabel>
              <TextField
                fullWidth
                type="date"
                value={inputs.releaseDate}
                onChange={handleChange}
                name="releaseDate"
                variant="outlined"
              />
            </Box>

            {/* Featured Checkbox */}
            <Box display="flex" alignItems="center">
              <FormLabel sx={labelProps}>Featured</FormLabel>
              <Checkbox
                checked={inputs.featured}
                onChange={(e) =>
                  setInputs((prevState) => ({
                    ...prevState,
                    featured: e.target.checked,
                  }))
                }
                name="featured"
                sx={{ ml: 1 }}
              />
            </Box>

            {/* Ticket Price */}
            <Box>
              <FormLabel sx={labelProps}>Ticket Price</FormLabel>
              <TextField
                fullWidth
                type="number"
                value={inputs.ticketPrice}
                onChange={handleChange}
                name="ticketPrice"
                variant="outlined"
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Box>

            {/* Actors */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Actors</FormLabel>
              <Box display="flex" alignItems="center">
                <TextField
                  fullWidth
                  value={actor}
                  onChange={(e) => setActor(e.target.value)}
                  variant="outlined"
                  sx={{ mr: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleActorAdd}
                  disabled={!actor.trim()}
                >
                  Add
                </Button>
              </Box>
              <List>
                {actors.map((a, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleActorDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={a} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Showings */}
            <Box gridColumn="span 2">
              <FormLabel sx={labelProps}>Showings</FormLabel>
              {showings.map((showing, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <TextField
                    type="datetime-local"
                    name="date"
                    value={showing.date}
                    onChange={(event) => handleShowingChange(index, event)}
                    variant="outlined"
                    sx={{ mr: 2 }}
                    label=""
                  />
                  <TextField
                    type="number"
                    name="numberOfSeats"
                    value={showing.numberOfSeats}
                    onChange={(event) => handleShowingChange(index, event)}
                    variant="outlined"
                    sx={{ mr: 2 }}
                    label="Seats"
                    inputProps={{ min: 1 }}
                  />
                  <IconButton onClick={() => handleShowingDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button variant="outlined" onClick={handleShowingAdd}>
                Add Showing
              </Button>
            </Box>

            {/* Submit Button */}
            <Box gridColumn="span 2">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#2b2b42", ":hover": { bgcolor: "#121217" } }}
              >
                Add Movie
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddMovies;
