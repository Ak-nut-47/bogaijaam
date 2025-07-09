// netlify/functions/addItinerary.js
const connectToDatabase = require('./mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
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

        // Convert string dates to Date objects
        if (data.dailySchedule) {
            data.dailySchedule = data.dailySchedule.map(day => ({
                ...day,
                date: day.date ? new Date(day.date) : null
            }));
        }
        if (data.lastUpdated) {
            data.lastUpdated = new Date(data.lastUpdated);
        }

        const result = await collection.insertOne(data);

        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: result.insertedId })
        };
    } catch (error) {
        console.error('AddItinerary Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};