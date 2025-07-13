import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MapPin, Calendar, Users, Star, Heart } from "lucide-react";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[2],
  transition: "box-shadow 0.2s, transform 0.2s",
  "&:hover": {
    boxShadow: theme.shadows[6],
    transform: "translateY(-4px) scale(1.015)",
  },
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  minHeight: 360,
}));

const TripCard = ({ trip }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/itinerary/${trip._id}`);
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={trip.imageUrls?.[0] || "/placeholder.jpg"}
          alt={trip.tripName}
          sx={{ objectFit: "cover" }}
          loading="lazy"
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" }
          }}
          aria-label="Favorite"
          onClick={e => e.stopPropagation()}
        >
          <Heart size={22} strokeWidth={2} color="#e57373" />
        </IconButton>
        {trip.isFeatured && (
          <Chip
            label="Featured"
            color="secondary"
            size="small"
            sx={{ position: "absolute", top: 12, left: 12, fontWeight: 600 }}
          />
        )}
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
          {trip.tripName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <MapPin size={18} style={{ marginRight: 4 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {trip.location?.nearestCity}, {trip.location?.state}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Calendar size={16} />
            <Typography variant="caption">{trip.duration?.days}d {trip.duration?.nights}n</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Users size={16} />
            <Typography variant="caption">{trip.maxGroupSize || 12} people</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Typography variant="caption">{trip.rating?.toFixed(1) || "4.8"}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }} noWrap>
          {trip.shortDescription || "Adventure awaits you on this trip!"}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 1 }}>
          <Typography variant="h6" color="secondary" fontWeight={700}>
            ₹{trip.price?.amount || 0}
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              /person
            </Typography>
          </Typography>
          <Chip label={trip.difficultyLevel || "Easy"} size="small" sx={{ fontWeight: 600 }} />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TripCard;
