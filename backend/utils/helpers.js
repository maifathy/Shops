import Users from './../models/User.js';
import Shops from './../models/Shop.js';

export const insertRow = async (id, name, collection) => {
  let insertRes;
  if (collection === 'Shop') {
    insertRes = await new Shops(
      {
        Name: name
      }
    )
      .save((err) => { if (err) { console.log('error adding shop: ', err.message); } });
  } else {
    insertRes = await new Users(
      {
        Name: name,
        Password: `${name}@A123`,
        Email: `${name}@gmail.com`
      }
    )
      .save((err) => { if (err) { console.log('error adding user: ', err.message); } });
  }
  return insertRes;
};
