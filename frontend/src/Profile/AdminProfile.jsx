import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../Api-helper/api-helpers.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { List, ListItem, ListItemText, Typography } from "@mui/material";

const AdminProfile = () => {
  const [Admin, setAdmin] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="flex-start"
      padding={4}
      gap={4}
    >
      <Fragment>
        {Admin && (
          <Box
            flexDirection="column"
            alignItems="center"
            width={{ xs: "100%", md: "30%" }}
            padding={4}
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            borderRadius={8}
            bgcolor="white"
          >
            <AccountCircleIcon
              sx={{
                fontSize: "8rem",
                textAlign: "center",
                mb: 2,
                color: "#673ab7",
              }}
            />

            <Typography
              mt={2}
              padding={2}
              width="100%"
              textAlign="center"
              border="1px solid #e0e0e0"
              borderRadius={8}
              bgcolor="#f5f5f5"
              color="#333"
              fontWeight="600"
            >
              Email: {Admin.email}
            </Typography>
          </Box>
        )}

        {Admin && Admin.addedMovies.length > 0 && (
          <Box
            width={{ xs: "100%", md: "70%" }}
            display="flex"
            flexDirection="column"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            borderRadius={8}
            bgcolor="white"
            padding={4}
          >
            <Typography
              variant="h4"
              fontFamily="Roboto, sans-serif"
              textAlign="center"
              padding={3}
              color="#212121"
              fontWeight="700"
            >
              Added Movies
            </Typography>
            <Box
              margin="auto"
              display="flex"
              flexDirection="column"
              width={{ xs: "90%", md: "80%" }}
            >
              <List>
                {Admin.addedMovies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#f0f0f0", // Light gray background
                      color: "#333", // Darker text color
                      textAlign: "left",
                      margin: 1,
                      borderRadius: 4,
                      padding: 2,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      display: "flex", // Enable flexbox for image and text arrangement
                      alignItems: "center", // Align items vertically in the center
                    }}
                  >
                    <Box
                      component="img"
                      src={movie.posterUrl} // Assuming movie object has posterUrl
                      alt={movie.title}
                      sx={{
                        height: 80, // Adjust image height as needed
                        width: 60, // Adjust image width as needed
                        marginRight: 2, // Spacing between image and text
                        borderRadius: 2,
                      }}
                    />
                    <ListItemText
                      primary={`Movie: ${movie.title}`}
                      primaryTypographyProps={{ fontWeight: "600" }}
                    />
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

export default AdminProfile;
