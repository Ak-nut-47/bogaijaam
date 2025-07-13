const nodemailer = require('nodemailer');
const connectToDatabase = require('./mongodb'); // reusing your db connection pattern

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  const {
    name,
    email,
    phone,
    tripInterest,
    preferredDates,
    groupSize,
    budget,
    message
  } = JSON.parse(event.body || '{}');

  if (!name || !email || !phone || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name, email, phone, and message are required.' })
    };
  }

  // Save to MongoDB using shared connection method
  try {
    const db = await connectToDatabase(process.env.MONGO_URI);
    const queriesCollection = db.collection('queries');
    await queriesCollection.insertOne({
      name,
      email,
      phone,
      tripInterest: tripInterest || '',
      preferredDates: preferredDates || '',
      groupSize: groupSize || '',
      budget: budget || '',
      message,
      createdAt: new Date()
    });
  } catch (err) {
    console.error('MongoDB Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to save message to database.' })
    };
  }

  // Setup Nodemailer with Gmail App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASSWORD
    }
  });

  const mailOptions = {
    from: `Bogaijaam Contact <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER || process.env.EMAIL_USER,
    subject: `New Contact Query from ${name}`,
    text:
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Trip of Interest: ${tripInterest || '-'}\n` +
      `Preferred Dates: ${preferredDates || '-'}\n` +
      `Group Size: ${groupSize || '-'}\n` +
      `Budget: ${budget || '-'}\n` +
      `Message: ${message}`,
    html: `<p><strong>Name:</strong> ${name}<br/>
      <strong>Email:</strong> ${email}<br/>
      <strong>Phone:</strong> ${phone}<br/>
      <strong>Trip of Interest:</strong> ${tripInterest || '-'}<br/>
      <strong>Preferred Dates:</strong> ${preferredDates || '-'}<br/>
      <strong>Group Size:</strong> ${groupSize || '-'}<br/>
      <strong>Budget:</strong> ${budget || '-'}<br/>
      <strong>Message:</strong><br/>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Query saved and email sent successfully!' })
    };
  } catch (err) {
    console.error('Email Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Query saved, but failed to send email.' })
    };
  }
};
