import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Button,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

const Footer = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: { xs: 2, sm: 3 },
        mt: { xs: 6, sm: 8 },
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {/* Desktop/Tablet Layout */}
        {!isMobile ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
            sx={{ minHeight: 48 }}
          >
            {/* Left: Copyright */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontSize: { sm: "0.875rem", md: "0.875rem" },
                whiteSpace: "nowrap",
              }}
            >
              © {new Date().getFullYear()} Bogaijaam. All rights reserved.
            </Typography>

            {/* Center: Contact Links */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ flex: 1, justifyContent: "center" }}
            >
              <Link
                href="mailto:info@bogaijaam.com"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Mail size={16} style={{ marginRight: 6 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  info@bogaijaam.com
                </Typography>
              </Link>

              <Link
                href="tel:+911234567890"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Phone size={16} style={{ marginRight: 6 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  +91 12345 67890
                </Typography>
              </Link>

              <Link
                href="https://instagram.com/bogaijaam"
                target="_blank"
                rel="noopener"
                color="inherit"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Instagram size={16} style={{ marginRight: 6 }} />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Instagram
                </Typography>
              </Link>
            </Stack>

            {/* Right: Contact Button */}
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                borderRadius: 3,
                fontWeight: 600,
                boxShadow: 1,
                px: 3,
                py: 1,
                minWidth: 140,
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
              }}
              startIcon={<MessageCircle size={18} />}
              onClick={() => setContactOpen(true)}
            >
              Contact Us
            </Button>
          </Stack>
        ) : (
          /* Mobile Layout - Compact */
          <Stack spacing={2} alignItems="center">
            {/* Top Row: Contact Links in horizontal layout */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%" }}
            >
              <IconButton
                component={Link}
                href="mailto:info@bogaijaam.com"
                size="small"
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                  transition: "all 0.2s",
                }}
              >
                <Mail size={18} />
              </IconButton>

              <IconButton
                component={Link}
                href="tel:+911234567890"
                size="small"
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                  transition: "all 0.2s",
                }}
              >
                <Phone size={18} />
              </IconButton>

              <IconButton
                component={Link}
                href="https://instagram.com/bogaijaam"
                target="_blank"
                rel="noopener"
                size="small"
                sx={{
                  bgcolor: "action.hover",
                  "&:hover": { bgcolor: "action.selected" },
                  transition: "all 0.2s",
                }}
              >
                <Instagram size={18} />
              </IconButton>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  boxShadow: 1,
                  px: 2,
                  py: 0.5,
                  minWidth: 100,
                  fontSize: "0.75rem",
                }}
                startIcon={<MessageCircle size={16} />}
                onClick={() => setContactOpen(true)}
              >
                Contact
              </Button>
            </Stack>

            {/* Bottom Row: Copyright */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontSize: "0.75rem",
                textAlign: "center",
                opacity: 0.8,
              }}
            >
              © {new Date().getFullYear()} Bogaijaam. All rights reserved.
            </Typography>
          </Stack>
        )}
      </Container>
      <ContactForm open={contactOpen} onClose={() => setContactOpen(false)} />
    </Box>
  );
};

export default Footer;
