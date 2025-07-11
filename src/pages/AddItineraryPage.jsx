import React, { useLayoutEffect, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@emotion/react";
import ImageUploadSection from "./AddItineraryComponents/ImageUploadSection";
import { getItineraryById, editItinerary } from "../utils/api";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "lucide-react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

export const TealCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)`,
  borderRadius: "8px",
  paddingLeft: "10px",
}));

const AddItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const tripId = location.state?.tripId;
  const itineraryId = location.state?.itineraryId;
  const [loading, setLoading] = useState(!!itineraryId);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [tripData, setTripData] = useState({
    tripId: tripId,
    lastUpdated: "",
    overview: {
      title: "",
      description: "",
      highlights: [""],
      duration: { days: 0, nights: 0 },
    },
    dailySchedule: [],
    transportation: [],
    inclusions: [""],
    exclusions: [""],
    optionalActivities: [],
    notes: [""],
    meetingPoint: {
      location: "",
      coordinates: { latitude: 0, longitude: 0 },
      instructions: "",
    },
    endPoint: {
      location: "",
      coordinates: { latitude: 0, longitude: 0 },
      instructions: "",
    },
    guideInfo: {
      name: "",
      experience: "",
      languages: [""],
      contactInfo: "",
    },
    equipmentList: [],
    weatherInfo: {
      averageTemperature: { celsius: 0, fahrenheit: 0 },
      seasonalNotes: "",
    },
    healthAndSafety: {
      vaccinations: [""],
      medicalFacilities: [""],
      emergencyContacts: [""],
      insuranceRequirements: "",
    },
    customizations: {
      dietaryOptions: [""],
      accessibilityOptions: [""],
    },
    cancellationPolicy: {
      description: "",
      refundPolicy: [],
    },
    tags: [""],
    imageUrls: [],
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  // Fetch itinerary if editing
  useEffect(() => {
    if (!itineraryId) return;
    console.log("useffetc called ==========>>>>>>>", itineraryId); // Debugging
    const fetchItinerary = async () => {
      if (itineraryId) {
        setLoading(true);
        try {
          const data = await getItineraryById(itineraryId);
          console.log("Fetched itinerary for editing:", data); // Debugging
          // Handle not found or error message
          if (!data || data.message?.includes("not found")) {
            setError("No itinerary found for this trip. Please add one.");
            setTripData({ ...tripData }); // Optionally reset or keep blank
          } else {
            // Unwrap data if backend returns {itinerary: {...}} or [{...}]
            let itinerary = data;
            if (data && Array.isArray(data) && data.length > 0) {
              itinerary = data[0];
            } else if (data && data.itinerary) {
              itinerary = data.itinerary;
            }
            if (itinerary) setTripData(itinerary);
          }
        } catch (err) {
          setError("Failed to fetch itinerary");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchItinerary();
    // eslint-disable-next-line
  }, [itineraryId]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleOverviewChange = (event) => {
    const { name, value } = event.target;
    setTripData((prev) => ({
      ...prev,
      overview: { ...prev.overview, [name]: value },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (itineraryId) {
        // Always use tripId from tripData (fetched itinerary), not from navigation state
        const { _id, ...editPayload } = tripData; // remove _id if present
        console.log("[AddItineraryPage] Submitting editItinerary with:", {
          itineraryId,
          editPayload,
        });
        const editResponse = await editItinerary(itineraryId, editPayload);
        console.log("[AddItineraryPage] editItinerary response:", editResponse);
        setSnackbar({
          open: true,
          message: "Itinerary updated successfully!",
          severity: "success",
        });
      } else {
        const response = await fetch("/.netlify/functions/addItinerary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripData),
        });
        const result = await response.json();
        if (response.ok) {
          setSnackbar({
            open: true,
            message: "Trip submitted successfully!",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Error: " + (result.error || "Failed to submit trip."),
            severity: "error",
          });
        }
      }
      setTimeout(() => navigate(-1), 1200); // Give user time to see the toast
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to save itinerary",
        severity: "error",
      });
    }
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const arrayName = name.split(".").pop(); // For example: 'highlights'

    setTripData((prevData) => ({
      ...prevData,
      [arrayName]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleAddDay = () => {
    setTripData((prevData) => ({
      ...prevData,
      dailySchedule: [
        ...prevData.dailySchedule,
        {
          day: prevData.dailySchedule.length + 1,
          date: "",
          title: "",
          description: "",
          activities: [],
          meals: {
            breakfast: "",
            lunch: "",
            dinner: "",
          },
          accommodation: {
            name: "",
            type: "",
            address: "",
            contactInfo: "",
          },
        },
      ],
    }));
  };

  const handleAddActivity = (dayIndex) => {
    setTripData((prevData) => {
      const updatedSchedule = [...prevData.dailySchedule];
      updatedSchedule[dayIndex].activities.push({
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        location: { name: "", coordinates: { latitude: 0, longitude: 0 } },
      });
      return {
        ...prevData,
        dailySchedule: updatedSchedule,
      };
    });
  };

  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const updatedSchedule = [...tripData.dailySchedule];
    updatedSchedule[dayIndex].activities.splice(activityIndex, 1);
    setTripData((prevData) => ({
      ...prevData,
      dailySchedule: updatedSchedule,
    }));
  };

  const handleRemoveDay = (index) => {
    const updatedSchedule = [...tripData.dailySchedule];
    updatedSchedule.splice(index, 1);
    setTripData((prevData) => ({
      ...prevData,
      dailySchedule: updatedSchedule,
    }));
  };

  const handleChangeDailySchedule = (dayIndex, event) => {
    const { name, value } = event.target;

    // Create a copy of the current schedule
    const updatedSchedule = [...tripData.dailySchedule];

    // Check if this is an activity field by looking for "activities" in the name
    if (name.includes("activities")) {
      // Extract activity index and field name using regex
      const matches = name.match(/activities\[(\d+)\]\.(\w+)/);
      if (matches) {
        const activityIndex = parseInt(matches[1]);
        const fieldName = matches[2]; // will be 'name', 'description', 'startTime', or 'endTime'

        // Update the specific activity field
        updatedSchedule[dayIndex] = {
          ...updatedSchedule[dayIndex],
          activities: updatedSchedule[dayIndex].activities.map(
            (activity, index) => {
              if (index === activityIndex) {
                return {
                  ...activity,
                  [fieldName]: value,
                };
              }
              return activity;
            }
          ),
        };
      }
    } else {
      // Handle non-activity fields (title, date, description) as before
      const cleanName = name.replace(/\[(\d+)\]/g, ".$1");
      const nameParts = cleanName.split(".");

      updatedSchedule[dayIndex] = {
        ...updatedSchedule[dayIndex],
        [nameParts[2]]: value,
      };
    }

    setTripData((prevData) => ({
      ...prevData,
      dailySchedule: updatedSchedule,
    }));
  };
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Itinerary Details
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoBack}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
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
      <form onSubmit={handleSubmit}>
        {/* Trip ID */}
        <TextField
          label="Trip ID"
          name="tripId"
          value={tripData.tripId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />

        {/* Last Updated */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Last Updated"
            value={tripData.lastUpdated ? dayjs(tripData.lastUpdated) : null}
            onChange={(newValue) =>
              setTripData((prev) => ({
                ...prev,
                lastUpdated: newValue ? newValue.toISOString() : "",
              }))
            }
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>

        {/* Overview */}
        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={tripData.overview.title}
          onChange={handleOverviewChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={tripData.overview.description}
          onChange={handleOverviewChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Highlights (comma separated)"
          name="highlights"
          value={tripData.overview.highlights.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              overview: {
                ...prev.overview,
                highlights: e.target.value
                  .split(",")
                  .map((highlight) => highlight.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (Days)"
          type="number"
          name="days"
          value={tripData.overview.duration.days}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              overview: {
                ...prev.overview,
                duration: {
                  ...prev.overview.duration,
                  days: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (Nights)"
          type="number"
          name="nights"
          value={tripData.overview.duration.nights}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              overview: {
                ...prev.overview,
                duration: {
                  ...prev.overview.duration,
                  nights: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Daily Schedule */}
        <TealCard>
          <Grid item xs={12} p={2}>
            <Typography variant="h6">Daily Schedule</Typography>
            {tripData.dailySchedule.map((day, index) => (
              <Grid
                container
                spacing={4}
                key={index}
                border={"2px solid teal"}
                mb={1}
                p={3}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`Day ${index + 1} Title`}
                    name={`dailySchedule[${index}].title`}
                    value={day.title}
                    onChange={(event) =>
                      handleChangeDailySchedule(index, event)
                    }
                    border={"1px solid red"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`Day ${index + 1} Date`}
                    name={`dailySchedule[${index}].date`}
                    type="date"
                    value={day.date}
                    onChange={(event) =>
                      handleChangeDailySchedule(index, event)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`Day ${index + 1} Description`}
                    name={`dailySchedule[${index}].description`}
                    multiline
                    rows={4}
                    value={day.description}
                    onChange={(event) =>
                      handleChangeDailySchedule(index, event)
                    }
                  />
                </Grid>

                {/* For each activity */}
                {day.activities.map((activity, activityIndex) => (
                  <Grid item xs={12} key={activityIndex}>
                    <Grid container spacing={2}>
                      <TextField
                        fullWidth
                        label={`Activity ${activityIndex + 1} Name`}
                        name={`dailySchedule[${index}].activities[${activityIndex}].name`}
                        value={activity.name}
                        onChange={(event) =>
                          handleChangeDailySchedule(index, event)
                        }
                      />
                      <TextField
                        fullWidth
                        label={`Activity ${activityIndex + 1} Description`}
                        name={`dailySchedule[${index}].activities[${activityIndex}].description`}
                        value={activity.description}
                        onChange={(event) =>
                          handleChangeDailySchedule(index, event)
                        }
                      />
                      <TextField
                        fullWidth
                        label={`Activity ${activityIndex + 1} Start Time`}
                        name={`dailySchedule[${index}].activities[${activityIndex}].startTime`}
                        type="time"
                        value={activity.startTime}
                        onChange={(event) =>
                          handleChangeDailySchedule(index, event)
                        }
                      />
                      <TextField
                        fullWidth
                        label={`Activity ${activityIndex + 1} End Time`}
                        name={`dailySchedule[${index}].activities[${activityIndex}].endTime`}
                        type="time"
                        value={activity.endTime}
                        onChange={(event) =>
                          handleChangeDailySchedule(index, event)
                        }
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleRemoveActivity(index, activityIndex)
                        }
                      >
                        Remove Activity
                      </Button>
                    </Grid>
                  </Grid>
                ))}

                {/* Button to add new activity */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    // color={theme.palette.accent.dark}
                    color="info"
                    onClick={() => handleAddActivity(index)}
                  >
                    Add Activity
                  </Button>
                </Grid>

                {/* Button to remove the day */}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveDay(index)}
                  >
                    Remove Day
                  </Button>
                </Grid>
              </Grid>
            ))}

            {/* Button to add a new day */}
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddDay}>
              Add Day
            </Button>
          </Grid>
        </TealCard>

        {/* Inclusions */}
        <Typography variant="h6" gutterBottom>
          Inclusions
        </Typography>
        <TextField
          label="Inclusions (comma separated)"
          name="inclusions"
          value={tripData.inclusions.join(", ")}
          onChange={(e) =>
            setTripData({
              ...tripData,
              inclusions: e.target.value.split(",").map((inc) => inc.trim()),
            })
          }
          fullWidth
          margin="normal"
        />

        {/* Exclusions */}
        <Typography variant="h6" gutterBottom>
          Exclusions
        </Typography>
        <TextField
          label="Exclusions (comma separated)"
          name="exclusions"
          value={tripData.exclusions.join(", ")}
          onChange={(e) =>
            setTripData({
              ...tripData,
              exclusions: e.target.value.split(",").map((exc) => exc.trim()),
            })
          }
          fullWidth
          margin="normal"
        />

        {/* Optional Activities */}
        <Typography variant="h6" gutterBottom>
          Optional Activities
        </Typography>
        <Button
          variant="contained"
          onClick={() => alert("Add Optional Activity Logic")}
        >
          Add Optional Activity
        </Button>

        {/* Meeting Point */}
        <Typography variant="h6" gutterBottom>
          Meeting Point
        </Typography>
        <TextField
          label="Location"
          name="location"
          value={tripData.meetingPoint.location}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              meetingPoint: {
                ...prev.meetingPoint,
                location: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Latitude"
          type="number"
          name="latitude"
          value={tripData.meetingPoint.coordinates.latitude}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              meetingPoint: {
                ...prev.meetingPoint,
                coordinates: {
                  ...prev.meetingPoint.coordinates,
                  latitude: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          type="number"
          name="longitude"
          value={tripData.meetingPoint.coordinates.longitude}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              meetingPoint: {
                ...prev.meetingPoint,
                coordinates: {
                  ...prev.meetingPoint.coordinates,
                  longitude: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Instructions"
          name="instructions"
          value={tripData.meetingPoint.instructions}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              meetingPoint: {
                ...prev.meetingPoint,
                instructions: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />

        {/* End Point */}
        <Typography variant="h6" gutterBottom>
          End Point
        </Typography>
        <TextField
          label="Location"
          name="location"
          value={tripData.endPoint.location}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              endPoint: {
                ...prev.endPoint,
                location: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Latitude"
          type="number"
          name="latitude"
          value={tripData.endPoint.coordinates.latitude}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              endPoint: {
                ...prev.endPoint,
                coordinates: {
                  ...prev.endPoint.coordinates,
                  latitude: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          type="number"
          name="longitude"
          value={tripData.endPoint.coordinates.longitude}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              endPoint: {
                ...prev.endPoint,
                coordinates: {
                  ...prev.endPoint.coordinates,
                  longitude: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Instructions"
          name="instructions"
          value={tripData.endPoint.instructions}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              endPoint: {
                ...prev.endPoint,
                instructions: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />

        {/* Guide Info */}
        <Typography variant="h6" gutterBottom>
          Guide Info
        </Typography>
        <TextField
          label="Guide Name"
          name="name"
          value={tripData.guideInfo.name}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              guideInfo: {
                ...prev.guideInfo,
                name: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Experience"
          name="experience"
          value={tripData.guideInfo.experience}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              guideInfo: {
                ...prev.guideInfo,
                experience: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Languages (comma separated)"
          name="languages"
          value={tripData.guideInfo.languages.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              guideInfo: {
                ...prev.guideInfo,
                languages: e.target.value.split(",").map((lang) => lang.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Info"
          name="contactInfo"
          value={tripData.guideInfo.contactInfo}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              guideInfo: {
                ...prev.guideInfo,
                contactInfo: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Weather Info */}
        <Typography variant="h6" gutterBottom>
          Weather Info
        </Typography>
        <TextField
          label="Average Temperature (Celsius)"
          type="number"
          name="celsius"
          value={tripData.weatherInfo.averageTemperature.celsius}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              weatherInfo: {
                ...prev.weatherInfo,
                averageTemperature: {
                  ...prev.weatherInfo.averageTemperature,
                  celsius: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Average Temperature (Fahrenheit)"
          type="number"
          name="fahrenheit"
          value={tripData.weatherInfo.averageTemperature.fahrenheit}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              weatherInfo: {
                ...prev.weatherInfo,
                averageTemperature: {
                  ...prev.weatherInfo.averageTemperature,
                  fahrenheit: Number(e.target.value),
                },
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Seasonal Notes"
          name="seasonalNotes"
          value={tripData.weatherInfo.seasonalNotes}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              weatherInfo: {
                ...prev.weatherInfo,
                seasonalNotes: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
          multiline
          rows={2}
        />

        {/* Health & Safety */}
        <Typography variant="h6" gutterBottom>
          Health & Safety
        </Typography>
        <TextField
          label="Vaccinations (comma separated)"
          name="vaccinations"
          value={tripData.healthAndSafety.vaccinations.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              healthAndSafety: {
                ...prev.healthAndSafety,
                vaccinations: e.target.value
                  .split(",")
                  .map((vac) => vac.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Medical Facilities (comma separated)"
          name="medicalFacilities"
          value={tripData.healthAndSafety.medicalFacilities.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              healthAndSafety: {
                ...prev.healthAndSafety,
                medicalFacilities: e.target.value
                  .split(",")
                  .map((fac) => fac.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Emergency Contacts (comma separated)"
          name="emergencyContacts"
          value={tripData.healthAndSafety.emergencyContacts.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              healthAndSafety: {
                ...prev.healthAndSafety,
                emergencyContacts: e.target.value
                  .split(",")
                  .map((contact) => contact.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Insurance Requirements"
          name="insuranceRequirements"
          value={tripData.healthAndSafety.insuranceRequirements}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              healthAndSafety: {
                ...prev.healthAndSafety,
                insuranceRequirements: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Customizations */}
        <Typography variant="h6" gutterBottom>
          Customizations
        </Typography>
        <TextField
          label="Dietary Options (comma separated)"
          name="dietaryOptions"
          value={tripData.customizations.dietaryOptions.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              customizations: {
                ...prev.customizations,
                dietaryOptions: e.target.value
                  .split(",")
                  .map((opt) => opt.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Accessibility Options (comma separated)"
          name="accessibilityOptions"
          value={tripData.customizations.accessibilityOptions.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              customizations: {
                ...prev.customizations,
                accessibilityOptions: e.target.value
                  .split(",")
                  .map((opt) => opt.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Cancellation Policy */}
        <Typography variant="h6" gutterBottom>
          Cancellation Policy
        </Typography>
        <TextField
          label="Description"
          name="description"
          value={tripData.cancellationPolicy.description}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              cancellationPolicy: {
                ...prev.cancellationPolicy,
                description: e.target.value,
              },
            }))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Refund Policy (comma separated)"
          name="refundPolicy"
          value={tripData.cancellationPolicy.refundPolicy.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              cancellationPolicy: {
                ...prev.cancellationPolicy,
                refundPolicy: e.target.value
                  .split(",")
                  .map((policy) => policy.trim()),
              },
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Tags */}
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <TextField
          label="Tags (comma separated)"
          name="tags"
          value={tripData.tags.join(", ")}
          onChange={(e) =>
            setTripData((prev) => ({
              ...prev,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            }))
          }
          fullWidth
          margin="normal"
        />

        {/* Image URLs */}
        {/* <Typography variant="h6" gutterBottom>
          Image URLs
        </Typography>
        <TextField
          label="Image URLs (comma separated)"
          name="imageUrls"
          value={tripData.imageUrls.join(", ")}
          onChange={(e) =>
             
            setTripData((prev) => ({
              ...prev,
              imageUrls: e.target.value.split(",").map((url) => url.trim()),
            }))
          }
          fullWidth
          margin="normal"
        /> */}
        <ImageUploadSection tripData={tripData} setTripData={setTripData} />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Submit Itinerary
        </Button>
      </form>
    </Paper>
  );
};

export default AddItineraryPage;
