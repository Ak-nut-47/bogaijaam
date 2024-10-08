// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import TripCard from "../components/TripCard";
import { getTrips } from "../utils/api";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const fetchedTrips = await getTrips();
      console.log(fetchedTrips, "IIIIIIIIIIIIIIIIIIII");
      setTrips(fetchedTrips);
      setLoading(false);
    };

    fetchTrips();
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome to Bogai Jaam Adventure Travels
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Bogai Jaam offers the best adventure trips in the most exotic locations
        like Dzukou Valley, Haflong, and Mawryngkhang. Join us for thrilling
        experiences!
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <Grid item key={trip._id} xs={12} sm={6} md={4}>
                <TripCard trip={trip} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No trips available at the moment.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
