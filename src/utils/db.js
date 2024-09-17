const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client;
  } catch (e) {
    throw new Error("Ошибка подключения к MongoDB");
  }
}

module.exports = connectToDatabase;


