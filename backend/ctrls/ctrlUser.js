import Users from './../models/User.js';

const ctrlUser = {
  getUser: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('[GET USER]: Invalid id');
      res.sendStatus(400);
      return;
    }
    await Users.findById(req.params.id)
      .exec((err, User) => {
        if (err) {
          console.log('err: ', err);
          res.send(err.message);
        } else if (!User) {
          console.log('not user');
          res.sendStatus(404);
        } else {
          console.log('user: ', User);
          res.send(User);
        }
        next();
      });
  },
  getUserLikedShops: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('[GET USER]: Invalid id');
      res.sendStatus(400);
      return;
    }
    await Users.findById(req.params.id)
      .populate({ path: 'Shop', select: '_id Name' })
      .exec((err, User) => {
        if (err) {
          res.send(err.message);
        } else if (!User) {
          res.sendStatus(404);
        } else {
          res.send(User);
        }
        next();
      });
  },
  addUser: async (req, res, next) => {
    await (new Users(req.body)).save((err, newUser) => {
      if (err) {
        res.send(err.message);
      } else if (!newUser) {
        res.sendStatus(404);
      } else {
        res.send(newUser);
      }
      next();
    });
  }
};

export default ctrlUser;
