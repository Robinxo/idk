import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { getAllMovies } from "../Api-helper/api-helpers.js";
import { Link, useLocation } from "react-router"; // Import useLocation
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  console.log("isAdminLoggedIn:", isAdminLoggedIn);
  console.log("isUserLoggedIn:", isUserLoggedIn);

  const location = useLocation(); // Get current location
  const [value, setValue] = useState(location.pathname); // Initialize value with current path

  useEffect(() => {
    console.log("Location changed:", location.pathname);
    setValue(location.pathname); // Update value when location changes
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    console.log("Tab changed:", newValue);
    setValue(newValue);
  };

  const [movies, setmovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setmovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <TheaterComedyIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            onChange={handleChange}
          >
            <Tab
              LinkComponent={Link}
              to="/movies"
              label="Movies"
              value="/movies"
            />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab
                  LinkComponent={Link}
                  to="/auth"
                  label="Auth"
                  value="/auth"
                />
                <Tab
                  LinkComponent={Link}
                  to="/admin"
                  label="Admin"
                  value="/admin"
                />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab
                  LinkComponent={Link}
                  to="/user"
                  label="Profile"
                  value="/user"
                />
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                  value="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab
                  LinkComponent={Link}
                  to="/add"
                  label="Add Movies"
                  value="/add"
                />
                <Tab
                  LinkComponent={Link}
                  to="/admin"
                  label="Profile"
                  value="/admin"
                />
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                  value="/"
                />
                {console.log("Admin tabs rendered")}
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
