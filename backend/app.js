import express from 'express';
import bodyParser from 'body-parser';
import routeUser from './routes/routeUser.js';
import routeShop from './routes/routeShop.js';
import mongoUtil from './utils/dbHandler.js';
import { insertRow } from './utils/helpers.js';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`Nearby Shops API v1 on port: ${port}`);
});

// Connect to the db
mongoUtil.connect(() => {
  app.use(bodyParser.json());
  app.use('/api/v1', router);
  routeUser(router);
  routeShop(router);
  // insert default data
  insertRow(1, 'Shop 1', 'Shop');
  insertRow(2, 'Shop 2', 'Shop');
  insertRow(3, 'Shop 4', 'Shop');
  insertRow(1, 'newAdmin', 'User');
});
