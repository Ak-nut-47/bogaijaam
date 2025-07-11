const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const connectToDatabase = require('./mongodb');

function validatePasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isValidLength = password.length >= 8 && password.length <= 20;
  return hasUpperCase && hasLowerCase && hasNumber && isValidLength;
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    let { email, newPassword, token } = JSON.parse(event.body);
    if (email) email = email.trim().toLowerCase();

    // If only email is provided, send reset link
    if (email && !newPassword && !token) {
        try {
            const db = await connectToDatabase(process.env.MONGODB_URI);
            const users = db.collection('users');
            const user = await users.findOne({ email });
            if (!user) {
                return {
                    statusCode: 404,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: 'User not found' })
                };
            }
            // Generate token and expiry
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 min
            await users.updateOne(
                { email },
                { $set: { resetToken, resetTokenExpiry } }
            );

            console.log("process.env.EMAIL_USER===============>>>>>>>>>>>>>>>>>>>>>>", process.env.EMAIL_USER)
            // Send email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.APP_PASSWORD
                }
            });
            const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8888'}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`
            });
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Reset email sent' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    // If token and newPassword are provided, reset password
    if (email && newPassword && token) {
        try {
            if (!validatePasswordStrength(newPassword)) {
                return {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: 'Password must be 8-20 characters long and include uppercase, lowercase, and a number.' })
                };
            }
            const db = await connectToDatabase(process.env.MONGODB_URI);
            const users = db.collection('users');
            const user = await users.findOne({ email, resetToken: token });
            if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
                return {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: 'Invalid or expired token' })
                };
            }
            const saltRounds = 10;
            const firstHash = await bcrypt.hash(newPassword, saltRounds);
            const doubleHashedPassword = await bcrypt.hash(firstHash, saltRounds);
            await users.updateOne(
                { email },
                { $set: { passwordFirstHash: firstHash, passwordDoubleHash: doubleHashedPassword }, $unset: { resetToken: '', resetTokenExpiry: '' } }
            );
            // Optionally: send confirmation email
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.APP_PASSWORD
                    }
                });
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Password Reset Successful',
                    html: `<p>Your password has been reset successfully.</p>`
                });
            } catch (mailError) {
                // Log but don't fail the reset if email fails
                console.error('Password reset confirmation email failed:', mailError);
            }
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Password reset successful' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: error.message })
            };
        }
    }

    return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid request' })
    };
};
