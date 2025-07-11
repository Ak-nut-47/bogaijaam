import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HikingIcon from "@mui/icons-material/Hiking";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import NatureIcon from "@mui/icons-material/Nature";
import CabinIcon from "@mui/icons-material/Cabin";
import ExploreIcon from "@mui/icons-material/Explore";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ForestIcon from "@mui/icons-material/Forest";
import TerrainIcon from "@mui/icons-material/Terrain";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import SignInSignUpModal from "./SignInSignUpModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
const logo = require("../assets/logo.png");

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adventureOpen, setAdventureOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleAdventureClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdventureClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerAdventureClick = (event) => {
    event.stopPropagation();
    setAdventureOpen(!adventureOpen);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {isAdmin && (
          <ListItem button component={Link} to="/trips">
            <ListItemIcon>
              <ShieldCheck />
            </ListItemIcon>
            <ListItemText primary="Trips" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/bookings">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Bookings" />
        </ListItem>
        <ListItem button component={Link} to="/upcoming-events">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Upcoming Events" />
        </ListItem>

        <ListItem button onClick={handleDrawerAdventureClick}>
          <ListItemIcon>
            <HikingIcon />
          </ListItemIcon>
          <ListItemText primary="Adventure Programs" />
          {adventureOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={adventureOpen} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            // onClick={(e) => e.stopPropagation()}
          >
            <ListItem
              button
              component={Link}
              to="/group-expeditions"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Group Expeditions" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/educational-outings"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Educational Outings" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/outdoor-learning"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <NatureIcon />
              </ListItemIcon>
              <ListItemText primary="Outdoor Learning" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/adventure-retreats"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <CabinIcon />
              </ListItemIcon>
              <ListItemText primary="Adventure Retreats" />
            </ListItem>
            <ListItem button component={Link} to="/field-trips" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Field Trips" />
            </ListItem>
            <ListItem button component={Link} to="/nature-camps" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ForestIcon />
              </ListItemIcon>
              <ListItemText primary="Nature Camps" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/experiential-education"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Experiential Education" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/wilderness-excursions"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <TerrainIcon />
              </ListItemIcon>
              <ListItemText primary="Wilderness Excursions" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/educational-adventures"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <LandscapeIcon />
              </ListItemIcon>
              <ListItemText primary="Educational Adventures" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/outdoor-explorations"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Outdoor Explorations" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cave-exploration"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <HikingIcon />
              </ListItemIcon>
              <ListItemText primary="Cave Exploration" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.primary.main,
          top: 0,
          zIndex: 2,
        }}
      >
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{
              maxWidth: "55px",
              objectFit: "contain",
              cursor: location.pathname === "/" ? "default" : "pointer",
            }}
            onClick={handleLogoClick}
          />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            {isAdmin && (
              <Button
                color="inherit"
                component={Link}
                to="/trips"
                startIcon={<ShieldCheck />}
              >
                Admin Panel
              </Button>
            )}
            <Button
              color="inherit"
              component={Link}
              to="/bookings"
              startIcon={<EventIcon />}
            >
              Bookings
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/upcoming-events"
              startIcon={<CalendarTodayIcon />}
            >
              Upcoming Events
            </Button>
            <Button
              color="inherit"
              onClick={handleAdventureClick}
              aria-controls="adventure-menu"
              aria-haspopup="true"
              startIcon={<HikingIcon />}
            >
              Adventure Programs{" "}
              {Boolean(anchorEl) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
            <Menu
              id="adventure-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAdventureClose}
            >
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/group-expeditions"
              >
                <GroupIcon sx={{ mr: 1 }} /> Group Expeditions
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/educational-outings"
              >
                <SchoolIcon sx={{ mr: 1 }} /> Educational Outings
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/outdoor-learning"
              >
                <NatureIcon sx={{ mr: 1 }} /> Outdoor Learning
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/adventure-retreats"
              >
                <CabinIcon sx={{ mr: 1 }} /> Adventure Retreats
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/field-trips"
              >
                <ExploreIcon sx={{ mr: 1 }} /> Field Trips
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/nature-camps"
              >
                <ForestIcon sx={{ mr: 1 }} /> Nature Camps
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/experiential-education"
              >
                <PublicIcon sx={{ mr: 1 }} /> Experiential Education
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/wilderness-excursions"
              >
                <TerrainIcon sx={{ mr: 1 }} /> Wilderness Excursions
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/educational-adventures"
              >
                <LandscapeIcon sx={{ mr: 1 }} /> Educational Adventures
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/outdoor-explorations"
              >
                <ExploreIcon sx={{ mr: 1 }} /> Outdoor Explorations
              </MenuItem>
              <MenuItem
                onClick={handleAdventureClose}
                component={Link}
                to="/cave-exploration"
              >
                <HikingIcon sx={{ mr: 1 }} /> Cave Exploration
              </MenuItem>
            </Menu>

            {/* Auth/User Actions */}
            {isAuthenticated ? (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    cursor: "default",
                    pr: 1,
                    width: 40,
                    height: 40,
                    minWidth: 0,
                    borderRadius: "50%",
                    bgcolor: (theme) => theme.palette.grey[200],
                    color: (theme) => theme.palette.primary.main,
                    fontSize: 18,
                  }}
                  disableRipple
                  disableFocusRipple
                  startIcon={null}
                >
                  {user?.name ? (
                    user.name
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase())
                      .join("")
                      .slice(0, 2)
                  ) : (
                    <GroupIcon />
                  )}
                </Button>
                <IconButton
                  color="inherit"
                  onClick={logout}
                  sx={{ ml: 0.5 }}
                  aria-label="Logout"
                  title="Logout"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                </IconButton>
              </Box>
            ) : (
              <Button
                color="inherit"
                onClick={handleOpen}
                startIcon={<LoginIcon />}
                sx={{ ml: 2, fontWeight: 600 }}
              >
                Sign In / Up
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <SignInSignUpModal open={open} handleClose={handleClose} />
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Navbar;
