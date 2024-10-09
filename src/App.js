
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from "./pages/Homepage"
import TripTable from "./pages/TripTable";
import EditTrip from "./pages/EditTrip";
import AddTrip from "./pages/AddTrip"; // New page for adding trips
import theme from './theme';

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