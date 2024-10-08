// src/pages/AddTrip.js
import React, { useState } from "react";
import { TextField, Button, Box, Grid, MenuItem } from "@mui/material";
import { addTrip } from "../utils/api"; // API function for adding trips

const AddTrip = () => {
  const [tripData, setTripData] = useState({
    tripName: "",
    location: { state: "", country: "", nearestCity: "" },
    difficultyLevel: "",
    duration: { days: "", nights: "" },
    price: { currency: "INR", amount: 0 },
    activities: [],
    itinerary: [{ day: 1, description: "" }],
    inclusions: [],
    exclusions: [],
    imageUrls: [],
    startDates: [],
    availability: { totalSlots: 0, availableSlots: 0 },
    coordinates: { latitude: 0, longitude: 0 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      location: { ...prevData.location, [name]: value },
    }));
  };

  const handleArrayChange = (e, key) => {
    const { value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [key]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTrip(tripData);
    // Redirect back to the trips table or show success message
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Trip Name"
            name="tripName"
            value={tripData.tripName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={tripData.location.state}
            onChange={handleLocationChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={tripData.location.country}
            onChange={handleLocationChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nearest City"
            name="nearestCity"
            value={tripData.location.nearestCity}
            onChange={handleLocationChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Difficulty Level"
            name="difficultyLevel"
            value={tripData.difficultyLevel}
            onChange={handleChange}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Challenging">Challenging</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Duration Days"
            name="days"
            value={tripData.duration.days}
            onChange={(e) =>
              setTripData({
                ...tripData,
                duration: { ...tripData.duration, days: e.target.value },
              })
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Duration Nights"
            name="nights"
            value={tripData.duration.nights}
            onChange={(e) =>
              setTripData({
                ...tripData,
                duration: { ...tripData.duration, nights: e.target.value },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price (INR)"
            name="price.amount"
            value={tripData.price.amount}
            onChange={(e) =>
              setTripData({
                ...tripData,
                price: { ...tripData.price, amount: e.target.value },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Activities (comma separated)"
            name="activities"
            value={tripData.activities.join(", ")}
            onChange={(e) => handleArrayChange(e, "activities")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Inclusions (comma separated)"
            name="inclusions"
            value={tripData.inclusions.join(", ")}
            onChange={(e) => handleArrayChange(e, "inclusions")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Exclusions (comma separated)"
            name="exclusions"
            value={tripData.exclusions.join(", ")}
            onChange={(e) => handleArrayChange(e, "exclusions")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Image URLs (comma separated)"
            name="imageUrls"
            value={tripData.imageUrls.join(", ")}
            onChange={(e) => handleArrayChange(e, "imageUrls")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Start Dates (comma separated)"
            name="startDates"
            value={tripData.startDates.join(", ")}
            onChange={(e) => handleArrayChange(e, "startDates")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Total Slots"
            name="availability.totalSlots"
            value={tripData.availability.totalSlots}
            onChange={(e) =>
              setTripData({
                ...tripData,
                availability: {
                  ...tripData.availability,
                  totalSlots: e.target.value,
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Available Slots"
            name="availability.availableSlots"
            value={tripData.availability.availableSlots}
            onChange={(e) =>
              setTripData({
                ...tripData,
                availability: {
                  ...tripData.availability,
                  availableSlots: e.target.value,
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Latitude"
            name="coordinates.latitude"
            value={tripData.coordinates.latitude}
            onChange={(e) =>
              setTripData({
                ...tripData,
                coordinates: {
                  ...tripData.coordinates,
                  latitude: e.target.value,
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Longitude"
            name="coordinates.longitude"
            value={tripData.coordinates.longitude}
            onChange={(e) =>
              setTripData({
                ...tripData,
                coordinates: {
                  ...tripData.coordinates,
                  longitude: e.target.value,
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Trip
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTrip;
