import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // to send API requests

const TripCard = ({ trip, fetchTrips }) => {
  const navigate = useNavigate();

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/.netlify/functions/deleteTrip/${trip._id}`
      );
      if (response.status === 200) {
        // Refresh trip list after delete
        fetchTrips();
      } else {
        console.error("Error deleting trip:", response);
      }
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  // Handle edit action by navigating to an edit page
  const handleEdit = () => {
    navigate(`/updateTrip/${trip._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto", mb: 4 }}>
      <CardMedia
        component="img"
        height="140"
        image={trip.imageUrls[0]} // Display first image
        alt={trip.tripName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trip.tripName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Location: {trip.location.state}, {trip.location.country} (Nearest
          city: {trip.location.nearestCity})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duration: {trip.duration.days} days, {trip.duration.nights} nights
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Difficulty: {trip.difficultyLevel}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body1" color="text.primary">
            Price: {trip.price.currency} {trip.price.amount}
          </Typography>
        </Box>

        {/* Buttons for Edit and Delete */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
