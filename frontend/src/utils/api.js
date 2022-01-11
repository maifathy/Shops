import { getData, putData, deleteData, api } from './helpers.js';

// shop requests
export function getNearShops(userId, page, lon, lat){
  return getData(`${api}/Shops/Near/${userId}/${page}?lon=${lon}&lat=${lat}`)
    .then(shops => shops);
}

export function getLikedShops(userId, page){
  return getData(`${api}/Shops/Prefered/${userId}/${page}`)
    .then(shops => shops);
}

export function likeShop(shopId, userId){
  return putData(`${api}/Shop/Like/${shopId}?user_id=${userId}`)
    .then(shop => shop);
}

export function dislikeShop(shopId, userId){
  return putData(`${api}/Shop/Dislike/${shopId}?user_id=${userId}`)
    .then(shop => shop);
}

export function deleteShop(shopId){
  return deleteData(`${api}/Shop/Remove/${shopId}`)
  .then(shopId);
}

// user requests
export function login(username, password){
  return putData(`${api}/Users/Login`, { username: username, password: password })
    .then(user => user);
}
