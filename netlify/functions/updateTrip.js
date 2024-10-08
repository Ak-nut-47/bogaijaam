// netlify/functions/updateTrip.js
const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    const { id, updateFields } = JSON.parse(event.body);

    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('trips');

        const result = await tripsCollection.updateOne(
            { _id: new ObjectId(id) },  // Use 'new' when creating the ObjectId
            { $set: updateFields }
        );


        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Trip updated successfully', result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to update trip', error: error.message }),
        };
    }
};
