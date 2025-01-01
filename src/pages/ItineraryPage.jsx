import React, { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import Grid from "@mui/material/Grid";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Container, Typography, Card, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";
import axios from "axios";
import img from "../assets/SliderImages/swiper1.webp";
import { useParams } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.components.MuiCard.styleOverrides.root.boxShadow,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  color: theme.palette.error.main,
}));

const ItineraryPage = () => {
  const { id } = useParams(); // Extract id from URL parameters/

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Trip Id is ________", id);
  useEffect(() => {
    console.log("Use Efect Ran");
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(
          `/.netlify/functions/getItinerary?id=${id}` // Use id from params
        );
        console.log("Response Data is ----", response.data);
        // setItinerary(response.data[0]); // Assuming the first element is the itinerary
        setItinerary(response.data); // Assuming the first element is the itinerary
      } catch (err) {
        console.error("Failed to fetch itinerary", err);
        setError("Failed to load itinerary. Please try again later.");
      } finally {
        setLoading(false); // Always set loading to false after fetching or error
      }
    };

    fetchItinerary();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorOutlineIcon style={{ fontSize: 60, marginBottom: 16 }} />
        <Typography variant="h5" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography>{error}</Typography>
      </ErrorContainer>
    );
  }

  if (!itinerary) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h1"
        gutterBottom
        align="center"
        style={{ marginTop: 32 }}
      >
        {itinerary.overview.title}
      </Typography>

      <StyledCard>
        <CardMedia
          component="img"
          height="400"
          image={itinerary.imageUrls[0] || img}
          alt={itinerary.overview.title}
          //   onError={(e) => {
          //     e.target.src = "/api/placeholder/1200/400";
          //   }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {itinerary.overview.description}
          </Typography>
          <Box mt={2}>
            {itinerary.tags.map((tag) => (
              <StyledChip
                key={tag}
                label={tag}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </StyledCard>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" gutterBottom>
            Daily Schedule
          </Typography>
          {itinerary.dailySchedule.map((day) => (
            <Accordion key={day.day}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  Day {day.day}: {day.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{day.description}</Typography>
                <Typography variant="subtitle1">Activities:</Typography>
                <List>
                  {day.activities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={activity.name}
                        secondary={`${activity.startTime} - ${activity.endTime}: ${activity.description}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle1">Meals:</Typography>
                <Typography>
                  Breakfast: {day.meals.breakfast}
                  <br />
                  Lunch: {day.meals.lunch}
                  <br />
                  Dinner: {day.meals.dinner}
                </Typography>
                {day.accommodation.name !== "N/A" && (
                  <>
                    <Typography variant="subtitle1" style={{ marginTop: 16 }}>
                      Accommodation:
                    </Typography>
                    <Typography>
                      {day.accommodation.name} - {day.accommodation.type}
                    </Typography>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trip Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <EventIcon /> Duration
                      </>
                    }
                    secondary={`${itinerary.overview.duration.days} days, ${itinerary.overview.duration.nights} nights`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <LocationOnIcon /> Meeting Point
                      </>
                    }
                    secondary={itinerary.meetingPoint.location}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        <StarIcon /> Difficulty
                      </>
                    }
                    secondary={itinerary.difficultyLevel || "Not specified"}
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What's Included
              </Typography>
              <List>
                {itinerary.inclusions.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What's Not Included
              </Typography>
              <List>
                {itinerary.exclusions.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ItineraryPage;
