import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Autocomplete,
  Alert,
  Snackbar,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AddCircleOutline, DeleteOutline } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { addTrip, updateTrip, getTripById } from "../utils/api";
import { indianStates } from "../utils/utils";

const TripForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isMobile = useMediaQuery("(max-width:600px)");
  const [tripData, setTripData] = useState({
    tripName: "",
    location: { state: "", country: "India", nearestCity: "" },
    difficultyLevel: "",
    duration: { days: "", nights: "" },
    price: { currency: "INR", amount: 0 },
    activities: [""],
    inclusions: [""],
    exclusions: [""],
    imageUrls: [""],
    startDates: [null],
    availability: { totalSlots: 0, availableSlots: 0 },
    coordinates: { latitude: 0, longitude: 0 },
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getTripById(id).then((data) => {
        setTripData({
          ...data,
          imageUrls: data.imageUrls?.length ? data.imageUrls : [""],
          startDates: data.startDates?.length ? data.startDates : [null],
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };
  // --- ENHANCED: Activities, Inclusions, Exclusions, Images, Start Dates ---
  // Dynamic add/remove for activities, inclusions, exclusions
  const handleArrayFieldChange = (index, key, value) => {
    const updatedArray = [...tripData[key]];
    updatedArray[index] = value;
    setTripData((prev) => ({ ...prev, [key]: updatedArray }));
  };
  const addField = (key) => {
    setTripData((prev) => ({
      ...prev,
      [key]: [...prev[key], key === "startDates" ? null : ""],
    }));
  };
  const removeField = (index, key) => {
    setTripData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };
  // Image preview and remove
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
  // Start Dates
  const handleDateChange = (date, index) => {
    const updatedDates = [...tripData.startDates];
    updatedDates[index] = date;
    setTripData((prev) => ({ ...prev, startDates: updatedDates }));
  };
  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isEdit) {
        response = await updateTrip(id, tripData);
      } else {
        response = await addTrip(tripData);
      }
      setSnackbar({
        open: true,
        message: response.message || "Success",
        severity: "success",
      });
      setTimeout(() => navigate("/trips"), 1200);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Error",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Responsive grid settings
  const gridProps = isMobile ? { xs: 12 } : { xs: 12, sm: 6 };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: isMobile ? 1 : 4, maxWidth: 900, mx: "auto" }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        {isEdit ? "Edit Trip" : "Add New Trip"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Trip Name"
            name="tripName"
            value={tripData.tripName}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={indianStates}
            value={tripData.location.state}
            onChange={(_, value) =>
              setTripData((prev) => ({
                ...prev,
                location: { ...prev.location, state: value },
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="State"
                fullWidth
                disabled={loading}
              />
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
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nearest City"
            name="nearestCity"
            value={tripData.location.nearestCity}
            onChange={handleLocationChange}
            disabled={loading}
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
            disabled={loading}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Challenging">Challenging</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Duration Days"
            name="days"
            value={tripData.duration.days}
            onChange={(e) =>
              setTripData((prev) => ({
                ...prev,
                duration: { ...prev.duration, days: e.target.value },
              }))
            }
            disabled={loading}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            label="Duration Nights"
            name="nights"
            value={tripData.duration.nights}
            onChange={(e) =>
              setTripData((prev) => ({
                ...prev,
                duration: { ...prev.duration, nights: e.target.value },
              }))
            }
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price (INR)"
            name="price.amount"
            value={tripData.price.amount}
            onChange={(e) =>
              setTripData((prev) => ({
                ...prev,
                price: { ...prev.price, amount: e.target.value },
              }))
            }
            disabled={loading}
          />
        </Grid>
        {/* Activities */}
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
            <Typography fontWeight={700} variant="subtitle1" sx={{ mb: 2 }}>
              Activities
            </Typography>
            {tripData.activities.map((activity, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  fullWidth
                  label={`Activity ${index + 1}`}
                  value={activity}
                  onChange={(e) =>
                    handleArrayFieldChange(index, "activities", e.target.value)
                  }
                  disabled={loading}
                />
                <IconButton
                  onClick={() => removeField(index, "activities")}
                  color="error"
                  disabled={loading}
                  sx={{ ml: 1 }}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={() => addField("activities")}
              startIcon={<AddCircleOutline />}
              disabled={loading}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Activity
            </Button>
          </Paper>
        </Grid>
        {/* Inclusions/Exclusions */}
        <Grid item {...gridProps}>
          <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
            <Typography fontWeight={700} variant="subtitle1" sx={{ mb: 2 }}>
              Inclusions
            </Typography>
            {tripData.inclusions.map((inclusion, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  fullWidth
                  label={`Inclusion ${index + 1}`}
                  value={inclusion}
                  onChange={(e) =>
                    handleArrayFieldChange(index, "inclusions", e.target.value)
                  }
                  disabled={loading}
                />
                <IconButton
                  onClick={() => removeField(index, "inclusions")}
                  color="error"
                  disabled={loading}
                  sx={{ ml: 1 }}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={() => addField("inclusions")}
              startIcon={<AddCircleOutline />}
              disabled={loading}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Inclusion
            </Button>
          </Paper>
        </Grid>
        <Grid item {...gridProps}>
          <Paper elevation={1} sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
            <Typography fontWeight={700} variant="subtitle1" sx={{ mb: 2 }}>
              Exclusions
            </Typography>
            {tripData.exclusions.map((exclusion, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  fullWidth
                  label={`Exclusion ${index + 1}`}
                  value={exclusion}
                  onChange={(e) =>
                    handleArrayFieldChange(index, "exclusions", e.target.value)
                  }
                  disabled={loading}
                />
                <IconButton
                  onClick={() => removeField(index, "exclusions")}
                  color="error"
                  disabled={loading}
                  sx={{ ml: 1 }}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={() => addField("exclusions")}
              startIcon={<AddCircleOutline />}
              disabled={loading}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Exclusion
            </Button>
          </Paper>
        </Grid>
        {/* Image URLs with Preview */}
        <Grid item xs={12}>
          <Typography fontWeight={700} variant="subtitle1" sx={{ mb: 2 }}>
            Images
          </Typography>
          {tripData.imageUrls.map((imageUrl, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 3, alignItems: "center", mb: 2 }}
            >
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
                disabled={loading}
                sx={{ mr: 2 }}
              />
              {validateUrl(imageUrl) && (
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 2,
                    border: "2px solid #eee",
                    bgcolor: "grey.100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "box-shadow 0.2s",
                    "&:hover": {
                      boxShadow: 5,
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      background: "#f7f7f7",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/120x120?text=No+Image";
                    }}
                  />
                </Box>
              )}
              <IconButton
                onClick={() => removeField(index, "imageUrls")}
                color="error"
                disabled={loading}
                sx={{ ml: 1 }}
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={() => addField("imageUrls")}
            startIcon={<AddCircleOutline />}
            disabled={loading}
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Add Image
          </Button>
          <Box sx={{ my: 3 }} />
        </Grid>
        {/* Start Dates */}
        <Grid item xs={12}>
          <Typography fontWeight={600}>Start Dates</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {tripData.startDates.map((startDate, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}
              >
                <DatePicker
                  label={`Start Date ${index + 1}`}
                  value={startDate ? dayjs(startDate) : null}
                  onChange={(date) => handleDateChange(date, index)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth disabled={loading} />
                  )}
                />
                <IconButton
                  onClick={() => removeField(index, "startDates")}
                  color="error"
                  disabled={loading}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            ))}
            <Button
              onClick={() => addField("startDates")}
              startIcon={<AddCircleOutline />}
              disabled={loading}
            >
              Add Start Date
            </Button>
          </LocalizationProvider>
        </Grid>
        {/* Availability */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Total Slots"
            name="availability.totalSlots"
            value={tripData.availability.totalSlots}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Available Slots"
            name="availability.availableSlots"
            value={tripData.availability.availableSlots}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        {/* Coordinates */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Latitude"
            name="coordinates.latitude"
            value={tripData.coordinates.latitude}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Longitude"
            name="coordinates.longitude"
            value={tripData.coordinates.longitude}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ minWidth: 180, minHeight: 48 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isEdit ? (
              "Update Trip"
            ) : (
              "Add Trip"
            )}
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default TripForm;
