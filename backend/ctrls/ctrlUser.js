import Users from './../models/User.js';

const ctrlUser = {
  getUser: async (req, res, next) => {
    const response = await Users.findById(req.params.id)
      .exec((err, User) => {
        if (err) {
          console.log('err: ', err);
          res.send(err);
        } else if (!User) {
          console.log('not user');
          res.sendStatus(404);
        } else {
          console.log('user: ', User);
          res.send(User);
        }
        next();
      });
    return response;
  },
  getUserLikedShops: async (req, res, next) => {
    const response = await Users.findById(req.params.id)
      .populate({ path: 'Shop', select: '_id Name' })
      .exec((err, User) => {
        if (err) {
          res.send(err);
        } else if (!User) {
          res.sendStatus(404);
        } else {
          res.send(User);
        }
        next();
      });
    return response;
  },
  addUser: (req, res, next) => {
    return (new Users(req.body)).save((err, newUser) => {
      if (err) {
        res.send(err);
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
