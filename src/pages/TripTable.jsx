// src/pages/TripTable.js
import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getTrips, deleteTrip } from "../utils/api"; // Import necessary API functions

const TripTable = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // Fetch all trips when component loads
  useEffect(() => {
    const fetchTrips = async () => {
      const data = await getTrips();
      setTrips(data);
    };
    fetchTrips();
  }, []);

  // Handle delete trip
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
      setTrips(trips.filter((trip) => trip._id !== id));
    }
  };

  // Column definitions for the table
  const columns = [
    {
      accessorKey: "tripName",
      header: "Trip Name",
    },
    {
      accessorKey: "location.state",
      header: "State",
    },
    {
      accessorKey: "location.country",
      header: "Country",
    },
    {
      accessorKey: "price.amount",
      header: "Price (INR)",
    },
    {
      accessorKey: "difficultyLevel",
      header: "Difficulty",
    },
    {
      accessorKey: "duration.days",
      header: "Duration (Days)",
    },
    {
      accessorKey: "duration.nights",
      header: "Duration (Nights)",
    },
    {
      header: "Actions",
      id: "actions",
      size: 150,
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => navigate(`/edit/${row.original._id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(row.original._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
    {
      header: "Add Itinerary For Trip",
      id: "itinerary",
      size: 250,

      Cell: ({ row }) => {
        const navigate = useNavigate();

        const handleAddItinerary = () => {
          navigate("/add/itinerary", { state: { tripId: row.original._id } }); // Pass data in state
        };

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ mb: 2 }}
              onClick={handleAddItinerary}
            >
              Add Itinerary
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2, mr: 5 }}
        onClick={() => navigate("/add")}
      >
        Add Trip
      </Button>

      <MaterialReactTable columns={columns} data={trips} />
    </Box>
  );
};

export default TripTable;
