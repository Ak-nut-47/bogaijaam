import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        textAlign: "center",
        marginTop: 0, // Remove margin to use full height
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ color: "coral.main" }}>
          Unauthorized Access
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "accent.main", marginBottom: 2 }}
        >
          You do not have permission to access this page.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
