import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerItems = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/trips">
                    <ListItemText primary="Trips Table" />
                </ListItem>
                <ListItem button component={Link} to="/add">
                    <ListItemText primary="Add Trip" />
                </ListItem>
                <ListItem button component={Link} to="/edit-trip">
                    <ListItemText primary="Edit Trip" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Bogai Jaam Adventure
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/trips">Trips Table</Button>
                        <Button color="inherit" component={Link} to="/add">Add Trip</Button>
                        <Button color="inherit" component={Link} to="/edit-trip">Edit Trip</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerItems}
            </Drawer>
        </>
    );
};

export default Navbar;
