// netlify/functions/getItinerary.js
const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const itinerariesCollection = db.collection('itineraries');

        // Check if an id is passed in the query string
        const { id } = event.queryStringParameters || {};
        console.log("ID in netlify Function is _____", id)

        if (id) {
            // If an id is provided, find the itinerary by its id
            // const itinerary = await itinerariesCollection.findOne({ _id: ObjectId(id) });
            const itinerary = await itinerariesCollection.findOne({ tripId: id });
            console.log("Itinerary is _____", itinerary)
            if (!itinerary) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Itinerary with id ${id} not found` }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify(itinerary),
            };
        } else {
            // If no id is provided, return all itineraries
            const itineraries = await itinerariesCollection.find({}).toArray();

            return {
                statusCode: 200,
                body: JSON.stringify(itineraries),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to retrieve itineraries', error: error.message }),
        };
    }
};
