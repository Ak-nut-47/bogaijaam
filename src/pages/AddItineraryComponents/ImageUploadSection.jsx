import React, { useState, useEffect } from "react";
import {
  TextField,
  IconButton,
  Card,
  Typography,
  Box,
  Grid2 as Grid,
  Button,
} from "@mui/material";
import { X, ExternalLink, AlertCircle } from "lucide-react";

const ImageUploadSection = ({ tripData, setTripData }) => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [error, setError] = useState("");
  const [debouncedImageUrl, setDebouncedImageUrl] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedImageUrl(newImageUrl);
    }, 500);

    return () => clearTimeout(timer);
  }, [newImageUrl]);

  const validateImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg|avif)$/i) != null;
  };

  const handleAddImage = () => {
    if (!debouncedImageUrl.trim()) {
      setError("Please enter an image URL");
      return;
    }

    if (!validateImageUrl(debouncedImageUrl)) {
      setError("Please enter a valid image URL");
      return;
    }

    setTripData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, debouncedImageUrl.trim()],
    }));
    setNewImageUrl("");
    setError("");
  };

  const handleRemoveImage = (indexToRemove) => {
    setTripData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddImage();
    }
  };

  return (
    <Card
      style={{
        padding: "16px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
        marginBottom: 10,
      }}
    >
      <Typography variant="h6" style={{ marginBottom: "16px" }}>
        Image Gallery
      </Typography>

      <Box style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <TextField
          label="Add Image URL"
          value={newImageUrl}
          onChange={(e) => {
            setNewImageUrl(e.target.value);
            setError("");
          }}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <Button
          disabled={newImageUrl === ""}
          onClick={handleAddImage}
          variant="contained"
          color="primary"
        >
          Add Image
        </Button>
      </Box>

      <Grid container spacing={3} style={{ marginTop: "16px" }}>
        {tripData.imageUrls.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{
                position: "relative",
                padding: "8px",
                height: "100%",
                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  overflow: "hidden",
                  borderRadius: "4px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <img
                  src={url}
                  alt={`Trip image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                <Box
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => window.open(url, "_blank")}
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      color: "red",
                    }}
                  >
                    <X className="w-4 h-4" />
                  </IconButton>
                </Box>
              </Box>
              <Typography
                style={{
                  marginTop: "8px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  padding: "0 4px",
                }}
                title={url}
              >
                {url.split("/").pop()}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {tripData.imageUrls.length === 0 && (
        <Box
          style={{
            textAlign: "center",
            padding: "32px 0",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            marginTop: "16px",
          }}
        >
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <Typography style={{ marginTop: "8px", color: "#757575" }}>
            No images added yet. Add some images to your trip!
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ImageUploadSection;
