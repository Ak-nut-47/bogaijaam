// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from "./pages/Homepage";
import TripTable from "./pages/TripTable";
import EditTrip from "./pages/EditTrip";
import AddTrip from "./pages/AddTrip";
import theme from './theme';
import ItineraryPage from './pages/ItineraryPage';
import AddItineraryPage from './pages/AddItineraryPage';
import ProtectedRoute from './components/ProtectedRoute.js';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protecting the admin routes */}
          <Route
            path="/trips"
            element={
              <ProtectedRoute requiredRole="admin">
                <TripTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <EditTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddTrip />
              </ProtectedRoute>
            }
          />
          <Route path="/itinerary/:id" element={<ItineraryPage />} />
          <Route
            path="/add/itinerary"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddItineraryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
