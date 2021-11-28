import ctrl from '../ctrls/ctrlShop.js';

export default (router) => {
  /** save a Shop */
  router
    .route('/Shop')
    .post(ctrl.addShop);

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
    .route('/Shops/Near/')
    .get(ctrl.getNearShops);

  /** get a Shop with Shops */
  router
    .route('/shops/like')
    .get(ctrl.getLikedShops);
};
