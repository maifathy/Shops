import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeShop } from '../features/shop/shopSlice.js';
import { likeShop, dislikeShop } from '../utils/api.js';

const Shop = (props) => {
  const message = useRef(null);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { Name, _id } = props.shop;
  const { isPreferedPage } = props;

  const doAction = async(isLike, shopId) => {
  let response;
  if(isLike) {
    response = await likeShop(shopId, user._id);
  } else {
    response = await dislikeShop(shopId, user._id);
  }
  if(response.status === 200) {
    dispatch(removeShop(response.shop))
  } else {
    message.current.innerHTML = response.message;
  }
};

  return (
    <div>
      <p ref={message}></p>
      <div className='box_shop'>
        <p>{Name}</p>
        <br />
        <input type='button' className='like_btn' onClick={() => doAction(true, _id)} style={{display: isPreferedPage ? 'none' : 'inline' }} value='Like'/>
        <input type='button' className='dislike_btn' onClick={() => doAction(false, _id)} style={{display: isPreferedPage ? 'inline' : 'none' }} value='Dislike'/>
      </div>
    </div>
  );
}

Shop.propTypes = {
  shop: PropTypes.object,
  isPreferedPage: PropTypes.bool
};

export default Shop;
