import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Autocomplete,
} from "@mui/material";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { getAllMovies } from "../Api-helper/api-helpers.js";

const GuestHeader = ({ value, onChange }) => (
  <Tabs
    value={value}
    indicatorColor="secondary"
    textColor="inherit"
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" />
    <Tab component={Link} to="/auth" label="Login/signup" value="/auth" />
  </Tabs>
);

const UserHeader = ({ value, onChange, handleLogout }) => (
  <Tabs
    value={value}
    indicatorColor="secondary"
    textColor="inherit"
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" />
    <Tab component={Link} to="/user" label="Profile" value="/user" />
    <Tab
      component={Link}
      to="/"
      label="Logout"
      value="/"
      onClick={handleLogout}
    />
  </Tabs>
);

const AdminHeader = ({ value, onChange, handleLogout }) => (
  <Tabs
    value={value}
    indicatorColor="secondary"
    textColor="inherit"
    onChange={onChange}
  >
    <Tab component={Link} to="/movies" label="Movies" value="/movies" />
    <Tab component={Link} to="/add" label="Add Movies" value="/add" />
    <Tab component={Link} to="/admin" label="Profile" value="/admin" />
    <Tab
      component={Link}
      to="/"
      label="Logout"
      value="/"
      onClick={handleLogout}
    />
  </Tabs>
);

const Header = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("/movies");

  useEffect(() => {
    setTimeout(() => {
      setValue(location.pathname);
    }, 100);
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;
    getAllMovies()
      .then((data) => {
        if (isMounted) setMovies(data.movies);
      })
      .catch((err) => console.error("Error fetching movies:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (isAdmin) => () => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

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
          {isAdminLoggedIn ? (
            <AdminHeader
              value={value}
              onChange={handleChange}
              handleLogout={handleLogout(true)}
            />
          ) : isUserLoggedIn ? (
            <UserHeader
              value={value}
              onChange={handleChange}
              handleLogout={handleLogout(false)}
            />
          ) : (
            <GuestHeader value={value} onChange={handleChange} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
