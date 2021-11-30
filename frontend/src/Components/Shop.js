import React from 'react';
import PropTypes from 'prop-types';
import { likeShop, dislikeShop } from './utils/api.js';
export default class Shop extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLiked: false,
      isLikePage: false
    }
  }

  doAction = (isLiked, shopId) => {
    if(isLiked)
      likeShop()
  }
  render() {
    const { name, isLiked, shopId } = this.props.shop;
    const { userId } = this.props.userId;
    return (
      <div className='box_shop'>
        <p>{name}</p>
        <br />
        <input type='button' className='like_btn' onClick={this.doAction(this.isLiked, shopId, userId)} style={{display: isLiked ? 'none' : 'inline' }} value='Like'/>
        <input type='button' className='dislike_btn' onClick={this.doAction(this.isLiked, shopId, userId)} style={{display: isLiked ? 'inline' : 'none' }} value='Dislike'/>
      </div>
    );
  }
}

Shop.propTypes = {
  shop: PropTypes.object
};
