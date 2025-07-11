const connectToDatabase = require('./mongodb');
const bcrypt = require('bcryptjs'); // Use bcryptjs for Netlify compatibility

function validatePasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValidLength = password.length >= 8 && password.length <= 20;
  return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
}

exports.handler = async (event, context) => {
    try {
        const db = await connectToDatabase(process.env.MONGO_URI);
        const usersCollection = db.collection('users');

        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }

        let { email, password, username } = JSON.parse(event.body);
        if (!email || !password || !username) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Email, password, and username are required.' }) };
        }
        email = email.trim().toLowerCase();
        if (!validatePasswordStrength(password)) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Password must be 8-20 characters long and include uppercase, lowercase, and a number.' }) };
        }
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return { statusCode: 400, body: JSON.stringify({ error: 'User already exists.' }) };
        }
        const saltRounds = 10;
        // Double hash: hash, then hash again with new salt
        const firstHash = await bcrypt.hash(password, saltRounds);
        const doubleHashedPassword = await bcrypt.hash(firstHash, saltRounds);
        const adminEmails = process.env.ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase());
        const role = adminEmails.includes(email) ? 'admin' : 'user';
        // Store user data
        const newUser = {
            email,
            passwordFirstHash: firstHash,
            passwordDoubleHash: doubleHashedPassword,
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