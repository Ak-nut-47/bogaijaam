// TripCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

const TripCard = ({ trip }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/itinerary/${trip._id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: `0 4px 8px ${theme.palette.primary.light}`,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 6px 12px ${theme.palette.primary.main}`,
          cursor: "pointer",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={trip.imageUrls[0]}
        alt={trip.tripName}
        sx={{ objectFit: "cover" }}
        loading="lazy"
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {trip.tripName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {trip.location.state}, {trip.location.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nearest city: {trip.location.nearestCity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {trip.duration.days} days, {trip.duration.nights} nights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Difficulty: {trip.difficultyLevel}
        </Typography>
        <Box sx={{ mt: "auto", pt: 2 }}>
          <Typography variant="h6" color="secondary.main">
            Price: {trip.price.currency} {trip.price.amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
