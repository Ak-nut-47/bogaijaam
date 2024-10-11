import React from "react";
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

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
      }}
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
