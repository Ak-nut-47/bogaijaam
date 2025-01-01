import React, { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddItineraryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripId = location.state?.tripId; // Access data from state
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const [tripData, setTripData] = useState({
    // tripId: "",
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
    imageUrls: [""],
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tripData);
    // Handle form submission, e.g., API call to save data
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Trip Details
      </Typography>
      <Button
        variant="contained"
        onClick={handleGoBack}
        startIcon={<ArrowBackIcon />}
      >
        Go Back
      </Button>
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
        <TextField
          // label="Last Updated"
          type="datetime-local"
          name="lastUpdated"
          value={tripData.lastUpdated}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

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
        <Typography variant="h6" gutterBottom>
          Daily Schedule
        </Typography>
        {/* Add logic here to dynamically add daily schedule items */}
        <Button
          variant="contained"
          onClick={() => alert("Add Daily Schedule Logic")}
        >
          Add Daily Schedule
        </Button>

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
        <Typography variant="h6" gutterBottom>
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
        />

        {/* Submit Button */}
        <Button variant="contained" color="primary" type="submit">
          Submit Trip
        </Button>
      </form>
    </Paper>
  );
};

export default AddItineraryPage;
