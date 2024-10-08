
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from "./pages/Homepage"
import TripTable from "./pages/TripTable";
import EditTrip from "./pages/EditTrip";
import AddTrip from "./pages/AddTrip"; // New page for adding trips

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripTable />} /> {/* New trips table */}
          <Route path="/edit/:id" element={<EditTrip />} /> {/* Edit page */}
          <Route path="/add" element={<AddTrip />} /> {/* Add page */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;