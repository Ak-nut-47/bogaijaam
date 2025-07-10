const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

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
        const { itineraryId, _id, ...updateFields } = data;
console.log('[editItinerary] itineraryId:', itineraryId, 'type:', typeof itineraryId);
console.log('[editItinerary] ObjectId.isValid:', ObjectId.isValid(itineraryId));
console.log('[editItinerary] updateFields:', updateFields);

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

        const query = { _id: new ObjectId(itineraryId) };
console.log('[editItinerary] Query:', query);
const result = await collection.findOneAndUpdate(
    query,
    { $set: updateFields },
    { returnDocument: 'after' }
);
console.log('[editItinerary] findOneAndUpdate result:', result);

        if (!result) {
            return {
                statusCode: 404,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Itinerary not found' })
            };
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error('[editItinerary] Error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: error.message, stack: error.stack })
        };
    }
};
