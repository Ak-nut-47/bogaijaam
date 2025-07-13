// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from "./pages/Homepage";
import TripTable from "./pages/TripTable";
import TripForm from "./pages/TripForm";
import theme from './theme';
import ItineraryPage from './pages/ItineraryPage';
import AddItineraryPage from './pages/AddItineraryPage';
import ProtectedRoute from './components/ProtectedRoute.js';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ContactAdminPage from "./pages/ContactAdminPage";

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
                <TripForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute requiredRole="admin">
                <TripForm />
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
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/admin/contact-queries"
            element={
              <ProtectedRoute requiredRole="admin">
                <ContactAdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
