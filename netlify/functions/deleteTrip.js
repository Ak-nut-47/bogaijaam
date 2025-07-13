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

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Trip ID is required' }),
        };
    }

    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('trips');

        const result = await tripsCollection.deleteOne({ _id: new ObjectId(id) });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: result.deletedCount > 0 ? 'Trip deleted successfully' : 'Trip not found',
                result
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete trip', error: error.message }),
        };
    }
};
