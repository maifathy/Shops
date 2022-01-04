import Users from './../models/User.js';

const ctrlUser = {
  getUser: async (req, res, next) => {
    await Users.findOne(
      { Name: req.body.username, Password: req.body.password },
      'Name Email _id Location'
    )
      .exec((err, User) => {
        if (err) {
          res.send(err.message);
        } else if (!User) {
          res.status(404).json({ status: 404, message: 'Wrong username or password, please try again!!' });
        } else {
          res.json({ status: 200, message: 'User is successfully loaded', user: User });
        }
        next();
      });
  },
  getUserLikedShops: async (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
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
