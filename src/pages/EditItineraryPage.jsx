import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, Typography, Button, TextField, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getItineraryById, editItinerary } from "../utils/api";
import ImageUploadSection from "../components/AddItineraryComponents/ImageUploadSection";

const EditItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itineraryId = location.state?.itineraryId;
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const data = await getItineraryById(itineraryId);
        setTripData(data);
      } catch (err) {
        setError("Failed to fetch itinerary");
      } finally {
        setLoading(false);
      }
    };
    if (itineraryId) fetchItinerary();
  }, [itineraryId]);

  const handleGoBack = () => navigate(-1);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTripData({ ...tripData, [name]: value });
  };

  // You can copy the rest of the handlers from AddItineraryPage (overview, dailySchedule, etc.)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editItinerary(itineraryId, tripData);
      navigate(-1);
    } catch (err) {
      setError("Failed to update itinerary");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!tripData) return null;

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Itinerary
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoBack}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
      <form onSubmit={handleSubmit}>
        {/* Copy the form fields from AddItineraryPage, using tripData and setTripData */}
        {/* Example: */}
        <TextField
          label="Trip ID"
          name="tripId"
          value={tripData.tripId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        {/* ...rest of the fields... */}
        <ImageUploadSection tripData={tripData} setTripData={setTripData} />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </Paper>
  );
};

export default EditItineraryPage;
