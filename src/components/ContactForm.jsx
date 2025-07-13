import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  MenuItem,
  InputAdornment,
  useMediaQuery,
  IconButton,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Mail,
  User,
  Phone,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  MapPin,
  X,
} from "lucide-react";
import { sendContactQuery } from "../utils/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  tripInterest: "",
  preferredDates: "",
  groupSize: "",
  budget: "",
  message: "",
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactForm = ({ open, onClose }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:375px)");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isFormValid = () => {
    return (
      form.name.trim() &&
      isValidEmail(form.email) &&
      form.phone.trim() &&
      form.message.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await sendContactQuery(form);
      setSuccess("Thank you for contacting us! We'll get back to you soon.");
      setForm(initialForm);
      setTouched({});
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess("");
    setError("");
    onClose();
  };

  const fieldSize = isExtraSmall ? "small" : isMobile ? "small" : "medium";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={isMobile ? "xs" : "sm"}
      fullScreen={isExtraSmall}
      TransitionComponent={isMobile ? Transition : undefined}
      PaperProps={{
        sx: {
          m: isExtraSmall ? 0 : 1,
          width: isMobile ? "100%" : undefined,
          height: isExtraSmall ? "100vh" : "auto",
          maxHeight: isExtraSmall ? "100vh" : "90vh",
          borderRadius: isExtraSmall ? 0 : { xs: 2, sm: 3 },
          position: "relative",
        },
      }}
      scroll="body"
    >
      <DialogTitle
        sx={{
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 3 },
          pb: 1,
          fontSize: { xs: 18, sm: 24 },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>Contact Us</Box>
        {isMobile && (
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 16 },
              top: { xs: 8, sm: 16 },
            }}
          >
            <X size={20} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          pb: { xs: 1, sm: 2 },
          pt: 0,
          overflowX: "hidden",
          flex: isExtraSmall ? 1 : "none",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
        >
          Please fill out the form below and our team will get in touch with you
          promptly. For urgent queries, call or WhatsApp us directly.
        </Typography>

        <Stack spacing={isExtraSmall ? 1.5 : 2} mt={1}>
          {success && (
            <Alert
              severity="success"
              sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
            >
              {success}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              sx={{ fontSize: { xs: "0.875rem", sm: "0.875rem" } }}
            >
              {error}
            </Alert>
          )}

          <TextField
            name="name"
            label="Full Name *"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            required
            autoComplete="name"
            error={touched.name && !form.name.trim()}
            helperText={
              touched.name && !form.name.trim() ? "Name is required" : ""
            }
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          />

          <TextField
            name="email"
            label="Email *"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            fullWidth
            required
            autoComplete="email"
            error={touched.email && !isValidEmail(form.email)}
            helperText={
              touched.email && !isValidEmail(form.email)
                ? "Enter a valid email address"
                : ""
            }
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          />

          <TextField
            name="phone"
            label="Phone *"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            type="tel"
            fullWidth
            required
            autoComplete="tel"
            error={touched.phone && !form.phone.trim()}
            helperText={
              touched.phone && !form.phone.trim() ? "Phone is required" : ""
            }
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone size={16} />
                  <Typography variant="body2" sx={{ ml: 0.5, mr: 0.5 }}>
                    +91
                  </Typography>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          />

          <TextField
            name="tripInterest"
            label="Trip of Interest"
            value={form.tripInterest}
            onChange={handleChange}
            fullWidth
            select
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapPin size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          >
            <MenuItem value="">Select a trip</MenuItem>
            <MenuItem value="Dzukou Valley">Dzukou Valley</MenuItem>
            <MenuItem value="Haflong">Haflong</MenuItem>
            <MenuItem value="Mawryngkhang">Mawryngkhang</MenuItem>
            <MenuItem value="Other">Other / Not sure</MenuItem>
          </TextField>

          <TextField
            name="preferredDates"
            label="Preferred Dates"
            value={form.preferredDates}
            onChange={handleChange}
            placeholder="e.g. 10-15 August, or Flexible"
            fullWidth
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              name="groupSize"
              label="Group Size"
              value={form.groupSize}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              size={fieldSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Users size={16} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />

            <TextField
              name="budget"
              label="Budget (per person)"
              value={form.budget}
              onChange={handleChange}
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              size={fieldSize}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DollarSign size={16} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
                "& .MuiInputBase-input": {
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                },
              }}
            />
          </Stack>

          <TextField
            name="message"
            label="Message *"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            minRows={isExtraSmall ? 3 : 4}
            maxRows={isExtraSmall ? 5 : 6}
            fullWidth
            required
            error={touched.message && !form.message.trim()}
            helperText={
              touched.message && !form.message.trim()
                ? "Message is required"
                : ""
            }
            size={fieldSize}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: "flex-start", mt: 1 }}
                >
                  <MessageSquare size={16} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
              "& .MuiInputBase-input": {
                fontSize: { xs: "0.875rem", sm: "1rem" },
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          pt: 2,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 1 },
          borderTop: isMobile ? 1 : 0,
          borderColor: "divider",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          fullWidth={isMobile}
          sx={{
            order: { xs: 2, sm: 1 },
            minHeight: { xs: 44, sm: 36 },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={loading || !isFormValid()}
          startIcon={
            loading ? <CircularProgress size={18} /> : <Mail size={18} />
          }
          fullWidth={isMobile}
          sx={{
            order: { xs: 1, sm: 2 },
            minHeight: { xs: 44, sm: 36 },
          }}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
