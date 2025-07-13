// src/pages/TripTable.js
import React, { useEffect, useState } from "react";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import {
  Button,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Plus, MessageCircleQuestion } from "lucide-react"; // Lucide icons
// Remove MUI icons
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
import { getTrips, deleteTrip, deleteItinerary } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const TripTable = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: null,
  });
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  // Redirect to home if user logs out
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Fetch all trips when component loads
  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    const data = await getTrips();
    setTrips(data);
    setLoading(false);
  };

  // Confirm dialog handler
  const openConfirmDialog = (title, content, onConfirm) => {
    setDialog({ open: true, title, content, onConfirm });
  };

  const handleDialogClose = () => {
    setDialog({ ...dialog, open: false });
  };

  // Handle delete trip
  const handleDelete = (id) => {
    openConfirmDialog(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      async () => {
        setLoading(true);
        await deleteTrip(id);
        setTrips((prev) => prev.filter((trip) => trip._id !== id));
        setSnackbar({
          open: true,
          message: "Trip deleted.",
          severity: "success",
        });
        setLoading(false);
        handleDialogClose();
      }
    );
  };

  // Handle delete itinerary
  const handleDeleteItinerary = (itineraryId, tripId) => {
    openConfirmDialog(
      "Delete Itinerary",
      "Are you sure you want to delete this itinerary?",
      async () => {
        setLoading(true);
        try {
          const result = await deleteItinerary(itineraryId);
          if (result && result.message === "Itinerary deleted successfully") {
            setTrips((prev) =>
              prev.map((trip) =>
                trip._id === tripId ? { ...trip, itinerary: null } : trip
              )
            );
            setSnackbar({
              open: true,
              message: "Itinerary deleted.",
              severity: "success",
            });
          } else {
            setSnackbar({
              open: true,
              message:
                result && result.message
                  ? result.message
                  : "Failed to delete itinerary.",
              severity: "error",
            });
          }
        } catch (error) {
          setSnackbar({
            open: true,
            message: error.message || "Failed to delete itinerary.",
            severity: "error",
          });
        }
        setLoading(false);
        handleDialogClose();
      }
    );
  };

  // Column definitions for the table
  const columns = [
    { accessorKey: "tripName", header: "Trip Name" },
    { accessorKey: "location.state", header: "State" },
    { accessorKey: "location.country", header: "Country" },
    { accessorKey: "price.amount", header: "Price (INR)" },
    { accessorKey: "difficultyLevel", header: "Difficulty" },
    { accessorKey: "duration.days", header: "Duration (Days)" },
    { accessorKey: "duration.nights", header: "Duration (Nights)" },
    {
      header: "Actions",
      id: "actions",
      size: 180,
      Cell: ({ row }) => (
        <Box
          sx={{
            display: isMobile ? "block" : "flex",
            gap: 1,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Tooltip title="Edit Trip">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Edit size={18} />}
              size={isMobile ? "medium" : "small"}
              fullWidth={isMobile}
              sx={{ mb: isMobile ? 1 : 0, fontWeight: 600, minWidth: 120 }}
              onClick={() => navigate(`/edit/${row.original._id}`)}
            >
              Edit Trip
            </Button>
          </Tooltip>
          <Tooltip title="Delete Trip">
            <Button
              variant="outlined"
              color="error"
              startIcon={<Trash2 size={18} />}
              size={isMobile ? "medium" : "small"}
              fullWidth={isMobile}
              sx={{ fontWeight: 600, minWidth: 120 }}
              onClick={() => handleDelete(row.original._id)}
            >
              Delete Trip
            </Button>
          </Tooltip>
        </Box>
      ),
    },
    {
      header: "Itinerary",
      id: "itinerary",
      size: 250,
      Cell: ({ row }) => {
        const trip = row.original;
        return (
          <Box
            sx={{
              display: isMobile ? "block" : "flex",
              gap: 1,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {!trip.itinerary ? (
              <Tooltip title="Add Itinerary">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Plus size={18} />}
                  size={isMobile ? "medium" : "small"}
                  fullWidth={isMobile}
                  sx={{ fontWeight: 600, minWidth: 150 }}
                  onClick={() =>
                    navigate("/add/itinerary", { state: { tripId: trip._id } })
                  }
                >
                  Add Itinerary
                </Button>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Edit Itinerary">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit size={18} />}
                    size={isMobile ? "medium" : "small"}
                    fullWidth={isMobile}
                    sx={{
                      mb: isMobile ? 1 : 0,
                      fontWeight: 600,
                      minWidth: 150,
                    }}
                    onClick={() =>
                      navigate("/add/itinerary", {
                        state: {
                          tripId: trip._id,
                          itineraryId: trip.itinerary._id,
                        },
                      })
                    }
                  >
                    Edit Itinerary
                  </Button>
                </Tooltip>
                <Tooltip title="Delete Itinerary">
                  {/* <IconButton
                    color="error"
                    size={isMobile ? "medium" : "small"}
                    sx={{ ml: isMobile ? 0 : 1 }}
                    onClick={() =>
                      handleDeleteItinerary(trip.itinerary._id, trip._id)
                    }
                  >
                    <Trash2 size={18} />
                  </IconButton> */}
                  <Button
                    variant="outlined" // Using outlined variant like the edit button
                    color="error" // Keep the error color for distinction
                    startIcon={<Trash2 size={18} />} // Add the trash icon as a startIcon
                    size={isMobile ? "medium" : "small"}
                    fullWidth={isMobile} // Match fullWidth behavior for mobile
                    sx={{
                      mb: isMobile ? 1 : 0,
                      fontWeight: 600,
                      minWidth: 150,
                      ml: isMobile ? 0 : 1,
                    }} // Adjust margin-left for desktop
                    onClick={() =>
                      handleDeleteItinerary(trip.itinerary._id, trip._id)
                    }
                  >
                    Delete Itinerary
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        );
      },
    },
  ];

  // Use the useMaterialReactTable hook for better state management
  const table = useMaterialReactTable({
    columns,
    data: trips,
    state: { isLoading: loading },
  });

  return (
    <Box sx={{ p: isMobile ? 1 : 4, pb: 8 }}>
      {/* Admin Panel Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: isMobile ? 2 : 4,
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Box sx={{ flex: 2, textAlign: "center" }}>
          <Box
            sx={{
              fontWeight: 700,
              fontSize: isMobile ? 22 : 32,
              letterSpacing: 1,
              color: "primary.main",
            }}
          >
            Admin Panel
          </Box>
        </Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            sx={{
              mb: isMobile ? 1 : 2,
              minWidth: 120,
              fontWeight: 600,
              boxShadow: 2,
            }}
            onClick={() => navigate("/add")}
            disabled={loading}
          >
            Add Trip
          </Button>
        </Box>
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MessageCircleQuestion size={20} />}
            sx={{
              mb: isMobile ? 1 : 2,
              minWidth: 120,
              fontWeight: 600,
              boxShadow: 2,
            }}
            onClick={() => navigate("/admin/contact-queries")}
            disabled={loading}
          >
            View Queries
          </Button>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ p: isMobile ? 0.5 : 3, overflow: "auto" }}>
        {loading ? (
          <Box sx={{ mt: 4 }}>
            {/* Skeleton Table: 5 rows, 8 columns */}
            {[...Array(5)].map((_, rowIdx) => (
              <Box key={rowIdx} sx={{ display: "flex", mb: 1 }}>
                {[...Array(8)].map((_, colIdx) => (
                  <Box key={colIdx} sx={{ flex: 1, mr: 2 }}>
                    <Skeleton variant="rectangular" height={40} />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ minWidth: isMobile ? 700 : 0 }}>
            <MaterialReactTable table={table} />
          </Box>
        )}
      </Paper>
      {/* Confirmation Dialog */}
      <Dialog open={dialog.open} onClose={handleDialogClose}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={dialog.onConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TripTable;
