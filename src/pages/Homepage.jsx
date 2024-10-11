import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TripCard from "../components/TripCard";
import { getTrips } from "../utils/api";
import SwiperCarousel from "../components/SwiperCarousel/SwiperCarousel";

const HomePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTrips = async () => {
      const fetchedTrips = await getTrips();
      setTrips(fetchedTrips);
      setLoading(false);
    };

    fetchTrips();
  }, []);

  const renderSkeletonCards = () => {
    return Array.from({ length: 3 }, (_, index) => (
      <Card
        key={index}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          animation="wave"
        />
        <CardContent>
          <Skeleton variant="text" animation="wave" height={32} width="80%" />
          <Skeleton variant="text" animation="wave" height={20} width="100%" />
          <Skeleton variant="text" animation="wave" height={20} width="60%" />
          <Skeleton
            variant="text"
            animation="wave"
            height={24}
            width="40%"
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>
    ));
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h1" gutterBottom align="center" color="primary">
        Welcome to Bogai Jaam Adventure Travels
      </Typography>
      <Typography variant="body1" paragraph align="center" color="text.primary">
        Bogai Jaam offers the best adventure trips in the most exotic locations
        like Dzukou Valley, Haflong, and Mawryngkhang. Join us for thrilling
        experiences!
      </Typography>
      <SwiperCarousel />
      <Box sx={{ mt: 5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {loading ? (
            renderSkeletonCards()
          ) : trips.length > 0 ? (
            trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              No trips available at the moment.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
