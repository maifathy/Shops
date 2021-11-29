import Shops from './../models/Shop.js';

const ctrlShop = {
  getShop: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('[GET SHOP]: Invalid id');
      res.sendStatus(400);
      return;
    }
    await Shops.findById(req.params.id)
      .exec((err, Shop) => {
        if (err) {
          console.log('err: ', err);
          res.send(err.message);
        } else if (!Shop) {
          res.sendStatus(404);
        } else {
          console.log('Shop: ', Shop);
          res.send(Shop);
        }
        next();
      });
  },
  getShops: async (req, res, next) => {
    await Shops.find({})
      .exec((err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.sendStatus(404);
        } else {
          res.send(Shop);
        }
        next();
      });
  },
  getNearShops: async (req, res, next) => {
    console.log('req.query: ', req.query.lon);
    const coords = {
      type: 'Point',
      coordinates:
        [req.query.lon, req.query.lat]
    };
    const id = req.params.id;
    await Shops.find({ LikedByUsers: id })
      .where('Location')
      .near({ center: coords, maxDistance: 5000 })
      .exec((err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.sendStatus(404);
        } else {
          console.log('Shops: ', Shop);
          res.send(Shop);
        }
        next();
      });
  },
  getLikedShops: async (req, res, next) => {
    await Shops.find({ LikedByUsers: { $exists: true, $not: { $size: 0 } } })
      .exec((err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.sendStatus(404);
        } else {
          res.send(Shop);
        }
        next();
      });
  },
  addShop: async (req, res, next) => {
    await (new Shops(req.body)).save((err, newShop) => {
      if (err) {
        res.send(err.message);
      } else if (!newShop) {
        res.sendStatus(404);
      } else {
        res.send(newShop);
      }
      next();
    });
  },
  deleteShop: async (req, res, next) => {
    await Shops.findByIdAndRemove(req.params.id, (err) => {
      if (err) res.send(err);
      else res.sendStatus(204);
      next();
    });
  }
};

export default ctrlShop;
