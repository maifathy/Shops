import ctrl from '../ctrls/ctrlShop.js';

export default (router) => {
  /** save a Shop */
  router
    .route('/Shop')
    .post(ctrl.addShop);

  /** delete a Shop */
  router
    .route('/Shop/Remove')
    .post(ctrl.deleteShop);

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
    .route('/Shops/Near/:id')
    .get(ctrl.getNearShops);

  /** get a Shop with Shops */
  router
    .route('/shops/like')
    .get(ctrl.getLikedShops);
};
