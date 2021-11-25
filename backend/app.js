import { MongoClient } from 'mongodb';

// Connect to the db
MongoClient.connect('mongodb://localhost:27017/Shops', (err, db) => {
  if (err) throw err;
});
