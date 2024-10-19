// src/pages/AddTrip.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Autocomplete,
  Alert,
  Snackbar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addTrip } from "../utils/api";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];
const AddTrip = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const initialState = {
    tripName: "",
    location: { state: "", country: "India", nearestCity: "" },
    difficultyLevel: "",
    duration: { days: "", nights: "" },
    price: { currency: "INR", amount: 0 },
    activities: [""],
    itinerary: [{ day: 1, description: "" }],
    inclusions: [""],
    exclusions: [""],
    imageUrls: [""],
    startDates: [null],
    availability: { totalSlots: 0, availableSlots: 0 },
    coordinates: { latitude: 0, longitude: 0 },
  };
  const [tripData, setTripData] = useState(initialState);

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

  const handleArrayFieldChange = (index, key, value) => {
    const updatedArray = [...tripData[key]];
    updatedArray[index] = value;
    setTripData((prevData) => ({
      ...prevData,
      [key]: updatedArray,
    }));
  };

  const handleAutocompleteChange = (event, value) => {
    setTripData((prevData) => ({
      ...prevData,
      location: { ...prevData.location, state: value },
    }));
  };

  const addField = (key) => {
    setTripData((prevData) => ({
      ...prevData,
      [key]: [...prevData[key], ""],
    }));
  };

  const removeField = (index, key) => {
    const updatedArray = tripData[key].filter((_, idx) => idx !== index);
    setTripData((prevData) => ({
      ...prevData,
      [key]: updatedArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTrip(tripData);
      if (response.message === "Trip created successfully") {
        setSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
        // Reset form fields on success
        setTripData(initialState);
      } else {
        setSnackbar({
          open: true,
          message: response.message,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "An error occurred",
        severity: "error",
      });
    }
  };

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
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

        {/* Autocomplete for State */}
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={indianStates}
            value={tripData.location.state}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="State" fullWidth />
            )}
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

        {/* Dynamic fields for activities */}
        <Grid item xs={12}>
          <label>Activities</label>
          {tripData.activities.map((activity, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label={`Activity ${index + 1}`}
                value={activity}
                onChange={(e) =>
                  handleArrayFieldChange(index, "activities", e.target.value)
                }
              />
              <Button onClick={() => removeField(index, "activities")}>
                -
              </Button>
            </Box>
          ))}
          <Button onClick={() => addField("activities")}>+ Add Activity</Button>
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

        {/* Dynamic fields for image URLs */}
        <Grid item xs={12}>
          <label>Image URLs</label>
          {tripData.imageUrls.map((imageUrl, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label={`Image URL ${index + 1}`}
                value={imageUrl}
                error={!validateUrl(imageUrl) && imageUrl !== ""}
                helperText={
                  !validateUrl(imageUrl) && imageUrl !== "" ? "Invalid URL" : ""
                }
                onChange={(e) =>
                  handleArrayFieldChange(index, "imageUrls", e.target.value)
                }
              />
              <Button onClick={() => removeField(index, "imageUrls")}>-</Button>
            </Box>
          ))}
          <Button onClick={() => addField("imageUrls")}>+ Add Image URL</Button>
        </Grid>

        {/* Date Picker for start dates */}
        <Grid item xs={12}>
          <label>Start Dates</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {tripData.startDates.map((startDate, index) => (
              <Box key={index} sx={{ display: "flex", gap: 1 }}>
                <DatePicker
                  label={`Start Date ${index + 1}`}
                  value={startDate}
                  onChange={(date) =>
                    handleArrayFieldChange(index, "startDates", date)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
                <Button onClick={() => removeField(index, "startDates")}>
                  -
                </Button>
              </Box>
            ))}
            <Button onClick={() => addField("startDates")}>
              + Add Start Date
            </Button>
          </LocalizationProvider>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTrip;
