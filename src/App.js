// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from "./pages/Homepage"
import TripTable from "./pages/TripTable";
import EditTrip from "./pages/EditTrip";
import AddTrip from "./pages/AddTrip";
import theme from './theme';
import ItineraryPage from './pages/ItineraryPage';
import AddItineraryPage from './pages/AddItineraryPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripTable />} />
          <Route path="/edit/:id" element={<EditTrip />} />
          <Route path="/add" element={<AddTrip />} />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route path="/add/itinerary" element={<AddItineraryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;