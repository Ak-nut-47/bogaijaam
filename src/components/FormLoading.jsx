import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function FullScreenFormSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        padding: isMobile ? 2 : 4,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ maxWidth: isMobile ? "100%" : "80%" }}
      >
        <Grid item xs={12} md={6}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={isMobile ? 120 : isTablet ? 180 : 220}
            sx={{ borderRadius: 2, marginBottom: 2 }}
          />
          {[...Array(3)].map((_, idx) => (
            <Skeleton
              key={idx}
              animation="wave"
              height={isMobile ? 20 : 30}
              sx={{ marginBottom: 1.5, borderRadius: 1 }}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {[...Array(4)].map((_, idx) => (
              <Grid item xs={6} key={idx}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={isMobile ? 80 : isTablet ? 120 : 150}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))}
          </Grid>
          {[...Array(2)].map((_, idx) => (
            <Skeleton
              key={idx}
              animation="wave"
              height={isMobile ? 20 : 30}
              sx={{ marginTop: 2, borderRadius: 1 }}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
