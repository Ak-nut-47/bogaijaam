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
            const trip = await tripsCollection.findOne({ _id: ObjectId(id) });

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
            // If no id is provided, return all trips
            const trips = await tripsCollection.find({}).toArray();

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
