import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Stack,
  Chip,
  Divider,
  useMediaQuery,
  Badge,
  Dialog,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Trash2,
  Mail,
  Phone,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { getContactQueries, deleteContactQuery } from "../utils/api";

const fieldLabels = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  tripInterest: "Trip of Interest",
  preferredDates: "Preferred Dates",
  groupSize: "Group Size",
  budget: "Budget (per person)",
  message: "Message",
  createdAt: "Submitted At",
};

const iconMap = {
  email: Mail,
  phone: Phone,
  tripInterest: MapPin,
  preferredDates: Calendar,
  groupSize: Users,
  budget: DollarSign,
  message: MessageSquare,
};

const ContactAdminPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:375px)");

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const data = await getContactQueries();
      setQueries(data);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to fetch queries",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Delete confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const handleOpenConfirm = (id) => {
    setConfirmDialog({ open: true, id });
  };
  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, id: null });
  };

  const handleDelete = async (id) => {
    handleOpenConfirm(id);
  };

  const handleConfirmDelete = async () => {
    const id = confirmDialog.id;
    setDeletingId(id);
    try {
      await deleteContactQuery(id);
      setQueries((prev) => prev.filter((q) => q._id !== id));
      setSnackbar({
        open: true,
        message: "Query deleted",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete query",
        severity: "error",
      });
    } finally {
      setDeletingId("");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isExtraSmall) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleString();
  };

  const renderChips = (query) => {
    const chips = [];

    if (query.email) {
      chips.push(
        <Chip
          key="email"
          icon={<Mail size={14} />}
          label={isExtraSmall ? query.email.split("@")[0] : query.email}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    if (query.phone) {
      chips.push(
        <Chip
          key="phone"
          icon={<Phone size={14} />}
          label={query.phone}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    if (query.tripInterest) {
      chips.push(
        <Chip
          key="trip"
          icon={<MapPin size={14} />}
          label={query.tripInterest}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    if (query.groupSize) {
      chips.push(
        <Chip
          key="group"
          icon={<Users size={14} />}
          label={isExtraSmall ? query.groupSize : `Group: ${query.groupSize}`}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    if (query.budget) {
      chips.push(
        <Chip
          key="budget"
          icon={<DollarSign size={14} />}
          label={isExtraSmall ? `₹${query.budget}` : `Budget: ₹${query.budget}`}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    if (query.preferredDates) {
      chips.push(
        <Chip
          key="dates"
          icon={<Calendar size={14} />}
          label={query.preferredDates}
          size={isExtraSmall ? "small" : "medium"}
          sx={{
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            "& .MuiChip-icon": { fontSize: { xs: "0.875rem", sm: "1rem" } },
          }}
        />
      );
    }

    return chips;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 1, sm: 4 },
        px: { xs: 1, sm: 3 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={{ xs: 2, sm: 3 }}
        sx={{ px: { xs: 1, sm: 0 } }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          gap={1}
          mb={2}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={700}
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Contact Queries
          </Typography>

          {queries.length > 0 && (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  whiteSpace: "nowrap",
                }}
              >
                — Total
              </Typography>
              <Badge
                badgeContent={queries.length}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    minWidth: { xs: 16, sm: 20 },
                    height: { xs: 16, sm: 20 },
                  },
                }}
              >
                <Box />
              </Badge>
            </Box>
          )}
        </Box>

        <Tooltip title="Refresh">
          <IconButton
            onClick={fetchQueries}
            size={isMobile ? "small" : "medium"}
            sx={{
              bgcolor: "action.hover",
              "&:hover": { bgcolor: "action.selected" },
            }}
          >
            <RefreshCw size={isMobile ? 18 : 20} />
          </IconButton>
        </Tooltip>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress size={isMobile ? 32 : 40} />
        </Box>
      ) : queries.length === 0 ? (
        <Alert
          severity="info"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          No contact queries found.
        </Alert>
      ) : (
        <Stack spacing={{ xs: 2, sm: 3 }}>
          {queries.map((q) => (
            <Card
              key={q._id}
              elevation={2}
              sx={{
                borderRadius: { xs: 2, sm: 3 },
                overflow: "visible",
                mx: { xs: 0, sm: 0 },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack direction="column" spacing={2}>
                  {/* Header with Name and Delete Button */}
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        fontWeight={700}
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          wordBreak: "break-word",
                          lineHeight: 1.2,
                        }}
                      >
                        {q.name || "Anonymous"}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        {formatDate(q.createdAt)}
                      </Typography>
                    </Box>
                    <Tooltip title="Delete">
                      <span>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenConfirm(q._id)}
                          disabled={deletingId === q._id}
                          size={isMobile ? "small" : "medium"}
                          sx={{
                            minWidth: { xs: 32, sm: 40 },
                            minHeight: { xs: 32, sm: 40 },
                            "&:hover": {
                              bgcolor: "error.light",
                              color: "error.contrastText",
                            },
                          }}
                        >
                          {deletingId === q._id ? (
                            <CircularProgress size={16} />
                          ) : (
                            <Trash2 size={isMobile ? 16 : 18} />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>

                  {/* Contact Information Chips */}
                  {renderChips(q).length > 0 && (
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{
                        gap: { xs: 0.5, sm: 1 },
                        "& > *": { mb: { xs: 0.5, sm: 1 } },
                      }}
                    >
                      {renderChips(q)}
                    </Stack>
                  )}

                  {/* Message Section */}
                  {q.message && (
                    <>
                      <Divider sx={{ my: { xs: 1, sm: 1.5 } }} />
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            fontWeight: 600,
                          }}
                        >
                          Message
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "pre-line",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            lineHeight: 1.5,
                            wordBreak: "break-word",
                          }}
                        >
                          {q.message}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        aria-labelledby="delete-confirm-title"
        aria-describedby="delete-confirm-desc"
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Trash2 size={40} color="#e53935" />
          </Box>
          <Typography id="delete-confirm-title" variant="h6" fontWeight={700} gutterBottom>
            Delete Contact Query?
          </Typography>
          <Typography id="delete-confirm-desc" color="text.secondary" sx={{ mb: 3, fontSize: { xs: 14, sm: 15 } }}>
            Are you sure you want to permanently delete this contact query? This action cannot be undone.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button onClick={handleCloseConfirm} variant="outlined" color="inherit" sx={{ minWidth: 100 }}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              sx={{ minWidth: 100 }}
              disabled={deletingId === confirmDialog.id}
            >
              {deletingId === confirmDialog.id ? <CircularProgress size={18} /> : "Delete"}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Container>
  );
};

export default ContactAdminPage;
