// src/pages/EditTrip.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import { getTripById, updateTrip } from "../utils/api";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import FullScreenFormSkeleton from "../components/FormLoading";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

export const TealCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)`,
  borderRadius: "8px",
  paddingLeft: "10px",
}));

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
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
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    setLoading(true);
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTripData(data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("Name is __________", name);
  //   console.log("value is __________", value);

  //   setTripData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name to handle nested fields (e.g., "duration.days")
    const nameParts = name.split(".");

    // If it's a nested field
    if (nameParts.length > 1) {
      setTripData((prevData) => {
        const updatedData = { ...prevData };
        let temp = updatedData;

        // Traverse through the object structure
        for (let i = 0; i < nameParts.length - 1; i++) {
          temp = temp[nameParts[i]];
        }

        // Update the nested field
        temp[nameParts[nameParts.length - 1]] = value;

        return updatedData;
      });
    } else {
      // Handle simple fields
      setTripData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    if (
      typeof updatedArray[index] === "object" &&
      updatedArray[index] !== null
    ) {
      updatedArray[index] = { ...updatedArray[index], [name]: value };
    } else {
      updatedArray[index] = value;
    }
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

  const handleToast = (message, severity) => {
    setToast({ open: true, message, severity });
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true before starting the API call

    try {
      const response = await updateTrip(id, tripData);
      console.log("Response:", response);

      // Show a success toast if the API call is successful
      handleToast("Trip updated successfully!", "success");
    } catch (error) {
      console.error("Error:", error.message);

      // Show an error toast if the API call fails
      handleToast(`Error: ${error.message}`, "error");
    } finally {
      setLoading(false); // Set loading to false after the request finishes (success or failure)
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
  };

  return (
    <>
      {loading ? (
        <FullScreenFormSkeleton />
      ) : (
        <>
          {" "}
          <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4 }}>
            <Button
              variant="contained"
              onClick={handleGoBack}
              startIcon={<CloseIcon />}
              sx={{ marginBottom: 5, bgcolor: theme.palette.secondary.main }}
            >
              Cancel Editing
            </Button>
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
                  // name="days"
                  name="duration.days"
                  value={tripData.duration.days}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  fullWidth
                  label="Duration (Nights)"
                  name="duration.nights"
                  value={tripData.duration.nights}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={8}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price.amount"
                  value={tripData.price.amount}
                  onChange={handleChange}
                />
              </Grid>

              {/* Activities */}
              <Grid item size={12}>
                <TealCard>
                  {tripData &&
                    tripData.activities &&
                    tripData.activities.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Activities
                      </Typography>
                    )}
                  {tripData.activities.map((activity, index) => (
                    <Grid container spacing={5} key={index}>
                      <Grid item xs={10} mb={2}>
                        <TextField
                          fullWidth
                          label={`Activity ${index + 1}`}
                          name="activity"
                          value={activity}
                          onChange={(e) =>
                            handleArrayChange(e, index, "activities")
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "activities")}
                        >
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
                  {tripData &&
                    tripData.imageUrls &&
                    tripData.imageUrls.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Image URLs
                      </Typography>
                    )}
                  {tripData.imageUrls.map((url, index) => (
                    <Grid container spacing={5} key={index}>
                      <Grid item xs={10} mb={2}>
                        <TextField
                          fullWidth
                          label={`Image URL ${index + 1}`}
                          name="imageUrls"
                          value={url}
                          onChange={(e) =>
                            handleArrayChange(e, index, "imageUrls")
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "imageUrls")}
                        >
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
                  {tripData &&
                    tripData.itinerary &&
                    tripData.itinerary.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Itineraries
                      </Typography>
                    )}
                  {tripData.itinerary.map((day, index) => (
                    <Grid container spacing={5} key={index}>
                      <Grid item xs={2} mb={2}>
                        <TextField
                          fullWidth
                          label={`Day ${index + 1}`}
                          name="day"
                          value={day.day}
                          onChange={(e) =>
                            handleArrayChange(e, index, "itinerary")
                          }
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          label={`Description`}
                          name="description"
                          value={day.description}
                          onChange={(e) =>
                            handleArrayChange(e, index, "itinerary")
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "itinerary")}
                        >
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
                  {tripData &&
                    tripData.inclusions &&
                    tripData.inclusions.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Inclusions
                      </Typography>
                    )}
                  {tripData.inclusions.map((inclusion, index) => (
                    <Grid container spacing={5} key={index}>
                      <Grid item xs={10} mb={2}>
                        <TextField
                          fullWidth
                          label={`Inclusion ${index + 1}`}
                          name="inclusion"
                          value={inclusion}
                          onChange={(e) =>
                            handleArrayChange(e, index, "inclusions")
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "inclusions")}
                        >
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
                  {tripData &&
                    tripData.exclusions &&
                    tripData.exclusions.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Exclusions
                      </Typography>
                    )}
                  {tripData.exclusions.map((exclusion, index) => (
                    <Grid container spacing={5} key={index}>
                      <Grid item xs={10} mb={2}>
                        <TextField
                          fullWidth
                          label={`Exclusion ${index + 1}`}
                          name="exclusion"
                          value={exclusion}
                          onChange={(e) =>
                            handleArrayChange(e, index, "exclusions")
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "exclusions")}
                        >
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
                  {tripData &&
                    tripData.startDates &&
                    tripData.startDates.length && (
                      <Typography sx={{ textAlign: "center" }}>
                        Start Dates
                      </Typography>
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
                          onChange={(e) =>
                            handleArrayChange(e, index, "startDates")
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          onClick={() => removeField(index, "startDates")}
                        >
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
                  name="availability.totalSlots"
                  value={tripData.availability.totalSlots}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item size={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Slots"
                  name="availability.availableSlots"
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
          <Snackbar
            open={toast.open}
            autoHideDuration={4000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleToastClose}
              severity={toast.severity}
              sx={{ width: "100%" }}
            >
              {toast.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default EditTrip;
