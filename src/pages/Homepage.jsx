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
  Button,
} from "@mui/material";
import TripCard from "../components/TripCard";
import { getTrips } from "../utils/api";
import SwiperCarousel from "../components/SwiperCarousel/SwiperCarousel";
import CampsiteHighlight from "../components/CampsiteHighlight";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

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

  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Container sx={{ py: 5 }}>
        <Typography variant="h1" gutterBottom align="center" color="primary">
          Welcome to Bogai Jaam Adventure Travels
        </Typography>
        <Typography
          variant="body1"
          paragraph
          align="center"
          color="text.primary"
        >
          Bogai Jaam offers the best adventure trips in the most exotic
          locations like Dzukou Valley, Haflong, and Mawryngkhang. Join us for
          thrilling experiences!
        </Typography>
        <SwiperCarousel />
        <CampsiteHighlight />
        <Box sx={{ mt: 5 }}>
          <Box>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                  }}
                >
                  {loading ? (
                    renderSkeletonCards()
                  ) : trips.length > 0 ? (
                    trips.map((trip) => (
                      <Box
                        key={trip._id}
                        sx={{
                          width: { xs: "100%", sm: "48%", md: "31%" },
                          display: "flex",
                        }}
                      >
                        <TripCard trip={trip} />
                      </Box>
                    ))
                  ) : (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="center"
                      sx={{ width: "100%" }}
                    >
                      No trips available at the moment.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
