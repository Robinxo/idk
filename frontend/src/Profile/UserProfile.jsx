import React, { Fragment, useEffect, useState } from "react";
import {
  //  deleteBooking,
  // getUserBooking,
  getUserDetails,
} from "../Api-helper/api-helpers.js";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [User, setUser] = useState();

  // Dummy booking data
  const dummyBookings = [
    {
      _id: "1",
      movie: { title: "Avengers: Endgame" },
      seatNumber: "A1",
      date: new Date(),
    },
    {
      _id: "2",
      movie: { title: "Spider-Man: No Way Home" },
      seatNumber: "B2",
      date: new Date(),
    },
  ];

  useEffect(() => {
    getUserDetails()
      .then((res) => setUser(res.users))
      .catch((err) => console.log(err));
  }, []);

  console.log(User);
  // console.log(Bookings);

  const handleDelete = (id) => {
    console.log("Delete booking with id:", id);
    // Implement delete logic when backend is ready
  };

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {User && (
          <Box
            flexDirection={"column"}
            width={"30%"}
            justifyContent="center"
            alignItems={"center"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              {" "}
              Name:{User.name}
            </Typography>

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              {" "}
              Email:{User.email}
            </Typography>
          </Box>
        )}

        {/* Using dummy bookings instead of actual bookings */}
        {dummyBookings && dummyBookings.length > 0 && (
          <Box width={"70%"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={3}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
              marginRight={10}
            >
              <List>
                {dummyBookings.map((booking, index) => (
                  <ListItem
                    key={booking._id}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{
                        margin: 1,
                        width: "auto",
                        textAlign: "left",
                      }}
                    >
                      Movie: {booking.movie.title}
                    </ListItemText>

                    <ListItemText
                      sx={{
                        margin: 1,
                        width: "auto",
                        textAlign: "left",
                      }}
                    >
                      Seat: {booking.seatNumber}
                    </ListItemText>

                    <ListItemText
                      sx={{
                        margin: 1,
                        width: "auto",
                        textAlign: "left",
                      }}
                    >
                      Date: {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon color="red" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
