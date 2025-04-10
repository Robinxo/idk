import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMoviedetails, newBooking } from "../../Api-helper/api-helpers.js";
import {
  Box,
  Button,
  Dialog,
  FormLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const labelStyle = { mt: 4, mb: 2 };

const Booking = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const { id: Id } = useParams();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [movie, setMovie] = useState();
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);

  useEffect(() => {
    getMoviedetails(Id).then((res) => {
      setMovie(res.movie);
      setAvailableDates(res.movie.showings.map((show) => show.date));
    });
  }, [Id]);

  useEffect(() => {
    if (movie && inputs.date) {
      const selectedShow = movie.showings.find(
        (show) =>
          new Date(show.date).toISOString().split("T")[0] === inputs.date,
      );
      if (selectedShow) {
        setAvailableSeats(
          selectedShow.availableSeats.filter((seat) => !seat.isBooked),
        );
      }
    }
  }, [inputs.date, movie]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      movie: movie._id, // Movie ID
      user: localStorage.getItem("userId"), // User ID from localStorage
      showingDate: inputs.date, // Selected date
      seats: [inputs.seatNumber], // Convert seatNumber to an array
      ticketPrice: movie.ticketPrice, // Ticket price from movie details
    };

    console.log("Booking data:", bookingData); // Debugging log

    newBooking(bookingData)
      .then((res) => {
        console.log("Booking successful:", res);
        alert("Booking created successfully!");
      })
      .catch((err) => {
        console.error("Error creating booking:", err.response?.data || err.message);
        alert("Failed to create booking. Please try again.");
      });
  };

  return (
    <Box>
      {movie && isUserLoggedIn && (
        <>
          <Typography variant="h4" align="center" margin={2}>
            Book Tickets for {movie.title}
          </Typography>
          <Box display={"flex"} margin={6}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"30vw"}
              justifyContent={"center"}
            >
              <Box width={"40vw"} height={"52vh"} margin={1.5}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  width={"50%"}
                  height={"50%"}
                />
              </Box>
              <Typography
                variant="h6"
                display={"flex"}
                fontStyle={"italic"}
                margin={1.5}
                padding={1}
                borderLeft={1}
              >
                {movie.description}
              </Typography>
              <Box display={"flex"} flexWrap={"wrap"} margin={1}>
                <Typography fontStyle={"italic"}>Cast:&nbsp; </Typography>
                {movie.actors.map((item, idx) => (
                  <Typography key={idx} fontStyle={"italic"}>
                    {item} &nbsp;
                  </Typography>
                ))}
              </Box>
              <Typography margin={1} display={"flex"} fontStyle={"italic"}>
                Release Date: {new Date(movie.releaseDate).toDateString()}
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                margin={5}
                width={"35vw"}
                padding={3}
                borderRadius={5}
                boxShadow={"10px 10px 10px #ccc"}
              >
                <Typography variant="h5" align="center" mb={1}>
                  Booking Details
                </Typography>
                <FormLabel sx={labelStyle}>Pick a Date</FormLabel>
                <Select
                  value={inputs.date}
                  onChange={handleChange}
                  name="date"
                  variant="standard"
                >
                  {availableDates.map((date, idx) => (
                    <MenuItem
                      key={idx}
                      value={new Date(date).toISOString().split("T")[0]}
                    >
                      {new Date(date).toLocaleString()}
                    </MenuItem>
                  ))}
                </Select>
                <FormLabel sx={labelStyle}>Seat Number</FormLabel>
                <Select
                  value={inputs.seatNumber}
                  onChange={handleChange}
                  name="seatNumber"
                  variant="standard"
                >
                  {availableSeats.map((seat) => (
                    <MenuItem key={seat._id} value={seat.seatNumber}>
                      {seat.seatNumber}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  sx={{ borderRadius: 5, margin: 6 }}
                  variant="outlined"
                  color="success"
                  type="submit"
                  disabled={!inputs.date || !inputs.seatNumber}
                >
                  Confirm
                </Button>
              </Box>
            </form>
          </Box>
        </>
      )}

      {!isUserLoggedIn && (
        <Dialog open={true} PaperProps={{ style: { borderRadius: 10 } }}>
          <Box margin={4}>
            <Typography variant="h5" padding={1}>
              User Not Logged In
            </Typography>
            <Typography variant="h6" padding={1}>
              You need to login to proceed further.
            </Typography>
            <Box align="center" mt={3}>
              <Button
                onClick={() => navigate("/auth")}
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: 2, margin: 1 }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outlined"
                color="secondary"
                sx={{ borderRadius: 2, margin: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default Booking;
