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

  /** get a Prefered Shops */
  router
    .route('/Shops/Prefered/:id/:page')
    .get(ctrl.getLikedShops);

  /** dislike a shop */
  router
    .route('/Shop/Dislike/:id')
    .put(ctrl.dislikeShop);

  /** like a shop */
  router
    .route('/Shop/Like/:id')
    .put(ctrl.likeShop);
};
