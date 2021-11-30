import express from 'express';
import cors from 'cors';

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
  app.use(cors());
  /* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }); */
  app.use('/api/v1', router);
  routeUser(router);
  routeShop(router);
  // insert default data
  insertRow(1, 'Toddlers', 'Shop', 31.218526816898795, 29.96310721308271);
  insertRow(2, 'Grocer', 'Shop', 31.21126696951743, 29.95981149845516);
  insertRow(3, 'Al-Fahd', 'Shop', 31.21978070040207, 29.95981149373145);
  insertRow(1, 'Mai', 'User', 31.207708408647015, 29.968096121791707);
});
