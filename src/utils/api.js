// src/utils/api.js
import axios from 'axios';

// Fetch all trips
export const getTrips = async () => {
    try {
        const response = await axios.get('/.netlify/functions/getTrips');
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
        return null;
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
        const response = await axios.post(`/.netlify/functions/addTrip`, newTrip);
        return response.data;
    } catch (error) {
        console.error('Failed to add new trip', error);
        return null;
    }
};
