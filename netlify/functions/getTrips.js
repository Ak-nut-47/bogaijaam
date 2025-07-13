// netlify/functions/getTrips.js
const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('tours');

        // Check if an id is passed in the query string
        const { id } = event.queryStringParameters || {};

        if (id) {
            // If an id is provided, find the trip by its id
            const trip = await tripsCollection.findOne({ _id: new ObjectId(id) });

            if (!trip) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Trip with id ${id} not found` }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify(trip),
            };
        } else {
            // If no id is provided, return all trips WITH their itineraries
            const trips = await tripsCollection.find({}).toArray();
            const itinerariesCollection = db.collection('itineraries');

            // Fetch all itineraries in a single query
            const itineraries = await itinerariesCollection.find({}).toArray();

            // Build a map of tripId -> itinerary
            const itineraryMap = {};
            for (const itinerary of itineraries) {
                itineraryMap[itinerary.tripId] = itinerary;
            }

            // Attach itinerary to each trip
            for (const trip of trips) {
                trip.itinerary = itineraryMap[trip._id.toString()] || null;
            }

            return {
                statusCode: 200,
                body: JSON.stringify(trips),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to retrieve trips', error: error.message }),
        };
    }
};
