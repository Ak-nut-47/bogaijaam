import { Grid, Typography, Button, Box } from "@mui/material";

const CampsiteHighlightWithMap = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "600px", // Increased height for better space for the map
          backgroundImage:
            "url('https://raw.githubusercontent.com/Ak-nut-47/bogaijaam_images/refs/heads/main/Campsite/output.webp')", // Campsite image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          color: "#fff",
        }}
      >
        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />

        {/* Content on top of the image */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 0,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            BOGAIJAAM CAMPSITE
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            Escape to tranquility at the BOGAJAAM campsite, Dengrali Crator's
            Hub Sonapur
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#32a852", // Green button
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "25px",
              textTransform: "none",
              mt: 5,
              "&:hover": {
                backgroundColor: "#2b8e47", // Darker green on hover
              },
            }}
            onClick={() => {}}
          >
            For Bookings : 9678243301
          </Button>
        </Box>

        {/* Google Map Embed - Positioned in the top-right corner of the image */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "250px",
            height: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.1432186688376!2d91.9601362!3d26.1268729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375af3bc10c5aa71%3A0x4f957c64df0f5354!2sBOGAIJAAM%20Campsite!5e0!3m2!1sen!2sin!4v1735989586205!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
          />
        </Box>
      </Box>
    </>
  );
};

export default CampsiteHighlightWithMap;
