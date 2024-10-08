const connectToDatabase = require('./mongodb');

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('tours');

        // Extract the ID from the query string
        const id = event.queryStringParameters.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Trip ID is required' }),
            };
        }

        const { ObjectId } = require('mongodb');

        // Use 'new' to create an instance of ObjectId
        const trip = await tripsCollection.findOne({ _id: new ObjectId(id) });

        if (!trip) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Trip not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(trip),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to retrieve trip', error: error.message }),
        };
    }
};
