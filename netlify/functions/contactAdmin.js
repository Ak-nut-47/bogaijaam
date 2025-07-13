const connectToDatabase = require('./mongodb');

exports.handler = async function(event) {
  const db = await connectToDatabase(process.env.MONGO_URI);
  const queriesCollection = db.collection('queries');

  if (event.httpMethod === 'GET') {
    // Fetch all contact queries, newest first
    const queries = await queriesCollection.find({}).sort({ createdAt: -1 }).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(queries),
    };
  }

  if (event.httpMethod === 'DELETE') {
    const { id } = JSON.parse(event.body || '{}');
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing id' }) };
    }
    await queriesCollection.deleteOne({ _id: require('mongodb').ObjectId(id) });
    return { statusCode: 200, body: JSON.stringify({ message: 'Deleted' }) };
  }

  return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
};
