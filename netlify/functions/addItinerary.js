// netlify/functions/addItinerary.js
const { MongoClient, ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        const db = client.db('your_database_name');
        const collection = db.collection('itineraries');

        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const data = JSON.parse(event.body);

        // Convert string dates to Date objects
        if (data.dailySchedule) {
            data.dailySchedule = data.dailySchedule.map(day => ({
                ...day,
                date: new Date(day.date)
            }));
        }
        if (data.lastUpdated) {
            data.lastUpdated = new Date(data.lastUpdated);
        }

        // Convert string IDs to ObjectId
        if (data.tripId) {
            data.tripId = new ObjectId(data.tripId);
        }

        const result = await collection.insertOne(data);

        return {
            statusCode: 201,
            body: JSON.stringify({ id: result.insertedId })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    } finally {
        await client.close();
    }
};