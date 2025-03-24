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
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        if (isMounted) setMovies(data.movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const validTabs = ["/movies", "/auth", "/admin", "/user"];
    if (isAdminLoggedIn) validTabs.push("/add");

    setTimeout(() => {
      setValue(
        validTabs.includes(location.pathname) ? location.pathname : "/movies",
      );
    }, 100); // Small delay to ensure the Tabs are fully rendered
  }, [location.pathname, isAdminLoggedIn, isUserLoggedIn]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (isAdmin) => () => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  if (value === null) return null; // Prevents rendering Tabs before state is set

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton component={Link} to="/">
            <TheaterComedyIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            freeSolo
            options={movies.map((option) => option.title)}
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
        <Box display="flex">
          <Tabs
            value={value}
            indicatorColor="secondary"
            textColor="inherit"
            onChange={handleChange}
          >
            <Tab component={Link} to="/movies" label="Movies" value="/movies" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab component={Link} to="/auth" label="Auth" value="/auth" />
                <Tab
                  component={Link}
                  to="/admin"
                  label="Admin"
                  value="/admin"
                />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab
                  component={Link}
                  to="/user"
                  label="Profile"
                  value="/user"
                />
                <Tab
                  onClick={handleLogout(false)}
                  component={Link}
                  to="/"
                  label="Logout"
                  value="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab
                  component={Link}
                  to="/add"
                  label="Add Movies"
                  value="/add"
                />
                <Tab
                  component={Link}
                  to="/admin"
                  label="Profile"
                  value="/admin"
                />
                <Tab
                  onClick={handleLogout(true)}
                  component={Link}
                  to="/"
                  label="Logout"
                  value="/"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
