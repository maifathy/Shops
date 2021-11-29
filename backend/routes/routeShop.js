import ctrl from '../ctrls/ctrlShop.js';

export default (router) => {
  /** save a Shop */
  router
    .route('/Shop')
    .post(ctrl.addShop);

  /** delete a Shop */
  router
    .route('/Shop/Remove')
    .delete(ctrl.deleteShop);

  /** get a Shop */
  router
    .route('/Shop/:id')
    .get(ctrl.getShop);

  /** get all Shops */
  router
    .route('/Shops')
    .get(ctrl.getShops);

  /** get near Shops */
  router
    .route('/Shops/Near/:id/:page')
    .get(ctrl.getNearShops);

  /** get a Shop with Shops */
  router
    .route('/Shops/Like/:id/:page')
    .get(ctrl.getLikedShops);

  /** dislike a shop */
  router
    .route('/Shop/Dislike/:id')
    .get(ctrl.dislikeShop);

  /** like a shop */
  router
    .route('/Shop/Like/:id')
    .get(ctrl.likeShop);
};
