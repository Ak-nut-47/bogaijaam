// src/utils/api.js
import axios from 'axios';

// Send contact query
export const sendContactQuery = async (data) => {
  return axios.post('/.netlify/functions/contact', data);
};

// Get all contact queries (admin)
export const getContactQueries = async () => {
  const response = await axios.get('/.netlify/functions/contactAdmin');
  return response.data;
};

// Delete a contact query by ID (admin)
export const deleteContactQuery = async (id) => {
  const response = await axios.delete('/.netlify/functions/contactAdmin', {
    data: { id },
  });
  return response.data;
};

// Fetch all trips
export const getTrips = async () => {
    // Try to get cached trips from sessionStorage
    // const cachedTrips = sessionStorage.getItem('trips');
    // if (cachedTrips) {
    //     return JSON.parse(cachedTrips); // Return cached data if it exists
    // }
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
    // Remove any accidental 'itinerary' property from the update payload
    const { itinerary, ...tripData } = updatedTrip || {};
    try {
        const response = await axios.put(`/.netlify/functions/updateTrip`, {
            id,
            ...tripData
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
    // Remove any accidental 'itinerary' property from the new trip payload
    const { itinerary, ...tripData } = newTrip || {};
    try {
        const response = await axios.post(`/.netlify/functions/createTrip`, tripData);
        return response.data;
    } catch (error) {
        console.error('Failed to add new trip', error);
        return null;
    }
};

// Delete itinerary by ID
export const deleteItinerary = async (itineraryId) => {
    try {
        const response = await axios.delete('/.netlify/functions/deleteItinerary', {
            data: { itineraryId }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete itinerary with id: ${itineraryId}`, error);
        return null;
    }
};

// Fetch itinerary by ID
export const getItineraryById = async (itineraryId) => {
    try {
        const response = await axios.get('/.netlify/functions/getItinerary', {
            params: { itineraryId }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch itinerary with id: ${itineraryId}`, error);
        return null;
    }
};

// Edit itinerary by ID
export const editItinerary = async (itineraryId, updatedData) => {
    try {
        const payload = { itineraryId, ...updatedData };
        console.log('[api.js] Sending to editItinerary:', payload);
        const response = await axios.put('/.netlify/functions/editItinerary', payload);
        console.log('[api.js] editItinerary response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`[api.js] Failed to update itinerary with id: ${itineraryId}`, error);
        if (error.response) {
            console.error('[api.js] editItinerary error response:', error.response.data);
        }
        return null;
    }
};
