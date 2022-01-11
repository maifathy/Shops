import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShops } from '../features/shop/shopSlice.js';
import Shop from './Shop.js'
import { getNearShops, getLikedShops } from '../utils/api.js';

const Shops = () => {
  const [isPreferedPage, setIsPreferedPage] = useState(false);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const shops = useSelector((state) => state.shop.shops);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function getShops(userId, page, lon, lat){
      return await getNearShops(userId, page, lon, lat);
    }

    async function getPreferedShops(userId, page){
      return await getLikedShops(userId, page);
    }
    let shopsObj;
    if(Object.keys(user).length > 0) {
      if(window.location.pathname.toLowerCase() === '/shops/near'){
        shopsObj = getShops(user._id, 1, user.Location.coordinates[0], user.Location.coordinates[0])
         if(isMounted) setIsPreferedPage(false);
      }
      else {
        shopsObj = getPreferedShops(user._id, 1);
        if(isMounted) setIsPreferedPage(true);
      }
      shopsObj.then((data) => {
        if(data.status === 200){
          if(isMounted) setMsg('');
          dispatch(setShops(data.shops));
        }
        else{
          if(isMounted) setMsg(data.message);
        }
      });
    } else {
      navigate('/login');
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return(
    <div className="App">
      <p>{msg}</p>
      <ul style={{ display: 'inline-flex', listStyle: 'none' }}>
        {shops.map((shop) =>
          <li key={shop._id}>
            <Shop shop={shop} isPreferedPage={isPreferedPage} />
          </li>
        )}
      </ul>
    </div>
  )
}
Shops.propTypes = {
  isPreferedPage: PropTypes.bool,
  shops: PropTypes.array
}

export default Shops;
