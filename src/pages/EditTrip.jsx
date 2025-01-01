// src/pages/EditTrip.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { getTripById, updateTrip } from "../utils/api"; // API functions to get and update trip
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

const TealCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)`,
  borderRadius: "8px", // Add this line for rounded borders
  paddingLeft: "10px",
}));

const EditTrip = () => {
  const { id } = useParams(); // Get trip id from URL
  const [tripData, setTripData] = useState({
    tripName: "",
    location: { state: "", country: "", nearestCity: "" },
    difficultyLevel: "",
    duration: { days: "", nights: "" },
    price: { currency: "INR", amount: 0 },
    activities: [],
    imageUrls: [],
    itinerary: [{ day: 1, description: "" }],
    inclusions: [],
    exclusions: [],
    startDates: [],
    availability: { totalSlots: 0, availableSlots: 0 },
  });

  useEffect(() => {
    // Fetch the trip data by ID
    const fetchTrip = async () => {
      const data = await getTripById(id);
      console.log("Data is _____", data);
      setTripData(data);
    };
    fetchTrip();
  }, [id]);

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

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const updatedArray = [...tripData[arrayName]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setTripData({ ...tripData, [arrayName]: updatedArray });
  };

  const addField = (arrayName, newItem) => {
    setTripData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], newItem],
    }));
  };

  const removeField = (index, arrayName) => {
    const updatedArray = [...tripData[arrayName]];
    updatedArray.splice(index, 1);
    setTripData({ ...tripData, [arrayName]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTrip(id, tripData);
    // Redirect back to homepage or show success message
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Trip Name"
            name="tripName"
            value={tripData.tripName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={tripData.location.state}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={tripData.location.country}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Nearest City"
            name="nearestCity"
            value={tripData.location.nearestCity}
            onChange={handleLocationChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Difficulty Level"
            name="difficultyLevel"
            value={tripData.difficultyLevel}
            onChange={handleChange}
            select
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Challenging">Challenging</MenuItem>
          </TextField>
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Duration (Days)"
            name="days"
            value={tripData.duration.days}
            onChange={handleChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Duration (Nights)"
            name="nights"
            value={tripData.duration.nights}
            onChange={handleChange}
          />
        </Grid>
        <Grid item size={8}>
          <TextField
            fullWidth
            label="Price"
            name="amount"
            value={tripData.price.amount}
            onChange={handleChange}
          />
        </Grid>

        {/* Activities */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.activities && tripData.activities.length && (
              <Typography sx={{ textAlign: "center" }}>Activities</Typography>
            )}
            {tripData.activities.map((activity, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={10} mb={2}>
                  <TextField
                    fullWidth
                    label={`Activity ${index + 1}`}
                    name="activity"
                    value={activity}
                    onChange={(e) => handleArrayChange(e, index, "activities")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "activities")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => addField("activities", "")}
              startIcon={<AddCircleOutline />}
            >
              Add Activity
            </Button>
          </TealCard>
        </Grid>

        {/* Image URLs */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.imageUrls && tripData.imageUrls.length && (
              <Typography sx={{ textAlign: "center" }}>Image URLs</Typography>
            )}
            {tripData.imageUrls.map((url, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={10} mb={2}>
                  <TextField
                    fullWidth
                    label={`Image URL ${index + 1}`}
                    name="imageUrls"
                    value={url}
                    onChange={(e) => handleArrayChange(e, index, "imageUrls")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "imageUrls")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => addField("imageUrls", "")}
              startIcon={<AddCircleOutline />}
            >
              Add Image URL
            </Button>
          </TealCard>
        </Grid>

        {/* Itinerary */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.itinerary && tripData.itinerary.length && (
              <Typography sx={{ textAlign: "center" }}>Itineraries</Typography>
            )}
            {tripData.itinerary.map((day, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={2} mb={2}>
                  <TextField
                    fullWidth
                    label={`Day ${index + 1}`}
                    name="day"
                    value={day.day}
                    onChange={(e) => handleArrayChange(e, index, "itinerary")}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label={`Description`}
                    name="description"
                    value={day.description}
                    onChange={(e) => handleArrayChange(e, index, "itinerary")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "itinerary")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() =>
                addField("itinerary", { day: "", description: "" })
              }
              startIcon={<AddCircleOutline />}
            >
              Add Itinerary Day
            </Button>
          </TealCard>
        </Grid>

        {/* Inclusions */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.inclusions && tripData.inclusions.length && (
              <Typography sx={{ textAlign: "center" }}>Inclusions</Typography>
            )}
            {tripData.inclusions.map((inclusion, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={10} mb={2}>
                  <TextField
                    fullWidth
                    label={`Inclusion ${index + 1}`}
                    name="inclusion"
                    value={inclusion}
                    onChange={(e) => handleArrayChange(e, index, "inclusions")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "inclusions")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => addField("inclusions", "")}
              startIcon={<AddCircleOutline />}
            >
              Add Inclusion
            </Button>
          </TealCard>
        </Grid>

        {/* Exclusions */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.exclusions && tripData.exclusions.length && (
              <Typography sx={{ textAlign: "center" }}>Exclusions</Typography>
            )}
            {tripData.exclusions.map((exclusion, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={10} mb={2}>
                  <TextField
                    fullWidth
                    label={`Exclusion ${index + 1}`}
                    name="exclusion"
                    value={exclusion}
                    onChange={(e) => handleArrayChange(e, index, "exclusions")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "exclusions")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => addField("exclusions", "")}
              startIcon={<AddCircleOutline />}
            >
              Add Exclusion
            </Button>
          </TealCard>
        </Grid>

        {/* Start Dates */}
        <Grid item size={12}>
          <TealCard>
            {tripData && tripData.startDates && tripData.startDates.length && (
              <Typography sx={{ textAlign: "center" }}>Start Dates</Typography>
            )}
            {tripData.startDates.map((startDate, index) => (
              <Grid container spacing={5} key={index}>
                <Grid item xs={10} mb={2}>
                  <TextField
                    fullWidth
                    label={`Start Date ${index + 1}`}
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => handleArrayChange(e, index, "startDates")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeField(index, "startDates")}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => addField("startDates", "")}
              startIcon={<AddCircleOutline />}
            >
              Add Start Date
            </Button>
          </TealCard>
        </Grid>

        {/* Availability */}
        <Grid item size={12} sm={6}>
          <TextField
            fullWidth
            label="Total Slots"
            name="totalSlots"
            value={tripData.availability.totalSlots}
            onChange={handleChange}
          />
        </Grid>
        <Grid item size={12} sm={6}>
          <TextField
            fullWidth
            label="Available Slots"
            name="availableSlots"
            value={tripData.availability.availableSlots}
            onChange={handleChange}
          />
        </Grid>

        <Grid item size={12}>
          <Button variant="contained" color="primary" type="submit">
            Update Trip
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditTrip;
