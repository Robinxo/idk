import { FormatBold } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id, ticketPrice }) => {
  return (
    <Card
      sx={{
        width: 250,
        margin: 2,
        height: 650,
        borderRadius: 5,
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
      }}
    >
      <img height={"50%"} width="100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
        <br></br>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: "bold", topmargin: 2 }}
        >
          {ticketPrice}₹
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          sx={{ margin: "auto" }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
