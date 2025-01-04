// src/utils/api.js
import axios from 'axios';

// Fetch all trips
export const getTrips = async () => {
    // Try to get cached trips from sessionStorage
    const cachedTrips = sessionStorage.getItem('trips');
    if (cachedTrips) {
        return JSON.parse(cachedTrips); // Return cached data if it exists
    }
    try {
        const response = await axios.get('/.netlify/functions/getTrips');
        // Cache the fetched trips in sessionStorage
        sessionStorage.setItem('trips', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Failed to fetch trips', error);
        return [];
    }
};

// Fetch trip by ID
export const getTripById = async (id) => {
    console.log("id is _______", id)
    try {
        const response = await axios.get(`/.netlify/functions/getTripById`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch trip with id: ${id}`, error);
        return null;
    }
};

// Update trip by ID
export const updateTrip = async (id, updatedTrip) => {
    try {
        const response = await axios.put(`/.netlify/functions/updateTrip`, {
            id,
            ...updatedTrip
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update trip with id: ${id}`, error);

        // Ensure error messages from the response are passed back to the caller
        if (error.response && error.response.data) {
            // Extract the error message from the response
            throw new Error(error.response.data.message || 'An error occurred while updating the trip');
        }

        // Handle case for network errors or other issues
        throw new Error('An error occurred while updating the trip');
    }
};


// Delete trip by ID
export const deleteTrip = async (id) => {
    try {
        const response = await axios.delete(`/.netlify/functions/deleteTrip`, {
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete trip with id: ${id}`, error);
        return null;
    }
};

// Add a new trip
export const addTrip = async (newTrip) => {
    try {
        const response = await axios.post(`/.netlify/functions/createTrip`, newTrip);
        return response.data;
    } catch (error) {
        console.error('Failed to add new trip', error);
        return null;
    }
};
