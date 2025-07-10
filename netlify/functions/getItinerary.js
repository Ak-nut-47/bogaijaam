// netlify/functions/getItinerary.js
const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const itinerariesCollection = db.collection('itineraries');

        // Accept both itineraryId (Mongo _id) and id (tripId)
        const { itineraryId, id: tripId } = event.queryStringParameters || {};
        console.log("itineraryId:", itineraryId, "tripId:", tripId);

        if (itineraryId) {
            // Find by MongoDB _id
            let itinerary;
            try {
                if (!ObjectId.isValid(itineraryId)) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ message: 'Invalid itineraryId' }),
                    };
                }
                itinerary = await itinerariesCollection.findOne({ _id: new ObjectId(itineraryId) });
            } catch (e) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: `Invalid itineraryId` }),
                };
            }
            if (!itinerary) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Itinerary with itineraryId ${itineraryId} not found` }),
                };
            }
            return {
                statusCode: 200,
                body: JSON.stringify(itinerary),
            };
        } else if (tripId) {
            // Find by tripId
            const itinerary = await itinerariesCollection.findOne({ tripId: tripId });
            if (!itinerary) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: `Itinerary with tripId ${tripId} not found` }),
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
