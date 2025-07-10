// netlify/functions/createTrip.js
const connectToDatabase = require('./mongodb');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    // Remove 'itinerary' from the request body to enforce separation
    const { tripName, location, difficultyLevel, duration, price, activities, inclusions, exclusions, imageUrls, rating, reviews, startDates, availability, coordinates } = JSON.parse(event.body);

    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const tripsCollection = db.collection('tours');

        const result = await tripsCollection.insertOne({
            tripName,
            location,
            difficultyLevel,
            duration,
            price,
            activities,
            // itinerary, // REMOVED: Itineraries are managed separately
            inclusions,
            exclusions,
            imageUrls,
            rating,
            reviews,
            startDates,
            availability,
            coordinates
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Trip created successfully', result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to create trip', error: error.message }),
        };
    }
};
