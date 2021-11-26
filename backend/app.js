import express from 'express';
import bodyParser from 'body-parser';
import routeUser from './routes/routeUser.js';
import mongoUtil from './utils/dbHandler.js';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1000;

const insertRow = async (id, name, collection) => {
  const coll = mongoUtil.getDB().collection(collection);
  let insertRes;
  if (collection === 'Shop') {
    insertRes = await coll.insertOne({
      id: id,
      name: name
    });
  } else {
    insertRes = await coll.insertOne({
      id: id,
      name: name,
      password: name
    });
  }
  if (!insertRes.acknowledged) {
    console.log({ ok: false, msg: 'Account creation failed.' });
  } else {
    console.log({ ok: true, msg: 'Account has been created.' });
  }
  return insertRes.acknowledged;
};

// Connect to the db
mongoUtil.connect((err) => {
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected on port 27017.');
  }
  // insert default data
  insertRow(1, 'Shop 1', 'Shop');
  insertRow(2, 'Shop 2', 'Shop');
  insertRow(3, 'Shop 3', 'Shop');
  insertRow(1, 'admin', 'User');
  app.use(bodyParser.json());
  app.use('/api/v1', router);
  routeUser(router);

  app.listen(port, () => {
    console.log(`Nearby Shops API v1 on port: ${port}`);
  });
});
