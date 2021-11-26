import { MongoClient } from 'mongodb';

var db;

const mongoUtil = {
  connect: async (callback) => {
    await MongoClient.connect('mongodb://localhost:27017/Shops', (err, client) => {
      db = client.db('Shops');
      return callback(err);
    });
  },
  getDB: () => {
    return db;
  }
};

export default mongoUtil;
