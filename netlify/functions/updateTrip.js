const connectToDatabase = require('./mongodb');
const { ObjectId } = require('mongodb');

exports.handler = async (event) => {
    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    try {
        const { id, _id, ...updateFields } = JSON.parse(event.body);

        if (!ObjectId.isValid(id)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid ID format' }),
            };
        }

        if (Object.keys(updateFields).length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'No fields provided to update' }),
            };
        }

        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('tours');

        const result = await tripsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields },
            { upsert: false }
        );

        if (result.matchedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Trip not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Trip updated successfully',
                modifiedCount: result.modifiedCount,
            }),
        };
    } catch (error) {
        console.error('Error updating trip:', {
            error: error.message,
            requestBody: event.body,
        });

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to update trip',
                error: error.message,
            }),
        };
    }
};
