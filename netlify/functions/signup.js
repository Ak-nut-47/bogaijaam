const connectToDatabase = require('./mongodb');
const bcrypt = require('bcrypt');

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const usersCollection = db.collection('users');

        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        const { email, password, username } = JSON.parse(event.body);

        if (!email || !password || !username) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email, password, and username are required.' }) };
        }


        const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return { statusCode: 400, body: JSON.stringify({ error: 'User already exists.' }) };
        }


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const adminEmails = process.env.ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase());
        const role = adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';

        // Store user data
        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            username,
            role,
            createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User created successfully', id: result.insertedId }),
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.toString() }),
        };
    }
};
