import ctrl from '../ctrls/ctrlUser.js';

export default (router) => {
  /** save a User */
  router
    .route('/User')
    .post(ctrl.addUser);

  /** get a User */
  router
    .route('/User/:id')
    .get(ctrl.getUser);

  /** get a User with Shops */
  router
    .route('/UserShops/:id')
    .get(ctrl.getUserLikedShops);
};
