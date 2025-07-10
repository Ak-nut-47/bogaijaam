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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getTrips, deleteTrip, deleteItinerary } from "../utils/api";

const TripTable = () => {
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

  // Fetch all trips when component loads
  useEffect(() => {
    fetchTrips();
    // Re-fetch when tab becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchTrips();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
      size: 150,
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Edit Trip">
            <IconButton
              color="primary"
              onClick={() => navigate(`/edit/${row.original._id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Trip">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(row.original._id)}
            >
              <DeleteIcon />
            </IconButton>
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
          <Box sx={{ display: "flex", gap: 1 }}>
            {!trip.itinerary ? (
              <Tooltip title="Add Itinerary">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
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
                    startIcon={<EditIcon />}
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
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDeleteItinerary(trip.itinerary._id, trip._id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
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
    <Box sx={{ padding: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2, mr: 5 }}
        onClick={() => navigate("/add")}
        disabled={loading}
      >
        Add Trip
      </Button>
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
        <MaterialReactTable table={table} />
      )}
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
