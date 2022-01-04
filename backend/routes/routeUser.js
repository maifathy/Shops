import ctrl from '../ctrls/ctrlUser.js';

export default (router) => {
  /** save a User */
  router
    .route('/Users')
    .post(ctrl.addUser);

  /** get a User */
  router
    .route('/Users/Login')
    .put(ctrl.getUser);

  /** get a User with Shops */
  router
    .route('/Users/Shops/:id')
    .get(ctrl.getUserLikedShops);
};
