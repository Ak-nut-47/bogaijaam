// netlify/functions/editItinerary.js
const connectToDatabase = require('./mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const db = await connectToDatabase(process.env.MONGODB_URI);
        const collection = db.collection('itineraries');

        const data = JSON.parse(event.body);
        const { itineraryId, ...updateFields } = data;
        delete updateFields._id; // Prevent immutable _id update

        // Convert string dates to Date objects
        if (updateFields.dailySchedule) {
            updateFields.dailySchedule = updateFields.dailySchedule.map(day => ({
                ...day,
                date: day.date ? new Date(day.date) : null
            }));
        }
        if (updateFields.lastUpdated) {
            updateFields.lastUpdated = new Date(updateFields.lastUpdated);
        }

        const result = await collection.findOneAndUpdate(
            { _id: new (require('mongodb').ObjectId)(itineraryId) },
            { $set: updateFields },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Itinerary not found' })
            };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result.value)
        };
    } catch (error) {
        console.error('EditItinerary Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};
