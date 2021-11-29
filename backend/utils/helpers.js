import Users from './../models/User.js';
import Shops from './../models/Shop.js';

let loc = { type: 'Point', coordinates: [] };

export const insertRow = async (id, name, collection, lon, lat) => {
  let insertRes;
  if (collection === 'Shop') {
    loc.coordinates = [lon, lat];
    insertRes = new Shops(
      {
        Name: name,
        Location: loc
      }
    );
    // insertRes.LikedByUsers.push('61a39ce307772a185e4a2024');
    await insertRes.save((err) => { if (err) { console.log('error adding shop: ', err.message); } });
  } else {
    insertRes = await new Users(
      {
        Name: name,
        Password: `${name}@A123`,
        Email: `${name}@gmail.com`,
        Location: loc
      }
    )
      .save((err) => { if (err) { console.log('error adding user: ', err.message); } });
  }
  return insertRes;
};
