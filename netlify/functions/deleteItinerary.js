// netlify/functions/deleteItinerary.js
const connectToDatabase = require('./mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    let itineraryId;
    try {
        const body = event.body ? JSON.parse(event.body) : {};
        itineraryId = body.itineraryId;
        if (!itineraryId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing itineraryId' }),
            };
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request body' }),
        };
    }

    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const itinerariesCollection = db.collection('itineraries');
        // Find the itinerary before deleting to get the tripId
        const itinerary = await itinerariesCollection.findOne({ _id: new (require('mongodb').ObjectId)(itineraryId) });
        const result = await itinerariesCollection.deleteOne({ _id: new (require('mongodb').ObjectId)(itineraryId) });
        if (result.deletedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Itinerary not found' }),
            };
        }
        // Remove itineraryId from the trip if it matches
        if (itinerary && itinerary.tripId) {
            const db = await connectToDatabase(process.env.MONGO_URI);
            const tripsCollection = db.collection('tours');
            await tripsCollection.updateOne(
                { _id: new (require('mongodb').ObjectId)(itinerary.tripId), itineraryId: itineraryId },
                { $unset: { itineraryId: "" } }
            );
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Itinerary deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete itinerary', error: error.message }),
        };
    }
};
