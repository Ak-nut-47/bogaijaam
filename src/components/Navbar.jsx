import React, { useState } from "react";
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
import FlightIcon from "@mui/icons-material/Flight";
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
import { useNavigate, useLocation } from "react-router-dom";
const logo = require("../assets/logo.png");
const Navbar = () => {
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
        <ListItem button component={Link} to="/trips">
          <ListItemIcon>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText primary="Trips" />
        </ListItem>
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
          top: 0, // Ensures it sticks at the top
          zIndex: 2, // Ensures it's above other content, you can adjust the value
        }}
      >
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{
              maxWidth: "55px",
              objectFit: "contain",
              cursor: location.pathname === "/" ? "default" : "pointer", // Change pointer style
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Space between items
              width: "100%", // Full width
              padding: 2, // Optional padding
              flexDirection: { xs: "row-reverse", md: "row" },
            }}
          >
            <Box></Box>

            <Box sx={{ display: { xs: "none", md: "block", ml: "auto" } }}>
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
              <Button
                color="inherit"
                component={Link}
                to="/trips"
                startIcon={<FlightIcon />}
              >
                Trips
              </Button>
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
              <Button
                color="inherit"
                onClick={handleOpen}
                startIcon={<LoginIcon />}
              ></Button>
            </Box>
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
