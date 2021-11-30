import Shops from './../models/Shop.js';
import mongoose from 'mongoose';

const ctrlShop = {
  getShop: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.sendStatus(400);
      return;
    }
    await Shops.findById(req.params.id)
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
    const coords = {
      type: 'Point',
      coordinates:
        [req.query.lon, req.query.lat]
    };
    const id = req.params.id;
    await Shops.find({ LikedByUsers: { $not: { $in: id } } })
      .where('Location')
      .near({ center: coords, maxDistance: 5000 })
      .skip(req.params.page * 12)
      .limit(12)
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
  getLikedShops: async (req, res, next) => {
    const coords = {
      type: 'Point',
      coordinates:
        [req.query.lon, req.query.lat]
    };
    const id = req.params.id;
    await Shops.find({ LikedByUsers: id })
      .where('Location')
      .near({ center: coords, maxDistance: 5000 })
      .skip(req.params.page * 12)
      .limit(12)
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
  },
  dislikeShop: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.sendStatus(400);
      return;
    }
    Shops.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $pull: { LikedByUsers: req.query.user_id } },
      { returnOriginal: false },
      (err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
        next();
      }
    );
  },
  likeShop: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.sendStatus(400);
      return;
    }
    Shops.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { LikedByUsers: req.query.user_id } },
      { returnOriginal: false },
      (err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          console.log('error: No shop');
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
        next();
      }
    );
  }
};

export default ctrlShop;
