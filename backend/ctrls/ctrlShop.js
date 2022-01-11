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
          res.json(Shop);
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
          res.json(Shop);
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
      .near({ center: coords })
      .skip((req.params.page - 1) * 12)
      .limit(12)
      .exec((err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.status(404).json({ status: 404, message: 'No Shops to show!!' });
        } else {
          res.json({ status: 200, message: 'Shops are successfully loaded', shops: Shop });
        }
        next();
      });
  },
  getLikedShops: async (req, res, next) => {
    const id = req.params.id;
    await Shops.find({ LikedByUsers: id })
      .skip((req.params.page - 1) * 12)
      .limit(12)
      .exec((err, Shop) => {
        if (err) {
          res.send(err.message);
        } else if (!Shop) {
          res.status(404).json({ status: 404, message: 'No Shops to show!!' });
        } else {
          res.json({ status: 200, message: 'Shops are successfully loaded', shops: Shop });
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
        res.json(newShop);
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
          res.status(404).json({ status: 404, message: 'An Error occurred, please try again!!' });
        } else {
          res.status(200).json({ status: 200, message: 'Shop is removed from Preferences successfully!', shop: Shop });
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
          res.status(404).json({ status: 404, message: 'An Error occurred, please try again!!' });
        } else {
          res.status(200).json({ status: 200, message: 'Shop is added to Preferences successfully!', shop: Shop });
        }
        next();
      }
    );
  }
};

export default ctrlShop;
