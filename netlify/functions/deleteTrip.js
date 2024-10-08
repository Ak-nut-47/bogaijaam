// netlify/functions/deleteTrip.js
const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'DELETE') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    const { id } = JSON.parse(event.body);

    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('trips');

        const result = await tripsCollection.deleteOne({ _id: ObjectId(id) });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Trip deleted successfully', result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete trip', error: error.message }),
        };
    }
};
