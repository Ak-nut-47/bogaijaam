const connectToDatabase = require('./mongodb');
const bcrypt = require('bcryptjs'); // Replace with bcryptjs
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const usersCollection = db.collection('users');

        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { email, password } = JSON.parse(event.body);

        // Basic validation
        if (!email || !password) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email and password are required.' }) };
        }

        // Convert email to lowercase for case-insensitive comparison
        const lowercaseEmail = email.toLowerCase();

        // Check if the user exists
        const user = await usersCollection.findOne({ email: lowercaseEmail });

        if (!user) {
            return { statusCode: 400, body: JSON.stringify({ error: 'User not found.' }) };
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Incorrect password.' }) };
        }

        // Create JWT token
        const token = jwt.sign(
            { email: user.email, role: user.role }, // Payload
            process.env.JWT_SECRET, // Secret key from environment variable
            { expiresIn: '7d' } // Token expiration time
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Login successful',
                username: user.username,
                token, // Include the token in the response
            }),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.toString() }),
        };
    }
};